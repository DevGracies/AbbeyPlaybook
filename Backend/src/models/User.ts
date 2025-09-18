// src/models/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Playbook } from "./Playbook";
import { Follow } from "./Follow";
import { PlaybookLove } from "./PlaybookLove";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  position?: string;

  @Column({ nullable: true, type: "text" })
  about?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @OneToMany(() => Playbook, (p) => p.user)
  playbooks?: Playbook[];

  @OneToMany(() => Follow, (f) => f.follower)
  following?: Follow[];

  @OneToMany(() => Follow, (f) => f.following)
  followers?: Follow[];

  @OneToMany(() => PlaybookLove, (l) => l.user)
  loves?: PlaybookLove[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
