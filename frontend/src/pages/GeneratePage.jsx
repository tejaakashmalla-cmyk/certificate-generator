/**
 * GeneratePage
 * Certificate generation form + live preview + PDF download
 */

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createCertificate } from '../utils/api';
import CertificatePreview from '../components/CertificatePreview';

const initialForm = {
  fullName: '',
  role: '',
  eventName: '',
  date: '',
};

export default function GeneratePage() {
  const [form, setForm] = useState(initialForm);

  const [certificate, setCertificate] = useState(null);

  const [loading, setLoading] = useState(false);

  const [downloading, setDownloading] = useState(false);

  const previewRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form → create certificate in DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.role ||
      !form.eventName ||
      !form.date
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await createCertificate(form);

      // DEBUG
      console.log("FULL RESPONSE:", res);
      console.log(
        "CERTIFICATE DATA:",
        res.data?.data || res.data
      );

      // FIXED RESPONSE
      setCertificate(
        res.data?.data || res.data
      );

      toast.success(
        'Certificate generated! 🎓'
      );

      // Scroll to preview
      setTimeout(() => {
        previewRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
          'Failed to generate certificate.'
      );

    } finally {

      setLoading(false);

    }
  };

  // Download certificate as PDF using html2canvas + jsPDF
  const handleDownload = async () => {

    try {

      const el =
        document.getElementById(
          'certificate-preview'
        );

      // DEBUG
      console.log("ELEMENT:", el);
      console.log("STATE:", certificate);

      if (!el) {
        toast.error(
          'Certificate preview not found'
        );
        return;
      }

      setDownloading(true);

      const canvas =
        await html2canvas(el, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#fffef0',
          logging: false,
        });

      const imgData =
        canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [
          canvas.width,
          canvas.height,
        ],
      });

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        canvas.width,
        canvas.height
      );

      pdf.save(
        `${
          certificate?.certificateId ||
          'certificate'
        }.pdf`
      );

      toast.success(
        'Certificate downloaded! 📄'
      );

    } catch (err) {

      console.error(err);

      toast.error(
        'Download failed. Please try again.'
      );

    } finally {

      setDownloading(false);

    }
  };

  // Reset to generate another certificate
  const handleReset = () => {
    setCertificate(null);

    setForm(initialForm);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12">

          <h1 className="section-title mb-3">
            Certificate Generator
          </h1>

          <p className="text-stone-500 dark:text-stone-400">
            Fill in the details below to generate an official Amaanitvam Foundation certificate.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Form ── */}
          <div className="card p-8">

            <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-6">
              Recipient Details
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}
              <div>

                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Priya Sharma"
                  className="input-field"
                  required
                />

              </div>

              {/* Role */}
              <div>

                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Role / Designation <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g., Lead Volunteer / Intern"
                  className="input-field"
                  required
                />

              </div>

              {/* Event Name */}
              <div>

                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Event / Internship Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="eventName"
                  value={form.eventName}
                  onChange={handleChange}
                  placeholder="e.g., Summer Internship Program 2026"
                  className="input-field"
                  required
                />

              </div>

              {/* Date */}
              <div>

                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
              >

                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  '🎓 Generate Certificate'
                )}

              </button>

            </form>

            {/* Certificate ID display */}
            {certificate && (

              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-fade-in">

                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  ✅ Certificate Created
                </p>

                <p className="font-mono text-lg font-semibold text-emerald-800 dark:text-emerald-300 mt-1">
                  {certificate.certificateId}
                </p>

              </div>

            )}

          </div>

          {/* ── Preview Panel ── */}
          <div
            ref={previewRef}
            className="space-y-6"
          >

            <div className="card p-6">

              <div className="flex items-center justify-between mb-4">

                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-100">
                  {certificate
                    ? 'Your Certificate'
                    : 'Live Preview'}
                </h2>

                {!certificate && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full font-medium">
                    Preview only
                  </span>
                )}

              </div>

              {/* Certificate visual */}
              <div className="overflow-auto">

                <CertificatePreview
                  data={
                    certificate || {
                      ...form,
                      certificateId: 'AMAN-2026-XXX',
                      date: form.date
                        ? new Date(
                            form.date
                          ).toLocaleDateString(
                            'en-IN',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }
                          )
                        : '',
                    }
                  }
                />

              </div>

            </div>

            {/* DEBUG */}
            {console.log(
              "CURRENT CERTIFICATE:",
              certificate
            )}

            {/* Download & Reset buttons */}
            {certificate && (

              <div className="flex gap-3 animate-slide-up">

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >

                  {downloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Preparing PDF...
                    </>
                  ) : (
                    '📄 Download PDF'
                  )}

                </button>

                <button
                  onClick={handleReset}
                  className="btn-secondary px-5"
                >
                  New ↺
                </button>

              </div>

            )}

          </div>
        </div>
      </div>
    </main>
  );
}