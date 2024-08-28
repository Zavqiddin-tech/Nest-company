import { IsNumber } from 'class-validator';


export class RefuelingDto {
  @IsNumber()
  auto: number;

  @IsNumber()
  station: number ;

  @IsNumber()
  gasAmount: number;
}
