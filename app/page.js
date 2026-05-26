'use client';
import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [conflict, setConflict] = useState('');
  const [region, setRegion] = useState('Eastern Europe');
  const [analysisType, setAnalysisType] = useState('Full Brief');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';

  const handleGenerate = async () => {
    if (!conflict.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conflict, region, analysisType }),
      });
      const data = await res.json();
      setResult(data.brief);
    } catch (err) {
      setResult('Error generating brief. Please try again.');
    }
    setLoading(false);
  };

  const bg = isDark ? '#10141a' : '#f0ede8';
  const cardBg = isDark ? '#161c26' : '#ffffff';
  const border = isDark ? '#1e2a3a' : '#d4c9b0';
  const textMain = isDark ? '#e8dcc8' : '#1a2540';
  const textMuted = '#4a6080';
  const inputBg = isDark ? '#10141a' : '#f7f4ef';

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ background: '#1a2540', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2a3a60' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#c9a84c', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10141a', fontWeight: 500 }}>D</div>
          <span style={{ color: '#e8dcc8', fontSize: 13, letterSpacing: '0.12em' }}>DIPLOMATIC BRIEF</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#7a8fad', fontSize: 13 }}>Archive</span>
          <span style={{ color: '#7a8fad', fontSize: 13 }}>About</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#7a8fad', fontSize: 12 }}>{isDark ? 'DARK' : 'LIGHT'}</span>
            <div onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ width: 44, height: 24, background: isDark ? '#1e2a3a' : '#d4c9b0', borderRadius: 24, border: '1px solid #2a3a50', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 18, height: 18, background: '#c9a84c', borderRadius: '50%', position: 'absolute', top: 2, left: isDark ? 2 : 22, transition: 'left 0.2s' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '52px 32px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', borderBottom: '1px solid ' + border }}>
        <div>
          <div style={{ display: 'inline-block', border: '1px solid #c9a84c', color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 2, marginBottom: 16 }}>AI-POWERED ANALYSIS</div>
          <h1 style={{ color: textMain, fontSize: 28, fontWeight: 500, margin: '0 0 12px', lineHeight: 1.3 }}>International Conflict<br />Intelligence System</h1>
          <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7, margin: '0 0 24px' }}>Generate expert-level diplomatic briefs with party positions, legal precedents, and structured negotiation pathways.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['190+', 'JURISDICTIONS'], ['UN', 'COMPLIANT'], ['ICJ', 'PRECEDENTS']].map(([num, label]) => (
              <div key={label}>
                <div style={{ color: '#c9a84c', fontSize: 20, fontWeight: 500 }}>{num}</div>
                <div style={{ color: textMuted, fontSize: 11, letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>DESCRIBE THE CONFLICT</span>
            <textarea
              value={conflict}
              onChange={e => setConflict(e.target.value)}
              rows={3}
              placeholder="Describe the conflict here..."
              style={{ width: '100%', background: inputBg, border: '1px solid ' + border, borderRadius: 4, padding: '12px 14px', color: textMain, fontSize: 13, boxSizing: 'border-box', resize: 'none' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>REGION</span>
              <select value={region} onChange={e => setRegion(e.target.value)} style={{ width: '100%', background: inputBg, border: '1px solid ' + border, borderRadius: 4, padding: '10px 14px', color: textMain, fontSize: 13 }}>
                <option>Eastern Europe</option>
                <option>Middle East & N. Africa</option>
                <option>Sub-Saharan Africa</option>
                <option>South / East Asia</option>
                <option>Latin America</option>
                <option>Global / Multi-regional</option>
              </select>
            </div>
            <div>
              <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>ANALYSIS TYPE</span>
              <select value={analysisType} onChange={e => setAnalysisType(e.target.value)} style={{ width: '100%', background: inputBg, border: '1px solid ' + border, borderRadius: 4, padding: '10px 14px', color: textMain, fontSize: 13 }}>
                <option>Full Brief</option>
                <option>Party Positions</option>
                <option>Legal Precedents</option>
                <option>Negotiation Roadmap</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{ background: '#c9a84c', color: '#10141a', border: 'none', borderRadius: 4, padding: '11px 24px', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', cursor: 'pointer', width: '100%' }}
          >
            {loading ? 'GENERATING...' : 'GENERATE BRIEF'}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ padding: 32 }}>
          <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid ' + border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.12em' }}>BRIEF OUTPUT</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9a84c', fontSize: 11 }}>
                <div style={{ width: 6, height: 6, background: '#c9a84c', borderRadius: '50%' }} /> AI Generated
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ color: isDark ? '#a0b4c8' : '#2a3a54', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}