'use client';

import type { FormEvent } from 'react';
import { site } from '@/lib/content';

// No backend yet: submitting opens the visitor's mail client with the message
// prefilled. Swap handleSubmit for a fetch() to an API route or form service.
export function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get('name') ?? ''), email = String(d.get('email') ?? ''), message = String(d.get('message') ?? '');
    const subject = `Projet — ${name || 'contact'}`;
    const body = `${message}\n\n${name}${email ? ` <${email}>` : ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="f-name">Nom</label>
        <input className="input" id="f-name" name="name" autoComplete="name" placeholder="Ada Lovelace" />
      </div>
      <div className="field">
        <label htmlFor="f-email">E-mail</label>
        <input className="input" id="f-email" name="email" type="email" autoComplete="email" placeholder="ada@entreprise.fr" />
      </div>
      <div className="field full">
        <label htmlFor="f-msg">Projet</label>
        <textarea className="input" id="f-msg" name="message" placeholder="Robot, caméra, tâche, délai…" />
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Envoyer le message</button>
    </form>
  );
}
