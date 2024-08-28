import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async carregis(dto: CarDto) {
    let allCars = []
    try {
      const car = await this.carRepository.create({ ...dto });
      await this.carRepository.save(car);
      allCars = await this.carRepository.find();
    } catch (error) {
      throw new Error(error.message)
    }
    return {
      allCars,
    };
  }
}
