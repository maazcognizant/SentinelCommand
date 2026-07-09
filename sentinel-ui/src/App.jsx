import React, { useState, useRef, useEffect, useCallback } from 'react';
import MarkdownIt from 'markdown-it';
import './index.css';

const md = new MarkdownIt({ html: false, breaks: true, linkify: true });

// ─── SVG Icons ──────────────────────────────────────────────────────────
const ICONS = {
  shield:     'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  zap:        'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  dollar:     ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  scale:      ['M16 16h6','M2 16h6','M12 4v12','M3 6l9-2 9 2','M5 16a7 7 0 0 0 14 0'],
  users:      ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75','circle: cx=9 cy=7 r=4'],
  phone:      'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  file:       ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  share:      ['M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M16 6l-4-4-4 4', 'M12 2v13'],
  activity:   'M22 12h-4l-3 9L9 3l-3 9H2',
  alert:      ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
  clock:      ['circle: cx=12 cy=12 r=10', 'M12 6v6l4 2'],
  loader:     ['M21 12a9 9 0 1 1-6.219-8.56'],
  send:       ['M22 2L11 13', 'M22 2L15 22 11 13 2 9l20-7z'],
  copy:       ['M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
  download:   ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  chevron:    'M9 18l6-6-6-6',
  checkCirc:  ['circle: cx=12 cy=12 r=10', 'M9 12l2 2 4-4'],
  xCirc:      ['circle: cx=12 cy=12 r=10', 'M15 9l-6 6', 'M9 9l6 6'],
  info:       ['circle: cx=12 cy=12 r=10', 'M12 16v-4', 'M12 8h.01'],
  flag:       ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  sparkle:    ['M12 3l1.09 3.26L16.36 7l-3.27 1.09L12 11.36 10.91 8.09 7.64 7l3.27-1.09L12 3z','M5 12l.55 1.64L7.18 14l-1.63.55L5 16l-.55-1.64L2.82 14l1.63-.55L5 12z','M19 12l.55 1.64L21.18 14l-1.63.55L19 16l-.55-1.64L16.82 14l1.63-.55L19 12z'],
  mic:        ['M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z','M19 10v2a7 7 0 0 1-14 0v-2','M12 19v4','M8 23h8'],
  history:    ['M3 3v5h5','M3.05 13A9 9 0 1 0 6 5.3L3 8','M12 7v5l4 2'],
  grid:       ['M3 3h7v7H3z','M14 3h7v7h-7z','M14 14h7v7h-7z','M3 14h7v7H3z'],
  search:     ['circle: cx=11 cy=11 r=8', 'M21 21l-4.35-4.35']
};

const I = ({ name, size = 16, color = 'currentColor', strokeWidth = 1.75, className, style }) => {
  const d = ICONS[name] || ICONS.alert;
  if (Array.isArray(d)) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
        {d.map((p, i) => {
          if (p.startsWith('circle:')) {
            const parts = p.replace('circle: ', '').split(' ');
            return <circle key={i} cx={parts[0].split('=')[1]} cy={parts[1].split('=')[1]} r={parts[2].split('=')[1]} />;
          }
          return <path key={i} d={p} />;
        })}
      </svg>
    );
  }
  if (d.startsWith('circle:')) {
    const parts = d.replace('circle: ', '').split(' ');
    return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><circle cx={parts[0].split('=')[1]} cy={parts[1].split('=')[1]} r={parts[2].split('=')[1]} /></svg>;
  }
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d={d} /></svg>;
};

// ─── Agent & Dept Registries ──────────────────────────────────────────────
const AGENTS = [
  { key: 'Search_Agent',           label: 'Global Search',         icon: 'search',    color: '#10b981', desc: 'Deduplication & Cross-Reference' },
  { key: 'Chief_of_Staff',         label: 'Chief of Staff',        icon: 'sparkle',   color: '#a78bfa', desc: 'Orchestrator & Decision Maker' },
  { key: 'Cyber_Security_Agent',   label: 'Cyber Security',        icon: 'shield',    color: '#f87171', desc: 'IT Risk & Threat Analysis' },
  { key: 'SAP_SupplyChain_Agent',  label: 'SAP / Operations',      icon: 'activity',  color: '#34d399', desc: 'Procurement & Logistics' },
  { key: 'Finance_Risk_Agent',     label: 'Finance & Risk',        icon: 'dollar',    color: '#fbbf24', desc: 'INR Exposure & Budget Control' },
  { key: 'HR_Safety_Agent',        label: 'HR & Safety',           icon: 'users',     color: '#60a5fa', desc: 'Workforce & Onboarding' },
  { key: 'Legal_Agent',            label: 'Legal Counsel',         icon: 'scale',     color: '#f472b6', desc: 'Contract & Indian Law' },
  { key: 'Regulatory_Agent',       label: 'Regulatory (CERT-In)',  icon: 'file',      color: '#fb923c', desc: 'SEBI, GST & Compliance' },
  { key: 'Customer_Support_Agent', label: 'Customer Support',      icon: 'phone',     color: '#4ade80', desc: 'SLA & Client Relations' },
  { key: 'PR_Comms_Agent',         label: 'PR & Comms',            icon: 'share',     color: '#818cf8', desc: 'Brand & Media Strategy' },
  { key: 'Social_Media_Agent',     label: 'Social Media Monitor',  icon: 'flag',      color: '#22d3ee', desc: 'Sentiment & Digital Risk' },
];

