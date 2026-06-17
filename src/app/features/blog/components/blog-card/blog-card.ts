import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCard {
  @Input({ required: true }) post!: BlogPost;
}
