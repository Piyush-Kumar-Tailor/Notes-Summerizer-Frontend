import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LogoComponent } from './logo/logo';
import { NavLinksComponent } from './nav-links/nav-links';
import { UserMenuComponent } from './user-menu/user-menu';
import { MobileMenuComponent } from './mobile-menu/mobile-menu';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [
    RouterLink,
    LogoComponent,
    NavLinksComponent,
    UserMenuComponent,
    MobileMenuComponent
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {

  readonly isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {

    this.isMobileMenuOpen.update(open => !open);

  }

  closeMobileMenu(): void {

    this.isMobileMenuOpen.set(false);

  }

}