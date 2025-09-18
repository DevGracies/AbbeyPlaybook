import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Playbook {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  body!: string;

  @Column({ default: 0 })
  loves!: number;

  @ManyToOne(() => User, (user) => user.playbooks, { onDelete: "CASCADE" })
  user!: User;
}