const SECTION_MAP = [
  { key:'cyber',      kw:['cyber security','it security','it infrastructure','crowdstrike'], icon:'shield',   color:'#f87171', label:'Cyber Security' },
  { key:'sap',        kw:['sap','supply chain','operations','procurement'],               icon:'activity', color:'#34d399', label:'SAP / Operations' },
  { key:'finance',    kw:['finance','financial','inr','budget','tax','gst'],              icon:'dollar',   color:'#fbbf24', label:'Finance & Risk' },
  { key:'hr',         kw:['hr &','human resources','onboarding','workforce','talent'],    icon:'users',    color:'#60a5fa', label:'HR & Safety' },
  { key:'legal',      kw:['legal','counsel','liability','contractual','law','court'],     icon:'scale',    color:'#f472b6', label:'Legal & Compliance' },
  { key:'regulatory', kw:['regulatory','cert-in','sebi','gst act','companies act'],       icon:'file',     color:'#fb923c', label:'Regulatory' },
  { key:'support',    kw:['customer support','client services','sla'],                    icon:'phone',    color:'#4ade80', label:'Client Services' },
  { key:'pr',         kw:['pr &','communications','corporate pr','media','press'],        icon:'share',    color:'#818cf8', label:'PR & Comms' },
  { key:'social',     kw:['social media','sentiment','digital reputation'],               icon:'flag',     color:'#22d3ee', label:'Social Media' },
  { key:'summary',    kw:['executive action','strategic executive','briefing'],           icon:'sparkle',  color:'#a78bfa', label:'Executive Summary' },
];

const TEMPLATES = [
  { title: "Ransomware Attack", icon: "shield", color: "#f87171", text: "Our Bangalore campus has been hit by a LockBit ransomware attack. 3 SAP production servers are encrypted. The attackers demand ₹4.2 crore within 48 hours. Initiate full crisis response." },
  { title: "Data Breach (PII)", icon: "file", color: "#fb923c", text: "CSOC detected an unauthorized exfiltration of 47,000 employee PII records from the Pune HR database. CERT-In reporting window is ticking. We need legal, regulatory, and PR response." },
  { title: "Social Media Leak", icon: "flag", color: "#22d3ee", text: "A senior delivery manager posted our Q3 earnings on LinkedIn 72 hours before the BSE disclosure. The post has 800+ likes. Assess SEBI LODR implications and trigger PR containment." },
  { title: "Vendor Payment Dispute", icon: "dollar", color: "#fbbf24", text: "Procurement raised an urgent request for 20 Dell laptops for a Chennai project (₹2,32,332). Vendor demands advance payment, bypassing Net-30 policy. Assess financial risk and compliance." }
];

const STATUS_CFG = {
  idle:       { color:'#9399b2', bg:'rgba(147,153,178,0.12)', label:'Idle',        icon:'clock'   },
  triggered:  { color:'#b45309', bg:'rgba(180,83,9,0.1)',    label:'Triggered',   icon:'zap'     },
  processing: { color:'#1d4ed8', bg:'rgba(29,78,216,0.1)',   label:'Processing…', icon:'loader'  },
  done:       { color:'#047857', bg:'rgba(4,120,87,0.1)',    label:'Done',        icon:'checkCirc'},
  error:      { color:'#b91c1c', bg:'rgba(185,28,28,0.1)',   label:'Error',       icon:'xCirc'   },
};

const LOADING_STATES = [
  'Chief of Staff mobilizing the war room…',
  'Cyber Security scanning threat vectors…',
  'SAP / Operations checking supply chain capacity…',
  'Finance & Risk assessing financial exposure…',
  'HR & Safety reviewing workforce protocols…',
  'Legal Counsel drafting contractual response…',
  'Regulatory mapping compliance liabilities…',
  'Customer Support framing client SLA updates…',
  'PR & Comms drafting media holding statement…',
  'Social Media monitoring digital footprint…',
  'Synthesizing executive briefing...'
];

const Badge = ({ status, size = 'sm' }) => {
  const c = STATUS_CFG[status] || STATUS_CFG.idle;
  return (
    <div className="badge" style={{ background: c.bg, color: c.color, fontSize: size==='sm'?'0.67rem':'0.75rem', padding: size==='sm'?'2px 9px':'4px 12px' }}>
      {status === 'processing' ? (
        <span style={{ animation:'spin 1s linear infinite', display:'inline-flex' }}><I name="loader" size={size==='sm'?10:12} /></span>
      ) : <I name={c.icon} size={size==='sm'?10:12} />}
      {c.label}
    </div>
  );
};

