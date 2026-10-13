import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ standalone: true, template: `<div class="space-y-6"><div><h2 class="text-3xl font-black">{{ title }}</h2><p class="text-sm font-semibold text-ink/60">Module prêt à connecter aux use cases dédiés</p></div><section class="rounded-lg border border-black/10 bg-white p-5 shadow-soft"><div class="grid gap-3 sm:grid-cols-3"><button class="rounded-md bg-sunu px-4 py-3 font-black text-white">Créer</button><button class="rounded-md border border-black/10 px-4 py-3 font-black">Filtrer</button><button class="rounded-md border border-black/10 px-4 py-3 font-black">Exporter</button></div></section></div>` })
export class ModulePlaceholderPage {
  readonly title = inject(ActivatedRoute).snapshot.data['title'] ?? 'Module';
}
