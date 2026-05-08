/**
 * CertificatePreview Component
 * Renders the visual certificate design that gets exported to PDF
 * This component is the source for html2canvas capture
 */

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function CertificatePreview({ data, forExport = false }) {
  const { fullName, role, eventName, date, certificateId } = data;

  const qrRef = useRef(null);

  const verifyUrl = `${window.location.origin}/verify/${certificateId}`;

  useEffect(() => {
    if (qrRef.current && certificateId) {
      QRCode.toCanvas(qrRef.current, verifyUrl, {
        width: forExport ? 140 : 90,
        margin: 1,
        color: {
          dark: '#064e3b',
          light: '#fffef0',
        },
      }).catch(console.error);
    }
  }, [certificateId, verifyUrl, forExport]);

  const baseSize = forExport
    ? 'w-[900px] h-[636px] text-base'
    : 'w-full max-w-3xl text-[clamp(9px,1.4vw,14px)]';

  return (
    <div
      id="certificate-preview"
      className={`${baseSize} relative bg-[#fffef0] overflow-hidden`}
      style={{
        fontFamily: "'Playfair Display', serif",
        aspectRatio: '1.414 / 1',
        border: '12px solid #064e3b',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
      }}
    >
      {/* OUTER DECORATIVE BORDER */}
      <div
        className="absolute inset-3 pointer-events-none"
        style={{
          border: '2px solid #d4af37',
        }}
      />

      <div
        className="absolute inset-4 pointer-events-none"
        style={{
          border: '1px solid rgba(212,175,55,0.4)',
        }}
      />

      {/* CORNER ORNAMENTS */}
      {[
        'top-2 left-2',
        'top-2 right-2 rotate-90',
        'bottom-2 left-2 -rotate-90',
        'bottom-2 right-2 rotate-180',
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-12 h-12 opacity-60`}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <path
              d="M2 2L20 2L2 20Z"
              fill="#d4af37"
              opacity="0.8"
            />

            <path
              d="M2 2L8 2L2 8Z"
              fill="#064e3b"
            />
          </svg>
        </div>
      ))}

      {/* WATERMARK */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none"
        style={{
          fontSize: '10em',
          fontFamily: 'serif',
          color: '#064e3b',
        }}
      >
        अ
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-16 py-8">
        {/* HEADER */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]" />

            <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <span
                style={{
                  color: '#d4af37',
                  fontWeight: 'bold',
                  fontSize: '1.1em',
                }}
              >
                अ
              </span>
            </div>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h1
            style={{
              color: '#064e3b',
              fontSize: '1.8em',
              letterSpacing: '0.05em',
              marginBottom: '2px',
            }}
          >
            AMAANITVAM FOUNDATION
          </h1>

          <p
            style={{
              color: '#8B7355',
              fontSize: '0.75em',
              letterSpacing: '0.2em',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            अमानित्वम् — HUMILITY IN SERVICE
          </p>
        </div>

        {/* CERTIFICATE TITLE */}
        <div className="text-center">
          <p
            style={{
              color: '#9B7D4F',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75em',
              letterSpacing: '0.3em',
              marginBottom: '4px',
            }}
          >
            THIS IS TO CERTIFY THAT
          </p>

          <div
            style={{
              borderBottom: '2px solid #d4af37',
              paddingBottom: '4px',
              marginBottom: '4px',
            }}
          >
            <h2
              style={{
                color: '#064e3b',
                fontSize: '2.4em',
                fontStyle: 'italic',
                fontWeight: '600',
                lineHeight: 1.2,
              }}
            >
              {fullName || 'Recipient Name'}
            </h2>
          </div>

          <p
            style={{
              color: '#6B5B3E',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8em',
            }}
          >
            has successfully served as{' '}
            <strong style={{ color: '#064e3b' }}>
              {role || 'Volunteer'}
            </strong>
          </p>

          <p
            style={{
              color: '#6B5B3E',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8em',
              marginTop: '4px',
            }}
          >
            in{' '}
            <strong
              style={{
                color: '#064e3b',
                fontStyle: 'italic',
              }}
            >
              {eventName || 'Program Name'}
            </strong>
          </p>

          <p
            style={{
              color: '#9B8060',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75em',
              marginTop: '6px',
            }}
          >
            on {date || 'DD/MM/YYYY'}
          </p>
        </div>

        {/* FOOTER */}
        <div className="w-full flex items-end justify-between">
          {/* SIGNATURE 1 */}
          <div
            className="text-center"
            style={{
              minWidth: '140px',
            }}
          >
            <div
              style={{
                width: '120px',
                borderBottom: '1.5px solid #9B8060',
                marginBottom: '4px',
                paddingBottom: '2px',
              }}
            >
              <span
                style={{
                  fontStyle: 'italic',
                  fontSize: '1.4em',
                  color: '#064e3b',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Director
              </span>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65em',
                color: '#9B8060',
                letterSpacing: '0.1em',
              }}
            >
              DIRECTOR
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6em',
                color: '#B09070',
              }}
            >
              Amaanitvam Foundation
            </p>
          </div>

          {/* QR + CERTIFICATE ID */}
          <div className="flex flex-col items-center gap-1">
            <canvas
              ref={qrRef}
              style={{
                borderRadius: '4px',
              }}
            />

            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6em',
                color: '#9B8060',
                letterSpacing: '0.05em',
              }}
            >
              {certificateId ||
                `AMAN-${new Date().getFullYear()}-001`}
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.55em',
                color: '#B09070',
              }}
            >
              Scan to verify
            </p>
          </div>

          {/* SIGNATURE 2 */}
          <div
            className="text-center"
            style={{
              minWidth: '140px',
            }}
          >
            <div
              style={{
                width: '120px',
                borderBottom: '1.5px solid #9B8060',
                marginBottom: '4px',
                paddingBottom: '2px',
                marginLeft: 'auto',
              }}
            >
              <span
                style={{
                  fontStyle: 'italic',
                  fontSize: '1.4em',
                  color: '#064e3b',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Coordinator
              </span>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65em',
                color: '#9B8060',
                letterSpacing: '0.1em',
              }}
            >
              PROGRAM COORDINATOR
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6em',
                color: '#B09070',
              }}
            >
              Amaanitvam Foundation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}