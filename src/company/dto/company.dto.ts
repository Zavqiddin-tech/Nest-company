import { IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  companyName: string;

  @IsString()
  companyPhone: string;

  @IsString()
  companyBoss: string;
}
