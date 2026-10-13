import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ClientService } from '../../services/client.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap items-end justify-between gap-4"><div><h2 class="text-3xl font-black">Clients</h2><p class="text-sm font-semibold text-ink/60">Carnet commercial multi-tenant</p></div><input #search (input)="setSearch(search.value)" class="w-full rounded-md border border-black/10 bg-white px-3 py-3 outline-none focus:border-sunu sm:w-80" placeholder="Rechercher" /></div>
      <section class="grid gap-4 xl:grid-cols-[360px_1fr]">
        <form [formGroup]="form" (ngSubmit)="create()" class="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <h3 class="font-black">Nouveau client</h3>
          <div class="mt-5 space-y-3">
            <input formControlName="name" class="w-full rounded-md border border-black/10 px-3 py-3" placeholder="Nom" />
            <input formControlName="phone" class="w-full rounded-md border border-black/10 px-3 py-3" placeholder="Téléphone" />
            <input formControlName="email" class="w-full rounded-md border border-black/10 px-3 py-3" placeholder="Email" />
            <input formControlName="address" class="w-full rounded-md border border-black/10 px-3 py-3" placeholder="Adresse" />
          </div>
          <button class="mt-5 w-full rounded-md bg-sunu px-4 py-3 font-black text-white">Créer</button>
        </form>
        <div class="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="bg-ink text-white"><tr><th class="px-4 py-3">Nom</th><th class="px-4 py-3">Téléphone</th><th class="px-4 py-3">Email</th><th class="px-4 py-3">Adresse</th><th class="px-4 py-3"></th></tr></thead>
            <tbody>
              @if (clients$ | async; as clients) {
                @for (client of clients.data; track client.id) {
                  <tr class="border-t border-black/10"><td class="px-4 py-3 font-bold">{{ client.name }}</td><td class="px-4 py-3">{{ client.phone || '-' }}</td><td class="px-4 py-3">{{ client.email || '-' }}</td><td class="px-4 py-3">{{ client.address || '-' }}</td><td class="px-4 py-3 text-right"><button (click)="remove(client.id)" class="rounded-md border border-coral/30 px-3 py-2 font-bold text-coral">Supprimer</button></td></tr>
                } @empty { <tr><td colspan="5" class="px-4 py-8 text-center font-semibold text-ink/50">Aucun client</td></tr> }
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
})
export class ClientsListPage {
  private readonly fb = inject(FormBuilder);
  private readonly clients = inject(ClientService);
  private readonly refresh$ = new BehaviorSubject('');
  readonly saving = signal(false);
  readonly clients$ = this.refresh$.pipe(switchMap((search) => this.clients.list(search)));
  readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required, Validators.minLength(2)]], phone: [''], email: [''], address: [''] });

  setSearch(value: string): void { this.refresh$.next(value); }
  create(): void {
    if (this.form.invalid) return;
    this.clients.create(this.form.getRawValue()).subscribe(() => { this.form.reset(); this.refresh$.next(''); });
  }
  remove(id: string): void {
    if (!confirm('Supprimer ce client ?')) return;
    this.clients.delete(id).subscribe(() => this.refresh$.next(''));
  }
}
