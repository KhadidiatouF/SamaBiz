import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `<main class="grid min-h-screen place-items-center bg-[#f7f7f2] p-4"><section class="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-soft"><h1 class="text-2xl font-black">Mot de passe oublié</h1><input class="mt-6 w-full rounded-md border border-black/10 px-3 py-3" placeholder="Email" /><button class="mt-4 w-full rounded-md bg-sunu px-4 py-3 font-black text-white">Envoyer</button><a routerLink="/login" class="mt-5 block text-center text-sm font-semibold text-sunu">Retour</a></section></main>`,
})
export class ForgotPasswordPage {}
