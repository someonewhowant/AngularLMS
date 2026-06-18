import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  name: string;
  students: number | string;
  rating: number | string;
  status: 'PUBLISHED' | 'DRAFT';
}

interface Alert {
  type: 'NEW QUESTION' | 'MILESTONE' | 'REVIEW';
  typeClass: string;
  time: string;
  content: string;
  actions?: { label: string; action: string }[];
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherDashboard {
  instructorName = 'Dr. Elena Vance';
  totalStudents = '1,420';
  avgRating = '4.9/5.0';
  totalIncome = '$12,450';
  activeQuestions = 7;

  courses: Course[] = [
    { name: 'Advanced Distributed Systems', students: 842, rating: '5.0', status: 'PUBLISHED' },
    { name: 'Go for Production', students: 578, rating: '4.8', status: 'PUBLISHED' },
    { name: 'PostgreSQL Deep Dive', students: '--', rating: '--', status: 'DRAFT' },
  ];

  alerts: Alert[] = [
    {
      type: 'NEW QUESTION',
      typeClass: 'error',
      time: '2m ago',
      content: '<span class="font-bold">Student Alex</span> asked a question on <code class="code-badge">Paxos Consensus</code> module.',
      actions: [
        { label: 'REPLY', action: 'reply' },
        { label: 'DISMISS', action: 'dismiss' }
      ]
    },
    {
      type: 'MILESTONE',
      typeClass: 'tertiary',
      time: '45m ago',
      content: '<span class="font-bold">Advanced Distributed Systems</span> reached 800+ active students.',
    },
    {
      type: 'REVIEW',
      typeClass: 'primary',
      time: '1h ago',
      content: '<span class="font-bold">Student Sarah</span> left a 5-star rating on <span class="italic text-outline">Go for Production</span>.',
    }
  ];
}
