import { Component } from '@angular/core';

@Component({ standalone: true, template: `<main class="grid min-h-screen place-items-center bg-[#f7f7f2] p-4"><section class="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-soft"><h1 class="text-2xl font-black">Réinitialisation</h1><input class="mt-6 w-full rounded-md border border-black/10 px-3 py-3" placeholder="Nouveau mot de passe" type="password" /><button class="mt-4 w-full rounded-md bg-sunu px-4 py-3 font-black text-white">Enregistrer</button></section></main>` })
export class ResetPasswordPage {}
