import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="min-h-screen bg-[#fbf5eb] text-[#283f2f]">
      <div class="flex items-center justify-center gap-2 bg-[#f7c9ae] px-4 py-2 text-center text-xs font-bold text-[#283f2f]">
        <i class="fa-solid fa-sparkles text-[#ef7037]"></i>
        <span>Essai gratuit disponible pendant 7 jours</span>
        <span class="hidden sm:inline">×</span>
      </div>

      <header class="flex w-full items-center justify-between px-5 py-6 lg:px-12 xl:px-16">
        <a routerLink="/" class="text-4xl font-black italic tracking-normal text-[#2f5638]">Sama<span class="text-[#f47735]">Biz</span></a>
        <nav class="hidden items-center gap-9 text-xs font-black uppercase tracking-wide text-[#283f2f]/80 md:flex">
          <a href="#modules">Modules</a>
          <a href="#collections">Solutions</a>
          <a href="#tarifs">Plans</a>
          <a href="#story">À propos</a>
        </nav>
        <div class="flex items-center gap-3 text-[#283f2f]">
          <a routerLink="/login" class="hidden text-sm font-black sm:inline">Connexion</a>
          <a routerLink="/register" class="rounded-full bg-[#6c7857] px-5 py-3 text-xs font-black uppercase text-white">Démarrer</a>
        </div>
      </header>

      <section class="w-full px-5 lg:px-12 xl:px-16">
        <div class="relative overflow-hidden rounded-[32px] bg-[#1f2d24] px-8 py-12 lg:min-h-[560px] lg:px-20 xl:px-24">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"></div>
          <div class="absolute inset-0 bg-black/60"></div>
          <div class="relative z-10 max-w-2xl py-16 lg:py-24">
            <h1 class="text-5xl font-black uppercase leading-[0.95] tracking-normal text-white sm:text-6xl">
              Gérez.<br /><span class="text-[#ff8a55]">Vendez.</span><br />Grandissez.
            </h1>
            <p class="mt-6 max-w-xl text-sm font-semibold leading-7 text-white/80">
              Une plateforme tout-en-un pour organiser vos clients, produits, ventes, factures, dépenses et stock sans perdre le fil.
            </p>
            <a routerLink="/register" class="mt-7 inline-flex items-center gap-3 rounded-full bg-[#6c7857] px-6 py-4 text-xs font-black uppercase text-white shadow-soft">
              Essayer SamaBiz <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

        </div>
      </section>

      <section id="tarifs" class="w-full px-5 py-12 lg:px-12 xl:px-16">
        <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs font-black uppercase text-[#ef7037]">Abonnements</p>
            <h2 class="mt-2 text-3xl font-black text-[#2f5638]">Passer au forfait supérieur</h2>
            <p class="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#283f2f]/60">Choisissez les outils adaptés à votre activité, de la première vente au pilotage d’une équipe.</p>
          </div>
          <a routerLink="/register" class="rounded-full border border-[#e9c9b8] px-5 py-3 text-xs font-black uppercase">Essayer gratuitement</a>
        </div>

        <div class="mx-auto grid max-w-screen-2xl gap-6 md:grid-cols-2">
          @for (plan of pricingPlans; track plan.name) {
            <article class="flex min-h-[560px] flex-col rounded-xl border border-[#ead8c9] bg-white p-8 shadow-sm" [class.border-[#f47735]]="plan.featured" [class.ring-2]="plan.featured" [class.ring-[#f47735]]="plan.featured">
              <div class="flex min-h-7 items-start justify-between gap-2">
                <h3 class="text-xl font-black text-[#2f5638]">{{ plan.name }}</h3>
                @if (plan.badge) {
                  <span class="rounded-full px-3 py-1 text-[10px] font-black uppercase" [class.bg-[#fff2ea]]="!plan.featured" [class.text-[#bd542a]]="!plan.featured" [class.bg-[#f47735]]="plan.featured" [class.text-white]="plan.featured">{{ plan.badge }}</span>
                }
              </div>
              <p class="mt-4 min-h-12 text-sm font-semibold leading-6 text-[#283f2f]/60">{{ plan.description }}</p>
              <div class="mt-7 flex min-h-12 items-baseline gap-2">
                <strong class="text-4xl font-black text-[#2f5638]">{{ plan.price }}</strong>
                <span class="text-sm font-bold text-[#283f2f]/60">FCFA</span>
                <span class="text-sm font-semibold text-[#283f2f]/50">/ mois</span>
              </div>
              <a routerLink="/register" class="mt-6 flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-xs font-black uppercase" [class.bg-[#6c7857]]="!plan.featured" [class.bg-[#f47735]]="plan.featured" [class.text-white]="true">{{ plan.action }}</a>
              <ul class="mt-7 flex-1 space-y-3 border-t border-[#ead8c9] pt-6 text-sm font-semibold text-[#283f2f]/70">
                @for (feature of plan.features; track feature) {
                  <li class="flex gap-3"><i class="fa-solid fa-circle-check mt-1 text-[#ef7037]"></i>{{ feature }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </section>

      <section id="modules" class="grid w-full gap-4 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-12 xl:px-16">
        @for (promise of promises; track promise.title) {
          <article class="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
            <span class="grid size-12 place-items-center rounded-full bg-[#fff2ea] text-2xl text-[#ef7037]"><i class="fa-solid {{ promise.icon }}"></i></span>
            <div><h3 class="text-xs font-black uppercase">{{ promise.title }}</h3><p class="mt-1 text-xs font-semibold text-[#283f2f]/55">{{ promise.text }}</p></div>
          </article>
        }
      </section>

      <section id="collections" class="w-full px-5 py-8 lg:px-12 xl:px-16">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-2xl font-black">Nos modules clés <i class="fa-solid fa-seedling text-[#ef7037]"></i></h2>
          <a routerLink="/register" class="rounded-full border border-[#e9c9b8] px-5 py-3 text-xs font-black uppercase">Tout voir</a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          @for (module of modules; track module.title) {
            <article class="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div class="grid h-40 place-items-center bg-[#f8eadf]">
                <div class="grid size-24 place-items-center rounded-[28px] bg-[#6c7857] text-4xl text-white shadow-soft"><i class="fa-solid {{ module.icon }}"></i></div>
              </div>
              <div class="flex items-end justify-between p-4">
                <div><h3 class="text-xs font-black uppercase">{{ module.title }}</h3><p class="mt-1 text-xs font-semibold text-[#283f2f]/55">{{ module.text }}</p></div>
                <span class="grid size-9 place-items-center rounded-full bg-[#f47735] text-white"><i class="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </article>
          }
        </div>
      </section>

      <section id="story" class="w-full px-5 py-8 lg:px-12 xl:px-16">
        <div class="overflow-hidden rounded-[28px] bg-[#f7c9ae] lg:grid lg:grid-cols-[360px_1fr]">
          <div class="p-10">
            <h2 class="text-2xl font-black uppercase leading-tight">Une gestion qui raconte une belle histoire</h2>
            <p class="mt-5 text-sm font-semibold leading-7 text-[#283f2f]/70">Chaque vente, chaque client et chaque produit devient une donnée utile pour prendre de meilleures décisions.</p>
            <a routerLink="/register" class="mt-7 inline-flex rounded-full border border-[#ef7037] px-5 py-3 text-xs font-black uppercase">Notre vision <i class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div class="min-h-72 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        </div>
      </section>

      <section id="occasions" class="w-full px-5 py-8 lg:px-12 xl:px-16">
        <h2 class="text-2xl font-black">Choisir selon votre besoin <i class="fa-solid fa-compass text-[#ef7037]"></i></h2>
        <div class="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          @for (occasion of occasions; track occasion.title) {
            <article class="text-center">
              <div class="mx-auto grid size-24 place-items-center rounded-full bg-[#f8eadf] text-3xl text-[#ef7037]"><i class="fa-solid {{ occasion.icon }}"></i></div>
              <h3 class="mt-3 text-xs font-black uppercase">{{ occasion.title }}</h3>
            </article>
          }
        </div>
      </section>

      <section class="w-full px-5 py-8 lg:px-12 xl:px-16">
        <div class="grid gap-4 rounded-2xl bg-[#8f9a73] p-5 text-white lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <h2 class="text-2xl font-black">10% de temps gagné dès la première semaine</h2>
            <p class="mt-2 text-sm font-semibold text-white/75">Centralisez votre activité et évitez les fichiers dispersés.</p>
          </div>
          <form class="flex rounded-full bg-white p-2">
            <input class="min-w-0 flex-1 rounded-full px-4 text-sm text-[#283f2f] outline-none" placeholder="Votre adresse email" />
            <a routerLink="/register" class="rounded-full bg-[#f47735] px-5 py-3 text-xs font-black uppercase text-white">S’inscrire</a>
          </form>
        </div>
      </section>

      <footer class="mt-10 border-t border-[#ead8c9] bg-[#fffaf3] px-5 py-10 lg:px-12 xl:px-16">
        <div class="grid w-full gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a routerLink="/" class="block rounded-2xl bg-white/90 p-2 shadow-sm"><img src="/assets/samabiz-logo.png" alt="SamaBiz" class="h-14 w-auto object-contain" /></a>
            <p class="mt-4 max-w-sm text-sm font-semibold leading-7 text-[#283f2f]/60">La plateforme SaaS pour gérer clients, produits, ventes, factures, dépenses, stock et statistiques depuis un seul endroit.</p>
          </div>
          <div>
            <h3 class="text-sm font-black uppercase text-[#2f5638]">Produit</h3>
            <div class="mt-4 grid gap-3 text-sm font-semibold text-[#283f2f]/65"><a href="#modules">Modules</a><a href="#tarifs">Tarifs</a><a routerLink="/register">Essai gratuit</a></div>
          </div>
          <div>
            <h3 class="text-sm font-black uppercase text-[#2f5638]">Entreprise</h3>
            <div class="mt-4 grid gap-3 text-sm font-semibold text-[#283f2f]/65"><a href="#story">À propos</a><a href="#collections">Solutions</a><a routerLink="/login">Connexion</a></div>
          </div>
          <div>
            <h3 class="text-sm font-black uppercase text-[#2f5638]">Contact</h3>
            <div class="mt-4 grid gap-3 text-sm font-semibold text-[#283f2f]/65"><span>Dakar, Sénégal</span><span>contact@sunubiz.app</span><span>Support prioritaire PRO</span></div>
          </div>
        </div>
        <div class="mt-10 flex w-full flex-wrap items-center justify-between gap-3 border-t border-[#ead8c9] pt-5 text-xs font-bold text-[#283f2f]/55">
          <span>© 2026 SamaBiz. Tous droits réservés.</span>
          <span>Ton business. Un seul endroit.</span>
        </div>
      </footer>
    </main>
  `,
})
export class HomePage {
  readonly heroStats = [
    { label: 'CA', value: '850k' },
    { label: 'Clients', value: '86' },
    { label: 'Ventes', value: '124' },
  ];

  readonly rows = [
    { initials: 'AD', name: 'Awa Diop', amount: '42 000' },
    { initials: 'MS', name: 'Mamadou Sarr', amount: '18 500' },
    { initials: 'FN', name: 'Fatou Ndiaye', amount: '63 000' },
  ];

  readonly promises = [
    { icon: 'fa-gears', title: 'Gestion simple', text: 'Tout au même endroit' },
    { icon: 'fa-building-shield', title: 'Multi-tenant', text: 'Données isolées' },
    { icon: 'fa-boxes-stacked', title: 'Stock clair', text: 'Alertes et mouvements' },
    { icon: 'fa-headset', title: 'Support local', text: 'Pensé pour PME' },
  ];

  readonly modules = [
    { icon: 'fa-users', title: 'Clients', text: 'Carnet complet' },
    { icon: 'fa-box-open', title: 'Produits', text: 'Prix et stock' },
    { icon: 'fa-cash-register', title: 'Ventes', text: 'Suivi paiement' },
    { icon: 'fa-file-invoice', title: 'Factures', text: 'Reçus et PDF' },
  ];

  readonly occasions = [
    { icon: 'fa-rocket', title: 'Starter' },
    { icon: 'fa-store', title: 'Commerce' },
    { icon: 'fa-briefcase', title: 'Freelance' },
    { icon: 'fa-shop', title: 'Boutique' },
    { icon: 'fa-boxes-packing', title: 'Stock' },
    { icon: 'fa-user-group', title: 'Équipe' },
  ];

  readonly pricingPlans = [
    {
      name: 'Free',
      badge: '7 jours offerts',
      price: '0',
      action: 'Essayer gratuitement',
      description: 'Découvrez les outils essentiels pour démarrer votre activité.',
      features: ['20 clients', '30 produits', '30 ventes par mois', 'Dashboard basique'],
      featured: false,
    },
    {
      name: 'Starter',
      badge: '',
      price: '2 500',
      action: 'Choisir Starter',
      description: 'Pour les petits commerces qui vendent régulièrement.',
      features: ['Clients illimités', 'Produits étendus', 'Commandes', 'Factures simples'],
      featured: false,
    },
    {
      name: 'Business',
      badge: 'Recommandé',
      price: '5 000',
      action: 'Choisir Business',
      description: 'Pour piloter stock, dépenses et statistiques.',
      features: ['Gestion du stock', 'Dépenses', 'Statistiques avancées', 'Exports'],
      featured: true,
    },
    {
      name: 'Pro',
      badge: '',
      price: '10 000',
      action: 'Choisir Pro',
      description: 'Pour les équipes avec rôles et rapports avancés.',
      features: ['Plusieurs utilisateurs', 'Rôles et permissions', 'Rapports avancés', 'Support prioritaire'],
      featured: false,
    },
  ];
}
