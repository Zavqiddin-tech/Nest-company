import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refueling } from './refueling.entity';
import { RefuelingDto } from './dto/refueling.dto';

@Injectable()
export class RefuelingService {
  constructor(
    @InjectRepository(Refueling)
    private readonly refuelingRepository: Repository<Refueling>,
  ) {}

  async create(dto: RefuelingDto) {
    console.log(dto);
    let all = [];
    try {
      const oneGas = await this.refuelingRepository.create({ ...dto });
      await this.refuelingRepository.save(oneGas);
      all = await this.refuelingRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      all,
    };
  }
}
