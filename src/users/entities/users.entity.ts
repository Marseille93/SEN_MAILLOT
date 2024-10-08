import { Avis } from 'src/avis/entities/avis.entity';
import { Commandes } from 'src/commandes/entities/commandes.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nomComplet: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 15 })
  telephone: string;

  @Column({ type: 'date' })
  naissance: Date;

  @Column({ default: 'user' })
  role: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
  @OneToMany((type) => Commandes, (commandes) => commandes.user)
  commandes: Commandes[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
  @OneToMany((type) => Avis, (avis) => avis.users)
  avis: Avis[];
}
