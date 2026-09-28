import React from 'react';

/**
 * Renders the clubs' audition text. The source text mixes light Markdown
 * (#, **bold**, - bullets) with plain-text conventions ("ROUND 1 — Quiz",
 * "Step 2 — …", ALL-CAPS section titles, "1. item"), so this is line-based
 * and promotes those conventions to headings and lists.
 */
const HEADING_RE = [
  /^#{1,4}\s+/, // markdown heading
  /^[^\w\s]{0,3}\s*(round|step|stage)\s*\d+\b/i, // "🔵 Round 1 — …", "Step 2 — …"
  /^\d+\.\s+[^a-z]*[A-Z][^.]*:\s*$/ // "1. The 4 Audition Rounds :"
];

function isHeading(line) {
  const t = line.replace(/\*\*/g, '').trim();
  if (!t) return false;
  if (HEADING_RE.some((re) => re.test(t))) return true;
  // ALL-CAPS section titles such as "RULES & REGULATIONS"
  const letters = t.replace(/[^A-Za-z]/g, '');
  return letters.length >= 6 && letters === letters.toUpperCase() && t.length < 48;
}

export default function MarkdownRenderer({ content = '', className = '' }) {
  if (!content) return null;

  const lines = content.replace(/\t/g, '  ').split('\n');
  const out = [];
  let list = null; // { ordered, items: [] }

  const flush = () => {
    if (!list) return;
    const { ordered, items } = list;
    out.push(
      <ul key={out.length} className="space-y-2.5 my-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 items-start">
            {ordered ? (
              <span className="shrink-0 mt-[1px] grid place-items-center min-w-[24px] h-6 px-1 rounded-full bg-[#1C1917] text-white font-mono text-[11px] font-bold">
                {it.n}
              </span>
            ) : (
              <span className="shrink-0 mt-[9px] w-1.5 h-1.5 rotate-45 bg-[#C25E42]" />
            )}
            <span className="flex-1">{inline(it.text)}</span>
          </li>
        ))}
      </ul>
    );
    list = null;
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) return flush();

    if (isHeading(line)) {
      flush();
      const text = line.replace(/^#{1,4}\s+/, '').replace(/\*\*/g, '').replace(/\s*:\s*$/, '');
      out.push(
        <h3
          key={out.length}
          className="font-display font-extrabold text-[#1C1917] text-[15.5px] sm:text-base mt-7 first:mt-0 mb-2 pb-2 border-b border-dashed border-[#1C1917]/25"
        >
          {text}
        </h3>
      );
      return;
    }

    const ordered = line.match(/^(\d+)[.)]\s*(.+)$/);
    const bullet = line.match(/^[-*•]\s+(.+)$/);
    if (ordered || bullet) {
      const isOrdered = !!ordered;
      if (!list || list.ordered !== isOrdered) {
        flush();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push(isOrdered ? { n: ordered[1], text: ordered[2] } : { text: bullet[1] });
      return;
    }

    flush();
    out.push(
      <p key={out.length} className="my-2">
        {inline(line)}
      </p>
    );
  });
  flush();

  return <div className={`text-[#44403C] text-[15px] leading-relaxed ${className}`}>{out}</div>;
}

function inline(text) {
  // "Costume: Wear …" → bold the short leading label
  const label = text.match(/^([A-Z][A-Za-z &/]{2,28}):\s+(.+)$/);
  if (label) {
    return [
      <strong key="label" className="font-semibold text-[#1C1917]">{label[1]}:</strong>,
      ' ',
      ...inline(label[2])
    ];
  }
  const parts = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      m[1] ? (
        <strong key={m.index} className="font-semibold text-[#1C1917]">{m[1]}</strong>
      ) : (
        <em key={m.index}>{m[2]}</em>
      )
    );
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
