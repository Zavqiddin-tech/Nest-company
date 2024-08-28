import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './comapny.entity';
import { CompanyDto } from './dto/company.dto';
import { log } from 'console';
import { combineAll } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async companyRegis(dto: CompanyDto) {
    console.log(dto);
    let allCompany = [];
    try {
      const existingCompany = await this.companyRepository.findOne({
        where: { companyName: dto.companyName },
      });

      if (existingCompany) {
        throw new HttpException(
          "Ishxona oldin ro'yxatga olingan",
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = await this.companyRepository.create({ ...dto });
      await this.companyRepository.save(company);
      allCompany = await this.companyRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      allCompany,
    };
  }
}
