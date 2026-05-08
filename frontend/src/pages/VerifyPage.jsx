/**
 * VerifyPage
 * Certificate verification page - accessible via QR code scan
 * Route: /verify/:id
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCertificateById } from '../utils/api';

export default function VerifyPage() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getCertificateById(id)
      .then((res) => setCertificate(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-slide-up">
          <div className="text-6xl mb-6">❌</div>

          <h1 className="font-display text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">
            Certificate Not Found
          </h1>

          <p className="text-stone-500 dark:text-stone-400 mb-8">
            No certificate found with ID:
            <span className="font-mono font-medium text-stone-700 dark:text-stone-300">
              {" "}
              {id}
            </span>
          </p>

          <Link to="/" className="btn-primary inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full animate-slide-up">
        {/* Verified badge */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-600 shadow-lg">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">
            Certificate Verified
          </h1>

          <p className="text-stone-500 dark:text-stone-400">
            This is an authentic certificate issued by Amaanitvam Foundation.
          </p>
        </div>

        {/* Certificate details card */}
        <div className="card p-8 border-emerald-200 dark:border-emerald-800">
          <div className="space-y-4">
            {[
              {
                label: 'Certificate ID',
                value: certificate.certificateId,
                mono: true,
              },
              {
                label: 'Recipient',
                value: certificate.fullName,
                large: true,
              },
              {
                label: 'Role',
                value: certificate.role,
              },
              {
                label: 'Event / Program',
                value: certificate.eventName,
              },
              {
                label: 'Date',
                value: certificate.date,
              },
              {
                label: 'Issued On',
                value: certificate.createdAt
                  ? new Date(certificate.createdAt).toLocaleDateString(
                      'en-IN',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )
                  : 'N/A',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider font-medium">
                  {item.label}
                </span>

                <span
                  className={`${
                    item.large
                      ? 'font-display text-xl font-semibold'
                      : 'text-base'
                  } ${
                    item.mono
                      ? 'font-mono text-emerald-700 dark:text-emerald-400'
                      : 'text-stone-800 dark:text-stone-100'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Issuer */}
          <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-display font-bold">
                अ
              </span>
            </div>

            <div>
              <p className="font-display font-semibold text-stone-800 dark:text-stone-100 text-sm">
                Amaanitvam Foundation
              </p>

              <p className="text-xs text-stone-500 dark:text-stone-400">
                Verified Issuing Authority
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            ← Back to Amaanitvam Foundation
          </Link>
        </div>
      </div>
    </main>
  );
}