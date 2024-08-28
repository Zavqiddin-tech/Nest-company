import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companySevice: CompanyService) {}

	@Post('/create')
	companyRegis(@Body() dto: CompanyDto) {
		return this.companySevice.companyRegis(dto)
	}
}
