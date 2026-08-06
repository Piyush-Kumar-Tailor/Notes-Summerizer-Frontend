import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-links.html',
  styleUrl: './nav-links.css'
})
export class NavLinksComponent {

  readonly navLinks: NavLink[] = [

    {
      label: 'Home',
      path: '/home',
      exact: true
    },

    {
      label: 'Upload',
      path: '/upload',
      exact: false
    },

    {
      label: 'History',
      path: '/history',
      exact: false
    },

    {
      label: 'About',
      path: '/about',
      exact: false
    }

  ];

}