// ─── Component: Agent Pipeline Card ───────────────────────────────────────
const AgentPipelineCard = ({ agent, status, reason, timestamp, animDelay, responseTime }) => {
  const aInfo = AGENTS.find(a => a.key === agent);
  if (!aInfo) return null;
  return (
    <div style={{
      background: `rgba(255,255,255,0.8)`,
      border: `1px solid ${aInfo.color}25`,
      borderLeft: `3px solid ${aInfo.color}`,
      borderRadius: 10,
      padding: '0.625rem 0.875rem',
      animation: `slideInRight 0.35s ease ${animDelay}s both`,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 2px 10px rgba(79,70,229,0.07)`,
      transition: 'all 0.5s ease',
      flexShrink: 0,
    }}>
      <div style={{ position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(circle at 0% 50%, ${aInfo.color}0a, transparent 70%)`, pointerEvents:'none' }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6, position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:24, height:24, borderRadius:6, background:`${aInfo.color}15`, color:aInfo.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <I name={aInfo.icon} size={12} />
          </div>
          <div>
            <div style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--text-primary)' }}>{aInfo.label}</div>
            <div style={{ fontSize:'0.6rem', color:'var(--text-muted)' }}>{aInfo.desc}</div>
          </div>
        </div>
        <Badge status={status} />
      </div>
      <div style={{ fontSize:'0.7rem', color:'var(--text-secondary)', lineHeight:1.4, position:'relative', zIndex:1 }}>
        {reason}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }}>
        <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', fontFamily:"'JetBrains Mono', monospace" }}>
          {timestamp}
        </div>
        {responseTime && status === 'done' && (
          <div style={{ fontSize:'0.6rem', color:aInfo.color, fontWeight:600 }}>
            {responseTime}s
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Component: Department Card ──────────────────────────────────────────
const DeptCard = ({ title, content, onCopy }) => {
  const match = SECTION_MAP.find(s => s.kw.some(k => title.toLowerCase().includes(k))) || { icon:'file', color:'#9399b2' };
  
  // Try to parse an urgency score or risk level out of the content
  const hasHighRisk = content.toLowerCase().includes('high risk') || content.toLowerCase().includes('critical');
  const hasMedRisk = content.toLowerCase().includes('medium risk') || content.toLowerCase().includes('moderate');
  
  return (
    <div className="dept-card">
      <div className="dept-card-accent" style={{ background: match.color }} />
      <button className="copy-btn" onClick={() => onCopy(title, content)} title="Copy Section">
        <I name="copy" size={14} color="var(--accent-blue)" />
      </button>
      <div className="dept-card-header">
        <div className="dept-icon-wrap" style={{ background: `${match.color}15`, color: match.color }}>
          <I name={match.icon} size={16} />
        </div>
        <div className="dept-card-title">{title.replace(/###/g,'').trim()}</div>
      </div>
      <div className="dept-card-body" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      
      {/* Smart Feature: Auto Priority Bar */}
      {(hasHighRisk || hasMedRisk) && (
        <div style={{ height: 4, width: '100%', background: hasHighRisk ? '#f87171' : '#fbbf24', position: 'absolute', bottom: 0 }} title="Auto-detected severity" />
      )}
    </div>
  );
};

// ─── Component: ServiceNow Card ───────────────────────────────────────────
const ServiceNowCard = ({ incNumber }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden', margin: '0.5rem 0', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
    <div style={{ background: '#0f203c', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold' }}>
        <div style={{ background: '#81b5a1', color: '#0f203c', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem', letterSpacing: 0.5 }}>ServiceNow</div>
        Incident Record
      </div>
      <div style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: 1 }}>{incNumber}</div>
    </div>
    <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', color: '#334155' }}>
      <div><strong style={{ color: '#0f203c' }}>State:</strong> New</div>
      <div><strong style={{ color: '#0f203c' }}>Priority:</strong> <span style={{ color: '#dc2626', fontWeight: 700 }}>1 - Critical</span></div>
      <div><strong style={{ color: '#0f203c' }}>Caller:</strong> Sentinel AI Orchestrator</div>
      <div><strong style={{ color: '#0f203c' }}>Assignment Group:</strong> War Room Alpha</div>
      <div style={{ gridColumn: '1 / -1', marginTop: 8, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}><strong style={{ color: '#0f203c' }}>Short Description:</strong> Automated Crisis Escalation via Sentinel Command</div>
    </div>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Features State
  const [showSplash, setShowSplash] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  
  const [agentStates, setAgentStates] = useState({});
  const wsRef = useRef(null);
  const wsLogsRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Load history on mount & hide splash
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2500);
    const saved = localStorage.getItem('sentinel_sessions');
    if (saved) setSessions(JSON.parse(saved));
  }, []);

  const startNewSession = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([{ role: 'agent', content: 'Welcome to Sentinel Command. The Chief of Staff and the 9-Agent Cognitive Pipeline are ready for crisis deployment. What is the situation?' }]);
    setAgentStates({});
  };

  useEffect(() => {
    if (!currentSessionId) startNewSession();
  }, [currentSessionId]);

  // Auto-save session
  useEffect(() => {
    if (messages.length > 1 && currentSessionId) {
      const title = messages.find(m => m.role === 'user')?.content.substring(0, 35) + '...' || 'New Crisis';
      // Sanitize messages so reloading doesn't result in infinite spinners
      const sanitizedMessages = messages.map(m => m._streaming ? { ...m, _streaming: false } : m);
      
      setSessions(prev => {
        const existing = prev.filter(s => s.id !== currentSessionId);
        const updated = [{ id: currentSessionId, title, messages: sanitizedMessages, date: new Date().toLocaleString() }, ...existing].slice(0, 20);
        localStorage.setItem('sentinel_sessions', JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, currentSessionId]);

  // Toast Manager
  const addToast = (title, icon, color) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, icon, color }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exit: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, 4000);
  };

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, agentStates]);

  const handleInput = e => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) { ta.style.height='auto'; ta.style.height=`${Math.min(ta.scrollHeight,180)}px`; }
  };

  // 🎙️ Voice Input (Web Speech API)
  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      addToast('Voice input not supported in this browser', 'alert', '#f87171');
      return;
    }
    if (isListening) return; // Browser auto-stops
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
      }
      if (final) {
        setInput(prev => (prev + ' ' + final).trim());
        if (textareaRef.current) { textareaRef.current.style.height='auto'; }
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const parseInternal = useCallback((raw) => {
    let text = '', agentKey = null;
    try {
      const p = JSON.parse(raw);
      const m = p?.message || p;
      text = m?.text || m?.content || (typeof m==='string' ? m : '');
      const ot = m?.otrace;
      if (Array.isArray(ot) && ot.length) agentKey = ot[ot.length-1];
    } catch { text = raw; }
    if (!text || text.length < 3) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const ms = now.getTime();
    
    const invokeMatch = text.match(/Invoking:\s*`?([A-Za-z_]+)`?/);
    const errorMatch  = text.match(/Error from [^.]+\.([A-Za-z_]+)/i);
    const resultMatch = text.match(/result from [^.]+\.([A-Za-z_]+)/i);

    if (invokeMatch) {
      const name = invokeMatch[1];
      setAgentStates(prev => ({ ...prev, [name]: { status:'processing', reason:'Delegated by Chief of Staff', timestamp:`Triggered at ${timeStr}`, startTime: ms } }));
      setAgentStates(prev => ({ ...prev, Chief_of_Staff: { status:'processing', reason:'Orchestrating parallel delegation', timestamp:`Active at ${timeStr}`, startTime: prev.Chief_of_Staff?.startTime || ms } }));
    } else if (errorMatch) {
      const name = errorMatch[1];
      const snippet = text.match(/ValueError:\s*(.+)/)?.[1] || 'Agent encountered an error';
      setAgentStates(prev => {
        const start = prev[name]?.startTime || ms;
        return { ...prev, [name]: { status:'error', reason: snippet.slice(0,100), timestamp:`Failed at ${timeStr}`, responseTime: ((ms - start)/1000).toFixed(1) } };
      });
      const aInfo = AGENTS.find(a=>a.key===name);
      if(aInfo) addToast(`${aInfo.label} failed`, 'alert', '#f87171');
    } else if (resultMatch) {
      const name = resultMatch[1];
      setAgentStates(prev => {
        const start = prev[name]?.startTime || ms;
        const rTime = ((ms - start)/1000).toFixed(1);
        return { ...prev, [name]: { status:'done', reason:'Analysis complete — report submitted to Chief of Staff', timestamp:`Completed at ${timeStr}`, responseTime: rTime } };
      });
      const aInfo = AGENTS.find(a=>a.key===name);
      if(aInfo) addToast(`${aInfo.label} complete`, 'checkCirc', '#059669');
    }
  }, []);

  const handleSubmit = async (overrideInput = null) => {
    const finalInput = overrideInput || input;
    if (!finalInput.trim() || isLoading) return;

    if (finalInput.toLowerCase().includes('create') && (finalInput.toLowerCase().includes('servicenow') || finalInput.toLowerCase().includes('service now') || finalInput.toLowerCase().includes('ticket'))) {
      // Natural language interception for ServiceNow ticket creation
      setInput('');
      if (textareaRef.current) { textareaRef.current.style.height='auto'; }
      handleCreateTicket(finalInput);
      return;
    }

    setInput('');
    setShowTemplates(false);
    if (textareaRef.current) { textareaRef.current.style.height='auto'; }
    setMessages(prev => [...prev, { role:'user', content:finalInput }]);
    setIsLoading(true);

    // Reset all agent states
    const init = {};
    const nowTime = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
    AGENTS.forEach(a => { init[a.key] = { status:'idle' }; });
    init['Chief_of_Staff'] = { status:'triggered', reason:'Received crisis briefing — activating war room', timestamp:`Triggered at ${nowTime} IST`, startTime: Date.now() };
    setAgentStates(init);

    const agentName = 'generated/sentinel_crisis_command';
    const sessionId = currentSessionId || `session_${Date.now()}`;
    const NS_HOST   = 'localhost:4173';

    wsRef.current?.close();
    wsLogsRef.current?.close();

    const wsLogs = new WebSocket(`ws://${NS_HOST}/api/v1/ws/internalchat/${agentName}/${sessionId}`);
    wsLogsRef.current = wsLogs;
    wsLogs.onmessage = ev => parseInternal(ev.data);

    const ws = new WebSocket(`ws://${NS_HOST}/api/v1/ws/chat/${agentName}/${sessionId}`);
    wsRef.current = ws;
    let full = '';

    ws.onopen = () => {
      // Inject real current date/time so the AI always uses the correct date
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
      const timeStr = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', timeZoneName:'short' });
      
      // Build Global Incident Database
      const dbEntries = sessions.map(s => {
        const ticketMatch = JSON.stringify(s.messages).match(/INC\d+/g);
        const tickets = ticketMatch ? [...new Set(ticketMatch)].join(', ') : 'None';
        const st = getSessionStatus(s.messages);
        return `- Session ID: ${s.id} | Date: ${s.date} | Status: ${st.label} | ServiceNow Tickets: ${tickets} | Topic: ${s.title}`;
      }).join('\n');

      // Build Memory Context
      const pastChat = messages.filter(m => m.role !== 'agent' || !m.content.includes('Welcome to Sentinel Command')).map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
      
      const contextPrefix = `[SYSTEM CONTEXT — use this in your response: Current Date: ${dateStr} | Current Time: ${timeStr} IST | Location: India]\n\n[GLOBAL INCIDENT DATABASE (Across all sessions)]\n${dbEntries || 'No past incidents logged.'}\n\n[PREVIOUS CHAT HISTORY (For Context & Memory)]\n${pastChat || 'None'}\n\n[NEW USER INPUT]\n`;
      
      ws.send(JSON.stringify({ message: contextPrefix + finalInput, sly_data:{}, chat_context:{} }));
    };

    ws.onmessage = ev => {
      try {
        const d = JSON.parse(ev.data);
        const m = d?.message;
        if (m && typeof m==='object' && m.text)   full = m.text;
        else if (m && typeof m==='string')         full += m;
        else if (d?.response)                      full += d.response;
      } catch { 
        full += ev.data; 
      }
      
      if (full.trim()) {
        setMessages(prev => {
          const filtered = prev.filter(x => !x._streaming);
          return [...filtered, { role:'agent', content:full, _streaming:true }];
        });
      }
    };
    ws.onclose = () => {
      if (full.trim()) {
        setMessages(prev => {
          const filtered = prev.filter(m => !m._streaming);
          return [...filtered, { role: 'agent', content: full }];
        });
        
        const doneTime = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
        setAgentStates(prev => {
          const start = prev.Chief_of_Staff?.startTime || Date.now();
          return { ...prev, Chief_of_Staff:{ status:'done', reason:'Executive Action Summary compiled and delivered', timestamp:`Completed at ${doneTime} IST`, responseTime: ((Date.now()-start)/1000).toFixed(1) } };
        });
        
        // Staggered reset to idle
        setTimeout(() => {
          AGENTS.forEach((a, i) => {
            setTimeout(() => {
              setAgentStates(prev => (!prev[a.key] || prev[a.key].status === 'idle') ? prev : { ...prev, [a.key]: { status:'idle' } });
            }, i * 180);
          });
        }, 4000);
      }
      else {
        setMessages(prev => [...prev.filter(x=>!x._streaming), { role:'agent', content:'⚠️ No response received. Ensure the Neuro SAN backend (`ns run`) is active.' }]);
      }
      setIsLoading(false);
    };
    ws.onerror = () => { setMessages(prev=>[...prev,{role:'agent',content:'⚠️ WebSocket connection failed. Ensure port 4173 (nsflow) is running.'}]); setIsLoading(false); };
  };

  const handleKeyDown = e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };

  // ─── ServiceNow Integration ───────────────────────────────────────────────
  const handleCreateTicket = (userString) => {
    if (isLoading) return;
    setIsLoading(true);
    addToast('Connecting to ServiceNow API...', 'loader', '#0284c7');
    
    // Simulate API delay
    setTimeout(() => {
      const incNumber = `INC${Math.floor(1000000 + Math.random() * 9000000)}`;
      setMessages(prev => [
        ...prev, 
        { role: 'user', content: typeof userString === 'string' ? userString : 'Action: CREATE ServiceNow Ticket for this incident.' },
        { role: 'agent', content: `[SERVICENOW_TICKET: ${incNumber}]` }
      ]);
      setIsLoading(false);
      addToast(`Ticket ${incNumber} Created Successfully`, 'checkCirc', '#059669');
    }, 1800);
  };

  // ─── Rendering Helpers ────────────────────────────────────────────────────
  const getSessionStatus = (msgs) => {
    const lastAgentMsg = [...msgs].reverse().find(m => m.role === 'agent');
    if (!lastAgentMsg) return { label: 'PROCESSING', color: '#9399b2' };
    const content = lastAgentMsg.content.toLowerCase();
    if (content.includes('reject') || content.includes('denied')) return { label: 'REJECTED', color: 'var(--accent-red)' };
    if (content.includes('escalat') || content.includes('board') || content.includes('critical')) return { label: 'ESCALATED', color: 'var(--accent-amber)' };
    if (content.includes('approv') || content.includes('proceed') || content.includes('contain')) return { label: 'APPROVED', color: 'var(--accent-green)' };
    return { label: 'PENDING', color: 'var(--accent-blue)' };
  };

  const parseResponse = (content) => {
    if (!content) return null;
    const parts = content.split(/(?=### )/g);
    let intro = '';
    const depts = [];
    let whyReasons = [];
    let nextSteps = [];

    parts.forEach(part => {
      if (part.startsWith('###')) {
        const lines = part.split('\n');
        const title = lines[0].replace('###', '').trim();
        const body = lines.slice(1).join('\n').trim();
        if (title.toLowerCase().includes('why')) { whyReasons = body.split('\n').filter(l=>l.trim().length>5).map(l=>l.replace(/^[-*]\s*/,'').trim()); }
        else if (title.toLowerCase().includes('next step') || title.toLowerCase().includes('action')) { nextSteps = body.split('\n').filter(l=>l.trim().length>5).map(l=>l.replace(/^[-*0-9.]+\s*/,'').trim()); }
        else if (title && body) { depts.push({ title, content: body }); }
      } else if (!intro) { intro = part.trim(); }
    });

    if (depts.length === 0) return <div className="raw-markdown" dangerouslySetInnerHTML={{ __html: md.render(content) }} />;

    // Detect Severity for Meter
    const isCritical = content.toLowerCase().includes('critical') || content.toLowerCase().includes('high risk') || content.toLowerCase().includes('breach');
    const isMedium = content.toLowerCase().includes('medium') || content.toLowerCase().includes('moderate');
    const sevColor = isCritical ? '#dc2626' : (isMedium ? '#d97706' : '#059669');
    const sevLabel = isCritical ? 'CRITICAL' : (isMedium ? 'MEDIUM' : 'LOW');

    const handleCopy = (t, c) => {
      navigator.clipboard.writeText(`*${t}*\n${c}`);
      addToast('Section copied', 'copy', '#4f46e5');
    };

    return (
      <div className="parsed-response">
        {/* Severity Meter Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.9)', border:'1px solid var(--border)', borderRadius:12, padding:'1rem 1.25rem', marginBottom:'1.5rem', boxShadow:'0 2px 8px rgba(79,70,229,0.06)' }}>
          <div>
            <div style={{ fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:1.5, color:'var(--text-muted)', fontWeight:600, marginBottom:4 }}>Crisis Severity Index</div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:'1.1rem', fontWeight:800, color: sevColor }}>{sevLabel}</span>
              <div className="severity-meter">
                <div className={`severity-segment ${!isCritical && !isMedium ? 'active' : ''}`} style={{ background: sevColor==='#059669' ? sevColor : '' }} />
                <div className={`severity-segment ${isMedium ? 'active' : ''}`} style={{ background: isMedium ? sevColor : '' }} />
                <div className={`severity-segment ${isCritical ? 'active' : ''}`} style={{ background: isCritical ? sevColor : '' }} />
              </div>
            </div>
          </div>
          <button onClick={() => window.print()} style={{ display:'flex', alignItems:'center', gap:6, background:'linear-gradient(135deg, #4f46e5, #0891b2)', color:'white', border:'none', padding:'8px 16px', borderRadius:8, fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>
            <I name="download" size={14} /> Export Report
          </button>
        </div>

        {intro && <div className="raw-markdown" style={{ marginBottom:'1.5rem', fontSize:'0.95rem' }} dangerouslySetInnerHTML={{ __html: md.render(intro) }} />}
        
        <div className="response-cards-grid">
          {depts.map((d, i) => <DeptCard key={i} title={d.title} content={d.content} onCopy={handleCopy} />)}
        </div>

        {(() => {
          let conclusionStatus = 'AWAITING EXECUTIVE DECISION';
          let conclusionColor = 'var(--accent-blue)';
          let conclusionIcon = 'shield';

          if (content.toLowerCase().includes('reject') || content.toLowerCase().includes('denied')) {
            conclusionStatus = 'REJECTED'; conclusionColor = 'var(--accent-red)'; conclusionIcon = 'xCirc';
          } else if (content.toLowerCase().includes('escalat') || content.toLowerCase().includes('board') || content.toLowerCase().includes('critical')) {
            conclusionStatus = 'ESCALATED'; conclusionColor = 'var(--accent-amber)'; conclusionIcon = 'alert';
          } else if (content.toLowerCase().includes('approv') || content.toLowerCase().includes('proceed') || content.toLowerCase().includes('contain')) {
            conclusionStatus = 'APPROVED'; conclusionColor = 'var(--accent-green)'; conclusionIcon = 'checkCirc';
          }

          return (
            <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.95)', border: `1px solid ${conclusionColor}40`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ background: `${conclusionColor}10`, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${conclusionColor}20`, flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: conclusionColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <I name={conclusionIcon} size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', fontWeight: 600 }}>Final Executive Status</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: conclusionColor, marginTop: 2 }}>{conclusionStatus}</div>
                  </div>
                </div>
                
                  {conclusionStatus === 'AWAITING EXECUTIVE DECISION' ? (
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleSubmit("Action: APPROVE this decision and execute containment.")} style={{ background: 'var(--accent-green)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                        <I name="checkCirc" size={16} /> Approve
                      </button>
                      <button onClick={() => handleSubmit("Action: ESCALATE this issue immediately to the Board of Directors.")} style={{ background: 'var(--accent-amber)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                        <I name="alert" size={16} /> Escalate
                      </button>
                      <button onClick={() => handleSubmit("Action: REJECT this request. Halting operations.")} style={{ background: 'var(--accent-red)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                        <I name="xCirc" size={16} /> Reject
                      </button>
                      <button onClick={handleCreateTicket} style={{ background: '#0f203c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', marginLeft: 'auto' }}>
                        <I name="grid" size={16} /> Create ServiceNow Ticket
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <I name="checkCirc" size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> 
                      ACTION RECORDED
                    </div>
                  )}
                </div>
              
              {(whyReasons.length > 0 || nextSteps.length > 0) && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', padding:'1.5rem', background: 'rgba(255,255,255,0.6)' }}>
                  {whyReasons.length > 0 && (
                    <div style={{ background:'rgba(255,255,255,0.85)',border:'1px solid rgba(79,70,229,0.12)',borderRadius:10,padding:'1rem' }}>
                      <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:1,marginBottom:'0.8rem',display:'flex',alignItems:'center',gap:5,fontWeight:600 }}>
                        <I name="info" size={12} color="var(--accent-blue)" /> Why this decision?
                      </div>
                      {whyReasons.slice(0,4).map((r,i) => (
                        <div key={i} style={{ display:'flex',gap:8,marginBottom:8,alignItems:'flex-start' }}>
                          <div style={{ width:5,height:5,borderRadius:'50%',background:'var(--accent-blue)',marginTop:6,flexShrink:0 }} />
                          <p style={{ fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.5 }} dangerouslySetInnerHTML={{ __html: md.renderInline(r) }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {nextSteps.length > 0 && (
                    <div style={{ background:'rgba(255,255,255,0.85)',border:'1px solid rgba(79,70,229,0.12)',borderRadius:10,padding:'1rem' }}>
                      <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:1,marginBottom:'0.8rem',display:'flex',alignItems:'center',gap:5,fontWeight:600 }}>
                        <I name="chevron" size={12} color="var(--accent-blue)" /> Next Steps
                      </div>
                      {nextSteps.map((s,i) => (
                        <div key={i} style={{ display:'flex',gap:8,marginBottom:8,alignItems:'flex-start' }}>
                          <span style={{ fontSize:'0.7rem',fontWeight:700,color:'var(--accent-blue)',background:'rgba(79,70,229,0.12)',borderRadius:4,padding:'2px 6px',flexShrink:0,marginTop:1 }}>{i+1}</span>
                          <p style={{ fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.5 }} dangerouslySetInnerHTML={{ __html: md.renderInline(s) }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    );
  };

  const activeAgents = AGENTS.filter(a => agentStates[a.key]?.status && agentStates[a.key]?.status !== 'idle');

  return (
    <div className="layout-container">
      {/* ── Splash Screen ── */}
      <div className={`splash-screen ${!showSplash ? 'fade-out' : ''}`}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="splash-ring"></div>
          <div className="splash-ring-2"></div>
          <img src="/logo.png" alt="Sentinel Logo" className="splash-logo" />
        </div>
        <div className="splash-title">Sentinel Command</div>
        <div className="splash-subtitle">Cognitive Pipeline Initializing</div>
        <div className="splash-bar-container">
          <div className="splash-bar" style={{ width: showSplash ? '100%' : '0%' }}></div>
        </div>
      </div>

      {/* ── Toasts ── */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.exit ? 'exit' : ''}`}>
            <div className="toast-icon" style={{ background: `${t.color}15`, color: t.color }}>
              <I name={t.icon} size={14} />
            </div>
            <div>{t.title}</div>
            <div className="toast-time">{new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}</div>
          </div>
        ))}
      </div>

      {/* ── Templates Modal ── */}
      {showTemplates && (
        <div className="modal-overlay" onClick={() => setShowTemplates(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h2 style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--text-primary)' }}>Crisis Scenario Library</h2>
              <button onClick={() => setShowTemplates(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><I name="x" size={20} /></button>
            </div>
            {TEMPLATES.map((t, i) => (
              <div key={i} className="template-card" onClick={() => { setInput(t.text); setShowTemplates(false); }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${t.color}15`, color:t.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <I name={t.icon} size={18} />
                </div>
                <div>
                  <div style={{ fontSize:'0.95rem', fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{t.title}</div>
                  <div style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.4 }}>{t.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Old History Drawer removed in favor of Sidebar History */}

      {/* ─ Sidebar ──────────────────────────────────────────────────── */}
      <div className="sidebar glass-panel no-scrollbar">
        <div className="brand" style={{ cursor:'pointer' }} title="Sentinel Command">
          <img src="/logo.png" alt="Logo" style={{ width:26, height:26, filter:'drop-shadow(0 0 6px rgba(79,70,229,0.4))' }} />
          <h1>Sentinel<br/>Command</h1>
        </div>

        <button onClick={startNewSession} style={{ background:'linear-gradient(135deg, #4f46e5, #0891b2)', color:'white', border:'none', padding:'10px', borderRadius:8, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:'1rem', transition:'all 0.2s', boxShadow:'0 4px 12px rgba(79,70,229,0.3)' }}>
          <I name="sparkle" size={16} /> New Crisis Log
        </button>

        <div className="section-label" style={{ marginTop:'0.5rem' }}>Recent Crisis Logs</div>
        <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: 4 }} className="no-scrollbar">
          {sessions.map(s => {
            const status = getSessionStatus(s.messages);
            return (
              <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); setAgentStates({}); }} className={`nav-item ${currentSessionId === s.id ? 'active' : ''}`} style={{ cursor:'pointer', padding:'0.6rem', fontSize:'0.75rem', alignItems: 'flex-start' }} title={s.title}>
                <I name="history" size={14} color={currentSessionId === s.id ? "var(--accent-blue)" : "var(--text-muted)"} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflow: 'hidden' }}>
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight: currentSessionId === s.id ? 700 : 500, color: currentSessionId === s.id ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{s.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: status.color, boxShadow: `0 0 4px ${status.color}` }} />
                    <span style={{ fontWeight: 600, color: status.color }}>{status.label}</span>
                    <span>•</span>
                    <span>{s.date.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {sessions.length === 0 && <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', padding:'0.5rem', textAlign:'center', background:'rgba(0,0,0,0.02)', borderRadius:6 }}>No past logs</div>}
        </div>

        <div className="section-label">10-Agent Roster</div>
        {AGENTS.map(({ key, label, icon, color }) => {
          const st = agentStates[key];
          const isProcessing = st?.status && st.status !== 'idle' && st.status !== 'done' && st.status !== 'error';
          return (
            <div key={key} className="nav-item">
              <I name={icon} size={13} color={isProcessing ? color : 'var(--text-muted)'} />
              <span style={{ color: isProcessing ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</span>
              {isProcessing && (
                <div style={{ position:'absolute', right:10 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:color, boxShadow:`0 0 6px ${color}`, animation:'blink 1s infinite' }} />
                </div>
              )}
            </div>
          );
        })}
        
        <div style={{ marginTop:'auto', padding:'1rem 0 0' }}>
          <button onClick={() => setShowTemplates(true)} style={{ width:'100%', padding:'0.6rem', borderRadius:8, background:'rgba(79,70,229,0.08)', color:'var(--accent-blue)', border:'1px solid rgba(79,70,229,0.2)', fontSize:'0.75rem', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
            <I name="grid" size={14} /> View Templates
          </button>
        </div>
      </div>

      {/* ─ Main Workspace ─────────────────────────────────────────────── */}
      <div className="main-content glass-panel" style={{ position:'relative', zIndex:10 }}>
        {/* Header */}
        <div className="header">
          <div>
            <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--text-primary)', letterSpacing:'0.5px' }}>War Room Alpha</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#34d399',boxShadow:'0 0 6px #34d399',animation:'blink 2s infinite' }} />
              Secure connection established via nsflow
            </div>
          </div>
        </div>

        <div className="chat-container">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="avatar">
                {m.role === 'user' ? 'U' : <I name="sparkle" size={18} />}
              </div>
              <div className="message-content">
                {m.role === 'user' ? m.content : 
                  (m.content && m.content.startsWith('[SERVICENOW_TICKET:') ? 
                    <ServiceNowCard incNumber={m.content.match(/INC\d+/)?.[0] || 'INC0000000'} /> 
                  : parseResponse(m.content))}
                {m._streaming && (
                  <div className="typing-indicator" style={{ marginTop: 12 }}>
                    <span/><span/><span/>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && !messages[messages.length - 1]?._streaming && (
            <div className="message agent">
              <div className="avatar"><I name="sparkle" size={18} /></div>
              <div className="message-content">
                <div style={{ fontSize:'0.85rem', color:'var(--accent-blue)', fontWeight:600, display:'flex', alignItems:'center', gap:8, background:'rgba(79,70,229,0.08)', border:'1px solid rgba(79,70,229,0.2)', padding:'10px 16px', borderRadius:12 }}>
                  <I name="loader" size={14} style={{ animation:'spin 1.5s linear infinite' }} />
                  {LOADING_STATES[Math.floor((Date.now()/2000) % LOADING_STATES.length)]}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="auto-expand no-scrollbar"
              placeholder="Detail the crisis parameters for executive review..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button 
              className="send-btn" 
              onClick={toggleVoice} 
              style={{ background: isListening ? '#f87171' : 'transparent', color: isListening ? 'white' : 'var(--text-muted)' }}
              title="Voice Input (Dictate Crisis)"
            >
              <I name="mic" size={18} style={isListening ? { animation: 'blink 1.5s infinite' } : {}} />
            </button>
            <button className="send-btn" onClick={() => handleSubmit()} disabled={!input.trim() || isLoading}>
              <I name="send" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ─ Agent Pipeline Board (Right) ───────────────────────────────── */}
      <div className="glass-panel" style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Agent Pipeline Board</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>Live tracing of Neuro SAN delegation</div>
        </div>
        
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeAgents.length === 0 ? (
            <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.6 }}>
              <I name="activity" size={32} color="var(--text-muted)" style={{ marginBottom:12 }} />
              <div style={{ fontSize:'0.8rem', color:'var(--text-secondary)', fontWeight:600 }}>Pipeline Idle</div>
              <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', textAlign:'center', marginTop:4 }}>Awaiting crisis input to trigger parallel execution.</div>
            </div>
          ) : (
            AGENTS.map((a, i) => {
              const st = agentStates[a.key];
              if (!st || st.status === 'idle') return null;
              return (
                <AgentPipelineCard
                  key={a.key}
                  agent={a.key}
                  status={st.status}
                  reason={st.reason}
                  timestamp={st.timestamp}
                  animDelay={i * 0.06}
                  responseTime={st.responseTime}
                />
              );
            })
          )}

          {activeAgents.length > 0 && (
            <div style={{ marginTop:'0.75rem', padding:'0.625rem 0.75rem', background:'rgba(255,255,255,0.85)', borderRadius:8, border:'1px solid rgba(79,70,229,0.1)', boxShadow:'0 1px 4px rgba(79,70,229,0.06)' }}>
              <div style={{ fontSize:'0.64rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:'0.5rem' }}>Pipeline Legend</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {[['triggered','#b45309','Triggered'],['processing','#1d4ed8','Processing'],['done','#047857','Done'],['error','#b91c1c','Error']].map(([s,c,l]) => (
                  <div key={s} style={{ display:'flex', alignItems:'center', gap:4, fontSize:'0.67rem', color:'var(--text-muted)' }}>
                    <div style={{ width:6,height:6,borderRadius:'50%',background:c,boxShadow:`0 0 4px ${c}` }} />{l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
