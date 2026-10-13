import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.auth.user;
  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly initials = computed(() => this.user()?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() ?? 'SB');

  readonly navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '⌂' },
    { path: '/clients', label: 'Clients', icon: '◎' },
    { path: '/produits', label: 'Produits', icon: '□' },
    { path: '/ventes', label: 'Ventes', icon: '◈' },
    { path: '/commandes', label: 'Commandes', icon: '☰' },
    { path: '/factures', label: 'Factures', icon: '◇' },
    { path: '/depenses', label: 'Dépenses', icon: '−' },
    { path: '/stock', label: 'Stock', icon: '▤' },
    { path: '/statistiques', label: 'Stats', icon: '↗' },
  ];

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
