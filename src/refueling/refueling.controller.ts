import { Body, Controller, Post } from '@nestjs/common';
import { RefuelingService } from './refueling.service';
import { RefuelingDto } from './dto/refueling.dto';

@Controller('refueling')
export class RefuelingController {
	constructor(private readonly refuelingService: RefuelingService) {}

	@Post('/add')
	create(@Body() dto: RefuelingDto) {
		return this.refuelingService.create(dto)
	}
}
