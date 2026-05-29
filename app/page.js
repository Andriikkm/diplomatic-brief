'use client';
import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [conflict, setConflict] = useState('');
  const [region, setRegion] = useState('Eastern Europe');
  const [analysisType, setAnalysisType] = useState('Full Brief');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('home');
  const [archive, setArchive] = useState([]);
  const [selected, setSelected] = useState(null);

  const isDark = theme === 'dark';
  const bg = isDark ? '#10141a' : '#f0ede8';
  const cardBg = isDark ? '#161c26' : '#ffffff';
  const border = isDark ? '#1e2a3a' : '#d4c9b0';
  const textMain = isDark ? '#e8dcc8' : '#1a2540';
  const textMuted = '#4a6080';
  const inputBg = isDark ? '#10141a' : '#f7f4ef';

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
      setArchive(prev => [{
        id: Date.now(),
        conflict,
        region,
        analysisType,
        brief: data.brief,
        date: new Date().toLocaleDateString()
      }, ...prev]);
    } catch (err) {
      setResult('Error generating brief. Please try again.');
    }
    setLoading(false);
  };

  const Nav = () => (
    <div style={{ background: '#1a2540', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2a3a60', position: 'sticky', top: 0, zIndex: 100 }}>
      <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <div style={{ width: 28, height: 28, background: '#c9a84c', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10141a', fontWeight: 500, fontSize: 14, flexShrink: 0 }}>D</div>
        <span style={{ color: '#e8dcc8', fontSize: 13, letterSpacing: '0.12em' }}>DIPLOMATIC BRIEF</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span onClick={() => setPage('archive')} style={{ color: page === 'archive' ? '#c9a84c' : '#7a8fad', fontSize: 13, cursor: 'pointer' }}>Archive</span>
        <span onClick={() => setPage('about')} style={{ color: page === 'about' ? '#c9a84c' : '#7a8fad', fontSize: 13, cursor: 'pointer' }}>About</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#7a8fad', fontSize: 11 }}>{isDark ? 'DARK' : 'LIGHT'}</span>
          <div onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ width: 44, height: 24, background: isDark ? '#1e2a3a' : '#d4c9b0', borderRadius: 24, border: '1px solid #2a3a50', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: 18, height: 18, background: '#c9a84c', borderRadius: '50%', position: 'absolute', top: 2, left: isDark ? 2 : 22, transition: 'left 0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  );

  if (page === 'about') return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Nav />
      <div style={{ padding: '16px 24px', borderBottom: '1px solid ' + border }}>
  <span onClick={() => setPage('home')} style={{ color: '#c9a84c', fontSize: 13, cursor: 'pointer', letterSpacing: '0.05em' }}>← Back to Home</span>
</div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'inline-block', border: '1px solid #c9a84c', color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 2, marginBottom: 24 }}>ABOUT</div>
        <h1 style={{ color: textMain, fontSize: 28, fontWeight: 500, margin: '0 0 16px' }}>Diplomatic Brief Generator</h1>
        <p style={{ color: textMuted, fontSize: 15, lineHeight: 1.8, margin: '0 0 32px' }}>An AI-powered tool for generating structured diplomatic briefs on international conflicts. Enter any conflict, select your region and analysis type, and receive an expert-level analysis in seconds.</p>
        <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em', marginBottom: 16 }}>TECHNOLOGY STACK</div>
          {[
            ['Next.js', 'React framework for the web application'],
            ['Claude AI', 'Anthropic AI model for diplomatic analysis'],
            ['Tailwind CSS', 'Utility-first CSS framework'],
            ['Vercel', 'Deployment and hosting platform']
          ].map(([tech, desc]) => (
            <div key={tech} style={{ display: 'flex', gap: 16, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid ' + border }}>
              <div style={{ color: textMain, fontSize: 13, fontWeight: 500, minWidth: 110 }}>{tech}</div>
              <div style={{ color: textMuted, fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, padding: 24 }}>
          <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em', marginBottom: 16 }}>ANALYSIS TYPES</div>
          {[
            ['Full Brief', 'Complete diplomatic analysis covering all aspects'],
            ['Party Positions', 'Detailed breakdown of each party stance'],
            ['Legal Precedents', 'Relevant international law and UN resolutions'],
            ['Negotiation Roadmap', 'Concrete pathways toward resolution']
          ].map(([type, desc]) => (
            <div key={type} style={{ display: 'flex', gap: 16, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid ' + border }}>
              <div style={{ color: textMain, fontSize: 13, fontWeight: 500, minWidth: 160 }}>{type}</div>
              <div style={{ color: textMuted, fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (page === 'archive') return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Nav /> 
      <div style={{ padding: '16px 24px', borderBottom: '1px solid ' + border }}>
  <span onClick={() => setPage('home')} style={{ color: '#c9a84c', fontSize: 13, cursor: 'pointer', letterSpacing: '0.05em' }}>← Back to Home</span>
</div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'inline-block', border: '1px solid #c9a84c', color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 2, marginBottom: 24 }}>ARCHIVE</div>
        <h1 style={{ color: textMain, fontSize: 28, fontWeight: 500, margin: '0 0 8px' }}>Brief Archive</h1>
        <p style={{ color: textMuted, fontSize: 14, margin: '0 0 32px' }}>Briefs generated in this session.</p>
        {archive.length === 0 ? (
          <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, padding: 48, textAlign: 'center' }}>
            <p style={{ color: textMuted, fontSize: 14 }}>No briefs generated yet.</p>
            <button onClick={() => setPage('home')} style={{ background: '#c9a84c', color: '#10141a', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginTop: 16 }}>Generate a Brief</button>
          </div>
        ) : selected ? (
          <div>
            <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: '1px solid ' + border, color: textMuted, borderRadius: 4, padding: '8px 16px', fontSize: 12, cursor: 'pointer', marginBottom: 24 }}>← Back to Archive</button>
            <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid ' + border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.1em' }}>BRIEF OUTPUT</span>
                <span style={{ color: '#c9a84c', fontSize: 11 }}>{selected.date}</span>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ color: isDark ? '#a0b4c8' : '#2a3a54', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{selected.brief}</p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {archive.map(item => (
              <div key={item.id} onClick={() => setSelected(item)} style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, padding: 20, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ color: textMain, fontSize: 14, fontWeight: 500 }}>{item.conflict}</span>
                  <span style={{ color: textMuted, fontSize: 11, flexShrink: 0, marginLeft: 12 }}>{item.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: isDark ? '#1e2a3a' : '#f0ede8', color: '#c9a84c', fontSize: 11, padding: '2px 8px', borderRadius: 10 }}>{item.region}</span>
                  <span style={{ background: isDark ? '#1e2a3a' : '#f0ede8', color: textMuted, fontSize: 11, padding: '2px 8px', borderRadius: 10 }}>{item.analysisType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Nav />
      <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
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
              <textarea value={conflict} onChange={e => setConflict(e.target.value)} rows={3} placeholder="Describe the conflict here..." style={{ width: '100%', background: inputBg, border: '1px solid ' + border, borderRadius: 4, padding: '12px 14px', color: textMain, fontSize: 13, boxSizing: 'border-box', resize: 'none' }} />
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
            <button onClick={handleGenerate} disabled={loading} style={{ background: '#c9a84c', color: '#10141a', border: 'none', borderRadius: 4, padding: '11px 24px', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', cursor: 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'GENERATING...' : 'GENERATE BRIEF'}
            </button>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: 32 }}>
            <div style={{ background: cardBg, border: '1px solid ' + border, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid ' + border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: textMuted, fontSize: 11, letterSpacing: '0.12em' }}>BRIEF OUTPUT</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9a84c', fontSize: 11 }}>
                  <div style={{ width: 6, height: 6, background: '#c9a84c', borderRadius: '50%' }} /> AI Generated
                </div>s
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ color: isDark ? '#a0b4c8' : '#2a3a54', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{result}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}