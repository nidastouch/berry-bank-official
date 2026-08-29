'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

export function SignupForm() {
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState('sending');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('firstName') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          zipCode: String(data.get('zipCode') ?? '').trim(),
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState('error');
        setMessage(body.error ?? 'That did not go through. Try again in a moment.');
        return;
      }

      setState('done');
      form.reset();
    } catch {
      setState('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  if (state === 'done') {
    return (
      <p className="form-done" role="status">
        You are on the list. We will write when there is something to say.
      </p>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label className="label" htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="input"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="zipCode">ZIP code</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            className="input"
          />
          <span className="field-note">So we know where to open next.</span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input"
        />
      </div>

      <button type="submit" className="btn btn-solid form-submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Adding you…' : 'Send me updates'}
      </button>

      {state === 'error' && (
        <p className="form-error" role="alert">{message}</p>
      )}
    </form>
  );
}
