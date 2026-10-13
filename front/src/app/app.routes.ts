import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
  { path: 'login', loadComponent: () => import('./features/auth/login.page').then((m) => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./features/auth/register.page').then((m) => m.RegisterPage) },
  { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password.page').then((m) => m.ForgotPasswordPage) },
  { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password.page').then((m) => m.ResetPasswordPage) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage) },
  { path: 'clients', canActivate: [authGuard], loadComponent: () => import('./features/clients/pages/clients-list/clients-list.page').then((m) => m.ClientsListPage) },
  { path: 'produits', canActivate: [authGuard], loadComponent: () => import('./features/products/products.page').then((m) => m.ProductsPage) },
  { path: 'ventes', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Ventes' } },
  { path: 'commandes', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Commandes' } },
  { path: 'factures', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Factures' } },
  { path: 'depenses', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Dépenses' } },
  { path: 'stock', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Stock' } },
  { path: 'statistiques', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Statistiques' } },
  { path: 'notifications', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Notifications' } },
  { path: 'abonnement', canActivate: [authGuard], loadComponent: () => import('./features/shell/module-placeholder.page').then((m) => m.ModulePlaceholderPage), data: { title: 'Abonnement' } },
  { path: '**', redirectTo: 'dashboard' },
];
