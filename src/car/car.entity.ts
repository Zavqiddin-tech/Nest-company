import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Company } from '../company/comapny.entity';
import { Refueling } from 'src/refueling/refueling.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carName: string;

  @Column()
  carNumber: string;

  @Column({ nullable: true })
  driverName: string;

  @ManyToOne(() => Company, company => company.cars, { nullable: false, eager: true })
  authorCompany: Company | number;

  @OneToMany(() => Refueling, refueling => refueling.auto)
  refuelings: Refueling[]

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
