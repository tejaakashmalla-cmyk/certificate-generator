/**
 * AdminDashboard
 * View, search, and delete certificates. Protected by JWT auth.
 */

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getAllCertificates, deleteCertificate } from '../utils/api';
import { useAuth } from '../context/AuthContext';

// Format ISO date to readable string
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// Confirmation dialog component
const ConfirmDialog = ({ name, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div className="card p-6 max-w-sm w-full shadow-2xl animate-slide-up">
      <h3 className="font-display text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
        Delete Certificate?
      </h3>

      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
        This will permanently delete the certificate for{' '}
        <strong>{name}</strong>.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-xl transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { admin } = useAuth();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // FETCH CERTIFICATES
  const fetchCertificates = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getAllCertificates();

      // FIXED RESPONSE HANDLING
      const allCertificates = res.data || [];

      // SEARCH FILTER
      const filtered = allCertificates.filter((c) => {
        const q = search.toLowerCase();

        return (
          c.fullName?.toLowerCase().includes(q) ||
          c.certificateId?.toLowerCase().includes(q)
        );
      });

      setCertificates(filtered);
    } catch (err) {
      console.log(err);

      toast.error('Failed to load certificates.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  // DELETE CERTIFICATE
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteCertificate(deleteTarget._id);

      setCertificates((prev) =>
        prev.filter((c) => c._id !== deleteTarget._id)
      );

      toast.success('Certificate deleted.');
    } catch (err) {
      console.log(err);

      toast.error('Failed to delete.');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // DASHBOARD STATS
  const stats = [
    {
      label: 'Total Certificates',
      value: certificates.length,
      icon: '🎓',
    },
    {
      label: 'This Month',
      value: certificates.filter(
        (c) =>
          new Date(c.createdAt).getMonth() ===
          new Date().getMonth()
      ).length,
      icon: '📅',
    },
    {
      label: 'Unique Events',
      value: new Set(
        certificates.map((c) => c.eventName)
      ).size,
      icon: '🌿',
    },
  ];

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="section-title">
              Admin Dashboard
            </h1>

            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              Welcome back,
              <span className="font-medium text-emerald-700 dark:text-emerald-400">
                {' '}
                {admin?.username || admin?.email}
              </span>
            </p>
          </div>

          <a
            href="/generate"
            className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
          >
            + New Certificate
          </a>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="card p-5 text-center"
            >
              <div className="text-2xl mb-1">
                {s.icon}
              </div>

              <div className="font-display text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {s.value}
              </div>

              <div className="text-stone-500 dark:text-stone-400 text-xs mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* TABLE CARD */}
        <div className="card overflow-hidden">
          {/* SEARCH */}
          <div className="p-5 border-b border-stone-100 dark:border-stone-800">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="🔍 Search by name or certificate ID..."
              className="input-field"
            />
          </div>

          {/* TABLE */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-20 text-stone-400 dark:text-stone-600">
              <div className="text-5xl mb-4">
                🎓
              </div>

              <p className="font-display text-xl">
                No certificates found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 dark:bg-stone-800/50">
                    {[
                      'Certificate ID',
                      'Full Name',
                      'Role',
                      'Event',
                      'Date',
                      'Created',
                      'Actions',
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {certificates.map((cert) => (
                    <tr
                      key={cert._id}
                      className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded">
                          {cert.certificateId}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-200 text-sm">
                        {cert.fullName}
                      </td>

                      <td className="px-4 py-3 text-stone-600 dark:text-stone-400 text-sm">
                        {cert.role}
                      </td>

                      <td className="px-4 py-3 text-stone-600 dark:text-stone-400 text-sm">
                        {cert.eventName}
                      </td>

                      <td className="px-4 py-3 text-stone-500 dark:text-stone-400 text-sm">
                        {cert.date}
                      </td>

                      <td className="px-4 py-3 text-stone-400 text-xs">
                        {formatDate(cert.createdAt)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* VIEW */}
                          <a
                            href={`/verify/${cert.certificateId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                          >
                            View
                          </a>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              setDeleteTarget(cert)
                            }
                            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* FOOTER */}
          {certificates.length > 0 && (
            <div className="px-5 py-3 border-t border-stone-100 dark:border-stone-800 text-sm text-stone-400 dark:text-stone-600">
              Showing {certificates.length} certificate
              {certificates.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRM DIALOG */}
      {deleteTarget && (
        <ConfirmDialog
          name={deleteTarget.fullName}
          onConfirm={handleDelete}
          onCancel={() =>
            setDeleteTarget(null)
          }
        />
      )}
    </main>
  );
}