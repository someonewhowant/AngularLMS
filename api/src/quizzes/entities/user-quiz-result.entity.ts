import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';

@Entity('user_quiz_results')
export class UserQuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.quizResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Quiz, quiz => quiz.results, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  quizId: number;

  @Column()
  score: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
