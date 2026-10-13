import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="h-[100dvh] w-screen overflow-hidden bg-[#b9edff] text-[#16231c] lg:bg-white">
      <div class="grid h-[100dvh] w-full lg:grid-cols-[0.95fr_1.05fr]">
        <section class="relative hidden min-h-screen overflow-hidden bg-[#1f2d24] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center"></div>
          <div class="absolute inset-0 bg-[#1f2d24]/72"></div>
          <div class="absolute -left-10 top-8 text-8xl font-black uppercase italic text-white/45">Sama</div>
          <div class="absolute left-24 top-44 size-24 rounded-full border-4 border-white/60"></div>
          <div class="absolute bottom-16 right-14 h-28 w-44 rotate-12 rounded-full border-[10px] border-white/55"></div>
          <a routerLink="/" class="relative z-10 inline-block w-fit rounded-3xl bg-white p-3 shadow-soft">
            <img src="/assets/samabiz-logo.png" alt="SamaBiz" class="h-20 w-auto object-contain" />
          </a>
          <div class="relative z-10 max-w-lg rounded-[36px] bg-white/95 p-10 shadow-2xl shadow-[#2f5638]/10">
            <h1 class="text-5xl font-black leading-tight">Bienvenue</h1>
            <p class="mt-4 text-lg font-semibold text-[#16231c]/55">Créez votre espace et gérez votre business simplement.</p>
            <div class="mt-10 grid gap-4">
              <div class="rounded-2xl bg-[#eef8e9] p-5"><strong class="text-2xl text-[#2f5638]">30 jours</strong><p class="mt-1 text-sm font-semibold text-[#16231c]/55">Essai gratuit pour démarrer.</p></div>
              <div class="rounded-2xl bg-[#fff1e9] p-5"><strong class="text-2xl text-[#ef7037]">Tout-en-un</strong><p class="mt-1 text-sm font-semibold text-[#16231c]/55">Clients, ventes, stock et factures.</p></div>
            </div>
          </div>
        </section>

        <section class="relative flex h-[100dvh] w-full items-stretch justify-center p-0 sm:items-center sm:px-8 sm:py-8 lg:bg-[#fbf5eb] lg:px-14 xl:px-20">
          <a routerLink="/" class="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#2f5638]/15 bg-white/90 px-4 py-2 text-xs font-black uppercase text-[#2f5638] shadow-sm backdrop-blur transition hover:bg-white">
            <i class="fa-solid fa-arrow-left"></i> Accueil
          </a>
          <div class="absolute -left-10 top-8 text-6xl font-black uppercase italic text-white/45 lg:hidden">Boom</div>
          <div class="absolute right-5 top-20 size-14 rounded-full border-4 border-white/70 lg:hidden"></div>
          <div class="absolute bottom-10 right-[-38px] size-28 rounded-full border-[12px] border-white/60 lg:hidden"></div>

          <form [formGroup]="form" (ngSubmit)="submit()" class="relative z-10 flex h-[100dvh] w-screen max-w-none flex-col justify-center rounded-none bg-white px-6 py-5 shadow-none sm:h-auto sm:w-full sm:max-w-[390px] sm:rounded-[34px] sm:px-9 sm:py-9 sm:shadow-2xl sm:shadow-[#2f5638]/10 lg:max-w-md lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
            <a routerLink="/" class="mx-auto mb-4 block w-fit rounded-2xl bg-white p-1.5 shadow-sm sm:mb-7 sm:p-2 lg:mx-0">
              <img src="/assets/samabiz-logo.png" alt="SamaBiz" class="h-16 w-auto object-contain sm:h-24" />
            </a>
            <p class="text-center text-xs font-black uppercase tracking-wide text-[#ef7037] lg:text-left">Essai gratuit</p>
            <h2 class="mt-2 text-center text-3xl font-black text-[#111827] lg:text-left lg:text-4xl">Créer un compte</h2>
            <p class="mt-2 text-center text-sm font-semibold text-[#111827]/45 lg:text-left">Configurez votre espace SamaBiz.</p>

            <div class="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5">
              <label class="block text-xs font-black uppercase tracking-wide text-[#111827]/45">
                Entreprise
                <span class="mt-2 flex items-center gap-3 rounded-2xl border border-[#2f5638]/20 bg-white px-4 py-3 sm:py-3.5 shadow-md shadow-[#2f5638]/5 transition focus-within:border-[#6c7857] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6c7857]/10">
                  <i class="fa-solid fa-store text-[#ef7037]"></i>
                  <input formControlName="companyName" autocomplete="organization" placeholder="Nom de l’entreprise" class="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#111827]/30" />
                </span>
              </label>
              <label class="block text-xs font-black uppercase tracking-wide text-[#111827]/45">
                Nom complet
                <span class="mt-2 flex items-center gap-3 rounded-2xl border border-[#2f5638]/20 bg-white px-4 py-3 sm:py-3.5 shadow-md shadow-[#2f5638]/5 transition focus-within:border-[#6c7857] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6c7857]/10">
                  <i class="fa-solid fa-user text-[#ef7037]"></i>
                  <input formControlName="name" autocomplete="name" placeholder="Votre nom" class="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#111827]/30" />
                </span>
              </label>
              <label class="block text-xs font-black uppercase tracking-wide text-[#111827]/45 sm:col-span-2">
                Email
                <span class="mt-2 flex items-center gap-3 rounded-2xl border border-[#2f5638]/20 bg-white px-4 py-3 sm:py-3.5 shadow-md shadow-[#2f5638]/5 transition focus-within:border-[#6c7857] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6c7857]/10">
                  <i class="fa-solid fa-envelope text-[#ef7037]"></i>
                  <input formControlName="email" type="email" autocomplete="email" placeholder="exemple@email.com" class="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#111827]/30" />
                </span>
              </label>
              <label class="block text-xs font-black uppercase tracking-wide text-[#111827]/45 sm:col-span-2">
                Mot de passe
                <span class="mt-2 flex items-center gap-3 rounded-2xl border border-[#2f5638]/20 bg-white px-4 py-3 sm:py-3.5 shadow-md shadow-[#2f5638]/5 transition focus-within:border-[#6c7857] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6c7857]/10">
                  <i class="fa-solid fa-lock text-[#ef7037]"></i>
                  <input formControlName="password" type="password" autocomplete="new-password" placeholder="8 caractères minimum" class="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#111827]/30" />
                </span>
              </label>
            </div>
            @if (error()) { <p class="mt-4 rounded-md bg-coral/10 px-3 py-2 text-sm font-semibold text-coral">{{ error() }}</p> }
            <button class="mt-5 w-full rounded-full sm:mt-7 border border-[#111827] bg-[#dfe0de] px-4 py-4 font-black text-[#111827] transition hover:bg-[#b9edff]" type="submit">Créer mon compte</button>
            <p class="mt-5 text-center text-sm sm:mt-8 font-semibold text-[#111827]/45">Vous avez déjà un compte ? <a routerLink="/login" class="font-black text-[#111827]">Se connecter</a></p>
          </form>
        </section>
      </div>
    </main>
  `,
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigate(['/dashboard']),
      error: () => this.error.set('Impossible de créer le compte'),
    });
  }
}
