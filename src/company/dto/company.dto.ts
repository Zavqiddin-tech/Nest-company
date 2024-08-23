import { IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  companyName: string;

  @IsString()
  companyNumber: string;

  @IsString()
  companyDirector: string;
}
