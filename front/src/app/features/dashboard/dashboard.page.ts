import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div><h2 class="text-3xl font-black">Dashboard</h2><p class="text-sm font-semibold text-ink/60">Vue d’ensemble de l’activité</p></div>
        <button class="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white">Exporter</button>
      </div>
      @if (summary$ | async; as summary) {
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <article class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><p class="text-sm font-bold text-ink/55">Chiffre d’affaires</p><strong class="mt-3 block text-2xl font-black">{{ summary.revenue | currency:'XOF':'symbol':'1.0-0' }}</strong></article>
          <article class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><p class="text-sm font-bold text-ink/55">Ventes</p><strong class="mt-3 block text-2xl font-black">{{ summary.salesCount }}</strong></article>
          <article class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><p class="text-sm font-bold text-ink/55">Clients</p><strong class="mt-3 block text-2xl font-black">{{ summary.clientsCount }}</strong></article>
          <article class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><p class="text-sm font-bold text-ink/55">Dépenses</p><strong class="mt-3 block text-2xl font-black">{{ summary.expenses | currency:'XOF':'symbol':'1.0-0' }}</strong></article>
          <article class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><p class="text-sm font-bold text-ink/55">Stock faible</p><strong class="mt-3 block text-2xl font-black">{{ summary.lowStockCount }}</strong></article>
        </div>
      } @else {
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">@for (item of [1,2,3,4,5]; track item) {<div class="h-32 animate-pulse rounded-lg bg-white"></div>}</div>
      }
      <section class="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><h3 class="font-black">Évolution</h3><div class="mt-6 flex h-64 items-end gap-3">@for (bar of bars; track bar) {<span class="flex-1 rounded-t bg-sunu/80" [style.height.%]="bar"></span>}</div></div>
        <div class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><h3 class="font-black">Abonnement</h3><p class="mt-4 text-sm font-semibold text-ink/60">Plan actif</p><strong class="mt-2 block text-3xl font-black text-sunu">FREE</strong><button class="mt-8 w-full rounded-md bg-mango px-4 py-3 font-black text-white">Passer Premium</button></div>
      </section>
    </div>
  `,
})
export class DashboardPage {
  private readonly dashboard = inject(DashboardService);
  readonly summary$ = this.dashboard.summary();
  readonly bars = [34, 52, 48, 76, 61, 90, 72, 58, 84, 66, 95, 78];
}
