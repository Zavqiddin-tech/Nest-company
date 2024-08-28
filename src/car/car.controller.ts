import { Body, Controller, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/create')
  carregis(@Body() dto: CarDto) {
    return this.carService.carregis(dto);
  }
}
