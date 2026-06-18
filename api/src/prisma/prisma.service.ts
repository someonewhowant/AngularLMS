import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seedIfNeeded();
  }

  private async seedIfNeeded() {
    // 1. Seed Achievements
    const achievementCount = await this.achievement.count();
    if (achievementCount === 0) {
      console.log('Seeding achievements...');
      await this.achievement.createMany({
        data: [
          {
            name: 'First Steps',
            description: 'Log in and explore your dashboard.',
            points: 50,
            criteria: 'FIRST_STEPS',
            iconUrl: 'explore'
          },
          {
            name: 'Knowledge Seeker',
            description: 'View your first course lesson.',
            points: 30,
            criteria: 'VIEW_LESSON',
            iconUrl: 'menu_book'
          },
          {
            name: 'Perfect Scholar',
            description: 'Get a perfect score on any quiz.',
            points: 100,
            criteria: 'PERFECT_QUIZ',
            iconUrl: 'emoji_events'
          }
        ]
      });
    }

    // 2. Seed Demo Courses
    const courseCount = await this.course.count();
    if (courseCount === 0) {
      console.log('Seeding demo courses...');
      
      let teacher = await this.user.findFirst({ where: { role: 'TEACHER' } });
      if (!teacher) {
        const hashedPassword = await bcrypt.hash('teacher123', 10);
        teacher = await this.user.create({
          data: {
            email: 'teacher@codeblog.academy',
            password: hashedPassword,
            role: 'TEACHER',
            points: 500
          }
        });
      }

      await this.course.create({
        data: {
          title: 'Java Fundamentals',
          description: 'Master core Java concepts, object-oriented programming, and essential language structures.',
          isPublished: true,
          teacherId: teacher.id,
          modules: {
            create: [
              {
                title: 'Introduction & Setup',
                content: 'Learn how to install JDK and write your first Java program.',
                order: 1,
                assignments: {
                  create: [
                    {
                      title: 'Welcome to Java',
                      description: 'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. In this lesson, we cover Java history and applications.',
                      maxScore: 100
                    },
                    {
                      title: 'JDK Installation and Hello World',
                      description: 'Install JDK 21 on your operating system and write your first HelloWorld.java. Compile using `javac HelloWorld.java` and run using `java HelloWorld`.',
                      maxScore: 100
                    }
                  ]
                },
                quizzes: {
                  create: [
                    {
                      title: 'Java Basics Quiz',
                      description: 'Test your understanding of Java compilation and JDK.',
                      questions: {
                        create: [
                          {
                            text: 'Which command compiles a Java file?',
                            options: {
                              create: [
                                { text: 'java', isCorrect: false },
                                { text: 'javac', isCorrect: true },
                                { text: 'javadoc', isCorrect: false },
                                { text: 'run-java', isCorrect: false }
                              ]
                            }
                          },
                          {
                            text: 'What does JDK stand for?',
                            options: {
                              create: [
                                { text: 'Java Developer Kit', isCorrect: false },
                                { text: 'Java Development Kit', isCorrect: true },
                                { text: 'Java Deployment Kernel', isCorrect: false },
                                { text: 'Java Design Key', isCorrect: false }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                title: 'Object Oriented Programming',
                content: 'Understand classes, objects, inheritance, encapsulation, polymorphism, and abstraction.',
                order: 2,
                assignments: {
                  create: [
                    {
                      title: 'Classes and Objects',
                      description: 'Learn how to define a Class, instantiate objects using the `new` keyword, and write constructors.',
                      maxScore: 100
                    }
                  ]
                }
              }
            ]
          }
        }
      });
      console.log('Seeding finished.');
    }

    // 3. Seed Blog Categories, Tags and Posts
    const postCount = await this.post.count();
    if (postCount === 0) {
      console.log('Seeding blog categories, tags, and posts...');
      
      const catSysDesign = await this.category.upsert({
        where: { name: 'System Design' },
        update: {},
        create: { name: 'System Design', description: 'Distributed systems, architecture, scalability' }
      });
      const catPerf = await this.category.upsert({
        where: { name: 'Performance' },
        update: {},
        create: { name: 'Performance', description: 'Profiling, optimization, benchmarking' }
      });
      const catDB = await this.category.upsert({
        where: { name: 'Databases' },
        update: {},
        create: { name: 'Databases', description: 'SQL, NoSQL, indexing, query optimization' }
      });
      const catSec = await this.category.upsert({
        where: { name: 'Security' },
        update: {},
        create: { name: 'Security', description: 'Authentication, authorization, cryptography' }
      });

      const tagKafka = await this.tag.upsert({
        where: { name: 'Kafka' },
        update: {},
        create: { name: 'Kafka' }
      });
      const tagPostgres = await this.tag.upsert({
        where: { name: 'PostgreSQL' },
        update: {},
        create: { name: 'PostgreSQL' }
      });
      const tagAuth = await this.tag.upsert({
        where: { name: 'Auth' },
        update: {},
        create: { name: 'Auth' }
      });
      const tagNode = await this.tag.upsert({
        where: { name: 'Node.js' },
        update: {},
        create: { name: 'Node.js' }
      });

      const author = await this.user.findFirst({ where: { role: 'TEACHER' } });
      const authorId = author ? author.id : 1;

      await this.post.create({
        data: {
          title: 'Designing a Scalable Notification System from Scratch',
          content: 'Learn the architecture and trade-offs behind building a distributed notification system capable of sending millions of messages per minute using Kafka and Redis. Notification systems are critical components of modern web applications. We need to handle retry mechanisms, push notification service integrations, email gateways, and SMS providers. Using a message broker like Apache Kafka allows us to queue notifications and consume them asynchronously, shielding our core services from downstream failures and high latency.',
          published: true,
          authorId,
          categoryId: catSysDesign.id,
          tags: { connect: [{ id: tagKafka.id }] }
        }
      });

      await this.post.create({
        data: {
          title: 'PostgreSQL Indexing Strategies for Large Tables',
          content: 'A deep dive into B-Tree, Hash, and GIN indexes. Learn when to use partial and covering indexes to optimize your slow queries. Indexes are powerful tools to speed up data retrieval, but they come at a cost of write performance and storage. In this article, we explain how Postgres processes queries, how to analyze query execution plans with EXPLAIN ANALYZE, and how to select the right index type for complex search criteria.',
          published: true,
          authorId,
          categoryId: catDB.id,
          tags: { connect: [{ id: tagPostgres.id }] }
        }
      });

      await this.post.create({
        data: {
          title: 'Understanding OAuth 2.0 and OpenID Connect',
          content: 'Demystifying the authentication and authorization protocols. We break down the flows and show how to implement them securely. Many developers confuse authentication (who you are) with authorization (what you can do). We explore Authorization Code Flow with PKCE, Client Credentials Flow, and Implicit Flow, and why JSON Web Tokens (JWT) should be stored and handled with care to prevent security breaches.',
          published: true,
          authorId,
          categoryId: catSec.id,
          tags: { connect: [{ id: tagAuth.id }] }
        }
      });

      await this.post.create({
        data: {
          title: 'Optimizing Node.js Event Loop Performance',
          content: 'How to avoid blocking the event loop, identify memory leaks, and use worker threads for CPU-intensive tasks. Node.js is famous for its single-threaded, event-driven architecture. But if you execute synchronous, computationally heavy tasks in the main thread, you will block the event loop, causing high latency for all other requests. We show you how to profile your application and offload operations to Worker Threads.',
          published: true,
          authorId,
          categoryId: catPerf.id,
          tags: { connect: [{ id: tagNode.id }] }
        }
      });
      console.log('Seeded blog posts.');
    }
  }
}
