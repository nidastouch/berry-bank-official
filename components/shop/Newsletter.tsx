'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { MagneticButton } from '@/components/core';

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'] as const;

const COUNTRY_CODES = [
  { code: '+1', label: '🇺🇸 +1', country: 'US' },
  { code: '+52', label: '🇲🇽 +52', country: 'MX' },
  { code: '+55', label: '🇧🇷 +55', country: 'BR' },
  { code: '+57', label: '🇨🇴 +57', country: 'CO' },
  { code: '+54', label: '🇦🇷 +54', country: 'AR' },
  { code: '+56', label: '🇨🇱 +56', country: 'CL' },
  { code: '+51', label: '🇵🇪 +51', country: 'PE' },
  { code: '+593', label: '🇪🇨 +593', country: 'EC' },
  { code: '+58', label: '🇻🇪 +58', country: 'VE' },
  { code: '+502', label: '🇬🇹 +502', country: 'GT' },
  { code: '+503', label: '🇸🇻 +503', country: 'SV' },
  { code: '+504', label: '🇭🇳 +504', country: 'HN' },
  { code: '+506', label: '🇨🇷 +506', country: 'CR' },
  { code: '+507', label: '🇵🇦 +507', country: 'PA' },
  { code: '+591', label: '🇧🇴 +591', country: 'BO' },
  { code: '+595', label: '🇵🇾 +595', country: 'PY' },
  { code: '+598', label: '🇺🇾 +598', country: 'UY' },
  { code: '+1', label: '🇨🇦 +1', country: 'CA' },
  { code: '+44', label: '🇬🇧 +44', country: 'UK' },
  { code: '+34', label: '🇪🇸 +34', country: 'ES' },
] as const;

const inputStyles =
  'w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-mist placeholder:text-mist/40 focus:outline-none focus:border-berry/50 focus:bg-white/10 transition-all disabled:opacity-50 text-sm';

export function Newsletter() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isDisabled = status === 'loading' || status === 'success';
  const canSubmit = firstName && lastName && email && ageRange && !isDisabled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          zipCode: zipCode.trim() || undefined,
          phone: phone.trim() ? `${countryCode} ${phone.trim()}` : undefined,
          ageRange,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Welcome to the movement! Check your inbox.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setZipCode('');
        setCountryCode('+1');
        setPhone('');
        setAgeRange('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-berry/10 border border-berry/20 mb-4">
          <Mail className="w-4 h-4 text-berry" />
          <span className="text-sm font-medium text-berry">Newsletter</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-mist mb-3">
          Join the Movement
        </h3>
        <p className="text-mist/60">
          Be the first to know about our launch and exclusive updates.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        {/* Row 1: First & Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name *"
            disabled={isDisabled}
            className={inputStyles}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name *"
            disabled={isDisabled}
            className={inputStyles}
          />
        </div>

        {/* Row 2: Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address *"
          disabled={isDisabled}
          className={inputStyles}
        />

        {/* Row 3: Phone & Zip */}
        <div className="grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[1fr_1fr]">
          <div className="flex gap-2">
            <div className="relative shrink-0">
              <select
                value={`${countryCode}|${COUNTRY_CODES.find(c => c.code === countryCode)?.country || 'US'}`}
                onChange={(e) => setCountryCode(e.target.value.split('|')[0])}
                disabled={isDisabled}
                className={`${inputStyles} appearance-none cursor-pointer w-[90px] pr-7 text-center`}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={`${c.code}-${c.country}`} value={`${c.code}|${c.country}`} className="bg-void text-mist">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-mist/40 pointer-events-none" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              disabled={isDisabled}
              className={`${inputStyles} flex-1`}
            />
          </div>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip code (optional)"
            disabled={isDisabled}
            className={inputStyles}
          />
        </div>

        {/* Row 4: Age Range */}
        <div className="relative">
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            disabled={isDisabled}
            className={`${inputStyles} appearance-none cursor-pointer ${!ageRange ? 'text-mist/40' : ''}`}
          >
            <option value="" disabled>Age range *</option>
            {AGE_RANGES.map((range) => (
              <option key={range} value={range} className="bg-void text-mist">
                {range}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mist/40 pointer-events-none" />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => {}}
            disabled={!canSubmit}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Joined!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Join the Waitlist
              </span>
            )}
          </MagneticButton>
        </div>

        {/* Status Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm text-center ${
              status === 'success' ? 'text-growth' : 'text-red-400'
            }`}
          >
            {message}
          </motion.p>
        )}
      </motion.form>

      {/* Privacy Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center text-mist/30 text-xs mt-4"
      >
        We respect your privacy. Unsubscribe at any time.
      </motion.p>
    </div>
  );
}
