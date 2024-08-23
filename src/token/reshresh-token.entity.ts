import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from 'src/auth/auth.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => Auth,{ eager: true })
  user: Auth | number;
}
