'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Target,
  Heading1,
  BookOpen,
  Tag,
  Link2,
  Image as ImageIcon,
} from 'lucide-react';
import { computeSeoScore, type SeoScoreInput, type SeoCheck, type CheckCategory } from '@/lib/seoScore';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props extends SeoScoreInput {}

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: { id: CheckCategory; label: string; icon: React.ElementType }[] = [
  { id: 'keyword',     label: 'Keyword',     icon: Target    },
  { id: 'headings',    label: 'Structure',   icon: Heading1  },
  { id: 'readability', label: 'Readability', icon: BookOpen  },
  { id: 'meta',        label: 'Meta',        icon: Tag       },
  { id: 'links',       label: 'Links',       icon: Link2     },
  { id: 'images',      label: 'Images',      icon: ImageIcon },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: SeoCheck['status'] }) {
  if (status === 'good') return <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />;
  if (status === 'ok')   return <AlertCircle  size={13} className="shrink-0 text-amber-500"   />;
  return                        <XCircle      size={13} className="shrink-0 text-red-500"     />;
}

function gradeColor(grade: 'good' | 'ok' | 'bad') {
  if (grade === 'good') return { ring: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', label: 'SEO Ready' };
  if (grade === 'ok')   return { ring: 'text-amber-500',   bg: 'bg-amber-50',   badge: 'bg-amber-100 text-amber-700',     label: 'Needs Work'  };
  return                       { ring: 'text-red-500',     bg: 'bg-red-50',     badge: 'bg-red-100 text-red-700',         label: 'Poor SEO'    };
}

function ScoreArc({ score, grade }: { score: number; grade: 'good' | 'ok' | 'bad' }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = grade === 'good' ? '#10b981' : grade === 'ok' ? '#f59e0b' : '#ef4444';
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SeoScorePanel(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const [openCats, setOpenCats] = useState<Set<CheckCategory>>(new Set(['keyword', 'meta']));

  const result = useMemo(() => computeSeoScore(props), [
    props.content,
    props.title,
    props.slug,
    props.metaTitle,
    props.metaDescription,
    props.focusKeyword,
    props.coverImageAlt,
    props.imageAlt,
    props.description,
  ]);

  const { score, grade, checks } = result;
  const colors = gradeColor(grade);

  const toggleCat = (cat: CheckCategory) =>
    setOpenCats(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });

  const badCount  = checks.filter(c => c.status === 'bad').length;
  const okCount   = checks.filter(c => c.status === 'ok').length;
  const goodCount = checks.filter(c => c.status === 'good').length;

  return (
    <div className={`rounded-xl border overflow-hidden ${colors.bg} border-slate-200`}>
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-black/[0.02] transition-colors"
      >
        {/* Score gauge */}
        <div className="relative shrink-0 w-[60px] h-[60px]">
          <svg width="60" height="60" viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r="36" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="36" fill="none"
              stroke={grade === 'good' ? '#10b981' : grade === 'ok' ? '#f59e0b' : '#ef4444'}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={2 * Math.PI * 36 * (1 - score / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center rotate-0">
            <span className={`text-sm font-bold ${colors.ring}`}>{score}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-slate-900">SEO Analysis</p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
              {colors.label}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <CheckCircle2 size={10} />{goodCount} good
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-600 font-medium">
              <AlertCircle size={10} />{okCount} ok
            </span>
            <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
              <XCircle size={10} />{badCount} fix
            </span>
          </div>
        </div>

        {expanded
          ? <ChevronDown size={14} className="text-slate-400 shrink-0" />
          : <ChevronRight size={14} className="text-slate-400 shrink-0" />}
      </button>

      {/* Detail panel */}
      {expanded && (
        <div className="border-t border-slate-200 bg-white">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const catChecks = checks.filter(c => c.category === id);
            if (catChecks.length === 0) return null;
            const isOpen = openCats.has(id);
            const catBad  = catChecks.filter(c => c.status === 'bad').length;
            const catGood = catChecks.filter(c => c.status === 'good').length;

            return (
              <div key={id} className="border-b border-slate-100 last:border-0">
                <button
                  type="button"
                  onClick={() => toggleCat(id)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-slate-50 transition-colors"
                >
                  <Icon size={13} className="text-slate-400 shrink-0" />
                  <span className="flex-1 text-xs font-semibold text-slate-700">{label}</span>
                  <div className="flex items-center gap-1.5">
                    {catBad > 0 && (
                      <span className="text-[10px] font-semibold text-red-500 bg-red-50 rounded-full px-1.5 py-0.5">
                        {catBad} fix
                      </span>
                    )}
                    {catBad === 0 && (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded-full px-1.5 py-0.5">
                        {catGood}/{catChecks.length}
                      </span>
                    )}
                  </div>
                  {isOpen
                    ? <ChevronDown size={11} className="text-slate-300 shrink-0" />
                    : <ChevronRight size={11} className="text-slate-300 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-3 space-y-2.5">
                    {catChecks.map(c => (
                      <div key={c.id} className="flex items-start gap-2.5">
                        <StatusIcon status={c.status} />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-700 leading-none mb-0.5">
                            {c.label}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug">{c.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Score bar */}
          <div className="px-5 py-3 bg-slate-50 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  grade === 'good' ? 'bg-emerald-500' : grade === 'ok' ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums">{score}/100</span>
          </div>
        </div>
      )}
    </div>
  );
}
