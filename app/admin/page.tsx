'use client';
import { useEffect, useState } from 'react';

type Submission = { id: string; name: string; email: string; area: string; message: string; createdAt: string };
type PortfolioItem = { id: string; name: string; area: string; title: string; description: string; link: string; createdAt: string };

export default function Admin() {
  const [auth, setAuth] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<'submissions' | 'portfolio'>('submissions');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth');
    if (saved) { setAuth(saved); setLoggedIn(true); }
  }, []);

  useEffect(() => {
    if (!loggedIn || !auth) return;
    setLoading(true);
    setError('');
    const headers = { Authorization: `Basic ${auth}` };
    Promise.all([
      fetch('/api/submissions', { headers }).then(r => r.ok ? r.json() : []),
      fetch('/api/portfolio', { headers }).then(r => r.ok ? r.json() : []),
    ]).then(([s, p]) => {
      setSubmissions(Array.isArray(s) ? s : []);
      setPortfolio(Array.isArray(p) ? p : []);
    }).catch(() => setError('Failed to load data')).finally(() => setLoading(false));
  }, [loggedIn, auth]);

  const handleLogin = () => {
    const encoded = btoa('freedems:freedems2024');
    setAuth(encoded);
    sessionStorage.setItem('admin_auth', encoded);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f3f7', fontFamily: 'Inter, Arial, sans-serif' }}>
        <div style={{ background: 'white', padding: 40, borderRadius: 14, border: '1px solid #e2dfe8', maxWidth: 380, width: '100%' }}>
          <h1 style={{ font: '700 24px Georgia', margin: '0 0 8px' }}>FREDEMS Admin</h1>
          <p style={{ color: '#6b6580', fontSize: 14, margin: '0 0 24px' }}>Enter your credentials to access the dashboard.</p>
          <input
            type="password"
            placeholder="Password"
            onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
            style={{ width: '100%', padding: '13px 15px', border: '1px solid #d8d5dd', borderRadius: 8, fontSize: 14, marginBottom: 16, boxSizing: 'border-box', fontFamily: 'Inter, Arial, sans-serif' }}
          />
          <button onClick={handleLogin} style={{ width: '100%', padding: '14px 22px', border: 0, borderRadius: 8, background: '#684aa7', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Sign in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f4f3f7', fontFamily: 'Inter, Arial, sans-serif', padding: '40px clamp(22px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ font: '700 28px Georgia', margin: '0 0 4px' }}>FREDEMS Admin Dashboard</h1>
            <p style={{ color: '#6b6580', fontSize: 14, margin: 0 }}>View form submissions and portfolio entries</p>
          </div>
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setLoggedIn(false); }} style={{ padding: '10px 18px', border: '2px solid #d8d5dd', borderRadius: 8, background: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            Sign out
          </button>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <button onClick={() => setTab('submissions')} style={{ padding: '10px 20px', borderRadius: 8, border: 0, background: tab === 'submissions' ? '#684aa7' : 'white', color: tab === 'submissions' ? 'white' : '#11111f', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}>
            Submissions ({submissions.length})
          </button>
          <button onClick={() => setTab('portfolio')} style={{ padding: '10px 20px', borderRadius: 8, border: 0, background: tab === 'portfolio' ? '#684aa7' : 'white', color: tab === 'portfolio' ? 'white' : '#11111f', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}>
            Portfolio ({portfolio.length})
          </button>
        </div>

        {loading && <p style={{ color: '#6b6580' }}>Loading...</p>}
        {error && <p style={{ color: '#dc3545' }}>{error}</p>}

        {tab === 'submissions' && !loading && (
          <div style={{ display: 'grid', gap: 16 }}>
            {submissions.length === 0 && <p style={{ color: '#6b6580', textAlign: 'center', padding: 40 }}>No submissions yet.</p>}
            {submissions.map(s => (
              <div key={s.id} style={{ background: 'white', border: '1px solid #e2dfe8', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ font: '700 16px Georgia', margin: '0 0 4px' }}>{s.name}</h3>
                    <p style={{ color: '#6b6580', fontSize: 13, margin: 0 }}>{s.email}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#999' }}>{new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 4, background: '#684aa720', color: '#684aa7', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', marginBottom: 10 }}>{s.area}</div>
                <p style={{ color: '#333', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.message}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'portfolio' && !loading && (
          <div style={{ display: 'grid', gap: 16 }}>
            {portfolio.length === 0 && <p style={{ color: '#6b6580', textAlign: 'center', padding: 40 }}>No portfolio entries yet.</p>}
            {portfolio.map(p => (
              <div key={p.id} style={{ background: 'white', border: '1px solid #e2dfe8', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ font: '700 16px Georgia', margin: '0 0 4px' }}>{p.title}</h3>
                    <p style={{ color: '#6b6580', fontSize: 13, margin: 0 }}>by {p.name}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#999' }}>{new Date(p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 4, background: '#684aa720', color: '#684aa7', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', marginBottom: 10 }}>{p.area}</div>
                <p style={{ color: '#333', fontSize: 14, lineHeight: 1.6, margin: '0 0 10px' }}>{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: '#684aa7', fontWeight: 700, fontSize: 13 }}>{p.link}</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
