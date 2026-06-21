import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const MessagesEditor = () => {
  const { authFetch } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      } else {
        showToast(data.message || 'Failed to fetch messages.');
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await authFetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('Message deleted successfully.');
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } else {
        showToast(data.message || 'Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting message.');
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showToast(`Email copied: ${email}`);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Colorful avatars for different names to make it look visually stunning
  const getAvatarGradient = (name) => {
    const charCodeSum = (name || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-fuchsia-500 to-purple-600',
    ];
    return gradients[charCodeSum % gradients.length];
  };

  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase();
    return (
      (msg.name || '').toLowerCase().includes(query) ||
      (msg.email || '').toLowerCase().includes(query) ||
      (msg.subject || '').toLowerCase().includes(query) ||
      (msg.message || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Contact Messages"
        subtitle="View and manage messages sent through your website contact form."
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        }
      />

      {/* Control Bar: Search & Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-4 top-3.5 text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name, email, subject, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300 placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-300 text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Count Indicator */}
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Total Messages: <span className="text-blue-400 font-mono text-sm">{filteredMessages.length}</span>
        </div>
      </div>

      {loading ? (
        /* Loading Skeleton Grid */
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/[0.04]" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-white/[0.04] rounded w-1/3" />
                  <div className="h-3 bg-gray-200 dark:bg-white/[0.04] rounded w-1/2" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-white/[0.04] rounded w-2/3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-white/[0.04] rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-white/[0.04] rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        /* Empty State */
        <div className="p-16 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] text-center max-w-xl mx-auto mt-10">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center text-gray-500 mx-auto mb-4 border border-gray-200 dark:border-white/[0.08]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
            {messages.length === 0 ? 'No Messages Yet' : 'No Results Found'}
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            {messages.length === 0
              ? 'When visitors fill out the contact form on your portfolio website, their messages will show up here.'
              : 'Try checking your spelling or search for something else.'}
          </p>
        </div>
      ) : (
        /* Messages Cards Grid */
        <div className="grid md:grid-cols-2 gap-5">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
            >
              <div>
                {/* Header: Avatar, Name, Email, Action */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Monogram Avatar */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarGradient(msg.name)} flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0`}>
                      {getInitials(msg.name)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-gray-900 dark:text-white font-semibold text-sm truncate">{msg.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 truncate mt-0.5">
                        <a href={`mailto:${msg.email}`} className="hover:text-blue-400 hover:underline truncate">
                          {msg.email}
                        </a>
                        <button
                          onClick={() => handleCopyEmail(msg.email)}
                          title="Copy Email"
                          className="text-gray-600 hover:text-gray-400 p-0.5 hover:bg-white/5 rounded transition-all cursor-pointer inline-flex"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Submission date */}
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] px-2.5 py-1 rounded-full">
                    {new Date(msg.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Subject */}
                <div className="mb-2">
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest block mb-0.5">Subject</span>
                  <h5 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug">{msg.subject}</h5>
                </div>

                {/* Message Text */}
                <div className="mb-6">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">Message</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap select-text bg-gray-50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.03] p-3.5 rounded-xl">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons with confirmation */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/[0.04] flex flex-wrap justify-end items-center gap-2">
                {confirmDeleteId === msg._id ? (
                  <div className="flex flex-wrap items-center justify-end gap-2 animate-fade-in">
                    <span className="text-xs text-red-400 font-medium">Delete permanently?</span>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
                    >
                      {deletingId === msg._id ? (
                        <svg className="animate-spin w-3 h-3 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : null}
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      disabled={deletingId === msg._id}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-white/[0.04] border border-gray-300 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/[0.08] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:border dark:border-blue-500/20 text-white dark:text-blue-400 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                      </svg>
                      Reply
                    </a>
                    <button
                      onClick={() => setConfirmDeleteId(msg._id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/10 hover:border-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Message"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default MessagesEditor;
