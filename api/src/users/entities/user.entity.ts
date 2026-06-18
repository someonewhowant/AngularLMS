import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { Course } from '../../courses/entities/course.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { UserQuizResult } from '../../quizzes/entities/user-quiz-result.entity';
import { UserAchievement } from '../../achievements/entities/user-achievement.entity';
import { UserActivity } from '../../analytics/entities/user-activity.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'STUDENT' })
  role: string; // STUDENT, TEACHER, ADMIN

  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true, type: 'datetime' })
  lastLoginAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Course, course => course.teacher)
  courses: Course[];

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => UserQuizResult, result => result.user)
  quizResults: UserQuizResult[];

  @OneToMany(() => UserAchievement, achievement => achievement.user)
  achievements: UserAchievement[];

  @OneToMany(() => UserActivity, activity => activity.user)
  activities: UserActivity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
