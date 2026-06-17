import { Component, ChangeDetectionStrategy, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() user = {
    name: 'Elena Vance',
    role: 'Instructor',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0EQJUd4P-jZghpQLsXzSlGGgpRB9uADcnA-LncH-7N1bkMLH_hu50MVH9ieBKzInz_5IA4Ojb5B4vXICKDFkJFpyiB-LQ3hY1KvdWAc-FWqKtFiDQ7sNaJgZQHbSCseKjaefHBrfUpeMx1dc0yNaoBQk5vcZz8p_qtCQsv5Qo4jQrnsu65p0KB0YOTLnuuT9XvkQ3dxvBH49Z7xb9X9V2mJWQFri2mzG26DafGTWFjPyreCrDwyXESrfZ_QwoVmlaLV6fuAWNhWP'
  };

  isDropdownOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
