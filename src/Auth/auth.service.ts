import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';
import { RefreshToken } from 'src/token/reshresh-token.entity';
import { CreateAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async regis(dto: CreateAuthDto) {
    const existuser = await this.authRepository.findOne({
      where: { username: dto.username },
    });

    if (existuser) {
      throw new HttpException('Bu foydalanuvhi mavjud', HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.authRepository.create({ ...dto, password: hash });
    await this.authRepository.save(user);

    return {
      messge: "Ro'yxatdan o'tkazldi",
    };
  }

  async login(dto: CreateAuthDto) {

    const user = await this.authRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new HttpException(
        'Foydalanuvchi topilmadi',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPassword = await bcrypt.compare(dto.password, user.password);
    if (!isPassword) {
      throw new HttpException("Noto'g'ri parol", HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: '7d',
    });

    // Eski refresh tokenni o'chirish
    await this.refreshTokenRepository.delete({ user });

    const newRefreshUser = this.refreshTokenRepository.create({
      token: refreshToken,
      user: user.id,
    });
    await this.refreshTokenRepository.save(newRefreshUser);
    return {
      accessToken,
      refreshToken,
    };
  }
}
