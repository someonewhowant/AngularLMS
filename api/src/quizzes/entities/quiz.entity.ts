import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CourseModule } from '../../course-modules/entities/course-module.entity';
import { Question } from './question.entity';
import { UserQuizResult } from './user-quiz-result.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => CourseModule, module => module.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: CourseModule;

  @Column()
  moduleId: number;

  @OneToMany(() => Question, question => question.quiz)
  questions: Question[];

  @OneToMany(() => UserQuizResult, result => result.quiz)
  results: UserQuizResult[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
