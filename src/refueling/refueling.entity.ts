import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Auth } from 'src/auth/auth.entity';
import { Car } from 'src/car/car.entity';

@Entity()
export class Refueling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  gasAmount: number;

  @ManyToOne(() => Car, car => car.refuelings, { nullable: false, eager: true })
  auto: Car | number;

  @ManyToOne(() => Auth, auth => auth.refuelings, { nullable: false, eager: true })
  station: Auth | number;

  
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
