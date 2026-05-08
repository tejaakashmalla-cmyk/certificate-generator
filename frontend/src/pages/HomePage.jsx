/**
 * HomePage
 * Modern NGO-themed landing page for Amaanitvam Foundation
 */

import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { number: '500+', label: 'Certificates Issued' },
  { number: '12+', label: 'Programs & Events' },
  { number: '200+', label: 'Volunteers' },
  { number: '5+', label: 'Years of Impact' },
];

const features = [
  {
    icon: '🎓',
    title: 'Professional Certificates',
    desc: 'Beautiful, print-ready certificates with unique IDs for every achievement.',
  },
  {
    icon: '🔐',
    title: 'Secure & Verifiable',
    desc: 'Every certificate carries a QR code for instant authenticity verification.',
  },
  {
    icon: '⚡',
    title: 'Instant Generation',
    desc: 'Generate and download your PDF certificate in seconds.',
  },
  {
    icon: '🌿',
    title: 'NGO Focused',
    desc: 'Designed specifically for Amaanitvam Foundation volunteers and participants.',
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 dark:bg-emerald-950/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-100 dark:bg-amber-950/30 rounded-full blur-3xl opacity-50" />
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, #064e3b 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
              Official Certificate System
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-stone-800 dark:text-stone-100 mb-6 leading-tight">
            Amaanitvam
            <span className="block text-emerald-700 dark:text-emerald-400 italic font-medium">
              Foundation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-500 dark:text-stone-400 mb-4 font-light">
            अमानित्वम् — Humility in Service
          </p>

          <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate official certificates for volunteers, interns, and participants of
            Amaanitvam Foundation programs. Professional, verifiable, and beautifully designed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate" className="btn-primary text-center text-lg px-8 py-4">
              Generate Certificate →
            </Link>
            <Link to="/admin/login" className="btn-secondary text-center text-lg px-8 py-4">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ────────────────────────────────────────────────── */}
      <section className="py-16 bg-emerald-700 dark:bg-emerald-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-emerald-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Why Our Certificate System?</h2>
            <p className="text-stone-500 dark:text-stone-400 text-lg max-w-xl mx-auto">
              Built to honor the contributions of every person who serves alongside us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="card p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">
                  {f.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-100 dark:bg-stone-900/50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Fill the Form', desc: 'Enter participant details including name, role, and event.' },
              { step: '02', title: 'Preview Certificate', desc: 'See a live preview of the professional certificate before downloading.' },
              { step: '03', title: 'Download PDF', desc: 'Download a high-quality PDF ready for sharing or printing.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="font-display text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto card p-12 text-center border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-stone-900">
          <h2 className="section-title mb-4 text-emerald-800 dark:text-emerald-300">
            Ready to Generate a Certificate?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8">
            Honour someone's contribution to Amaanitvam Foundation today.
          </p>
          <Link to="/generate" className="btn-primary inline-block text-lg px-10 py-4">
            Get Started →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-stone-600 dark:text-stone-400">
            © 2026 Amaanitvam Foundation. All rights reserved.
          </div>
          <div className="text-sm text-stone-500 dark:text-stone-500 font-mono">
            Certificate System v1.0
          </div>
        </div>
      </footer>
    </main>
  );
}
