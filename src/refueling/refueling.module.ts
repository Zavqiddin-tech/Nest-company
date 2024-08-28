import { Module } from '@nestjs/common';
import { RefuelingController } from './refueling.controller';
import { RefuelingService } from './refueling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refueling } from './refueling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refueling])],
  controllers: [RefuelingController],
  providers: [RefuelingService]
})
export class RefuelingModule {}
