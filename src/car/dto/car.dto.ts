import { IsString } from 'class-validator';

export class CarDto {
  @IsString()
  carName: string;

  @IsString()
  carNumber: string;

  @IsString()
  driverName: string;

  @IsString()
  authorCompany: number;
}
