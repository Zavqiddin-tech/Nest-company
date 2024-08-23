import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.entity';
import { RefreshToken } from './token/reshresh-token.entity';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';
import { Company } from './company/comapny.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'gasoil',
      username: 'postgres',
      password: 'postgres',
      entities: [join(__dirname, '**', '*.entity.{ts, js}')],
      migrations: [join(__dirname, '**', '*.migration.{ts, js}')],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Auth, Company, RefreshToken]),
    AuthModule,
    CompanyModule,
  ],
  controllers: [AppController, CompanyController],
  providers: [AppService, AuthService, CompanyService, JwtService],
})
export class AppModule {}
