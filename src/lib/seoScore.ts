// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckStatus = 'good' | 'ok' | 'bad';
export type CheckCategory = 'keyword' | 'headings' | 'readability' | 'meta' | 'links' | 'images';

export interface SeoCheck {
  id: string;
  category: CheckCategory;
  label: string;
  status: CheckStatus;
  message: string;
  points: number;
  max: number;
}

export interface SeoScore {
  score: number;
  grade: 'good' | 'ok' | 'bad';
  checks: SeoCheck[];
}

export interface SeoScoreInput {
  /** HTML or plain-text content (blog post body) */
  content?: string;
  /** Actual title field (not the meta override) */
  title: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  /** For blog cover image */
  coverImageAlt?: string;
  /** For product images */
  imageAlt?: string;
  /** Product description (used when no long-form content) */
  description?: string;
}

// ─── Text helpers ─────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractHeadings(html: string): { level: number; text: string }[] {
  const regex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  return [...html.matchAll(regex)].map(m => ({
    level: parseInt(m[1]),
    text: m[2].replace(/<[^>]*>/g, '').trim(),
  }));
}

function syllableCount(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  let count = 0;
  let prevVowel = false;
  for (const c of w) {
    const isVowel = 'aeiou'.includes(c);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  if (w.endsWith('e') && count > 1) count--;
  return Math.max(1, count);
}

function fleschReadingEase(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 2);
  const words = text.split(/\s+/).filter(Boolean);
  if (sentences.length === 0 || words.length < 10) return 0;
  const totalSyllables = words.reduce((n, w) => n + syllableCount(w), 0);
  const asl = words.length / sentences.length;
  const asw = totalSyllables / words.length;
  return Math.min(100, Math.max(0, 206.835 - 1.015 * asl - 84.6 * asw));
}

function keywordOccurrences(text: string, keyword: string): number {
  if (!keyword || !text) return 0;
  const kw = keyword.toLowerCase().trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (text.toLowerCase().match(new RegExp(kw, 'g')) ?? []).length;
}

function keywordDensity(text: string, keyword: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return words > 0 ? (keywordOccurrences(text, keyword) / words) * 100 : 0;
}

function countInternalLinks(html: string): number {
  return [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .filter(m => m[1].startsWith('/'))
    .length;
}

function contentImagesWithoutAlt(html: string): number {
  return [...html.matchAll(/<img\b[^>]*>/gi)].filter(m => {
    const alt = m[0].match(/alt=["']([^"']*)["']/i);
    return !alt || alt[1].trim() === '';
  }).length;
}

// ─── Check builders ───────────────────────────────────────────────────────────

function check(
  id: string,
  category: CheckCategory,
  label: string,
  status: CheckStatus,
  message: string,
  points: number,
  max: number,
): SeoCheck {
  return { id, category, label, status, message, points, max };
}

// ─── Main scorer ──────────────────────────────────────────────────────────────

export function computeSeoScore(input: SeoScoreInput): SeoScore {
  const {
    content = '',
    title,
    slug = '',
    metaTitle = '',
    metaDescription = '',
    focusKeyword = '',
    coverImageAlt = '',
    imageAlt = '',
    description = '',
  } = input;

  const hasContent = content.trim().length > 50;
  const kw = focusKeyword.trim().toLowerCase();
  const hasKw = kw.length > 0;

  const plainContent = hasContent ? stripHtml(content) : stripHtml(description);
  const effectiveTitle = (metaTitle || title).trim();
  const checks: SeoCheck[] = [];

  // ── Keyword checks ──────────────────────────────────────────────────────────

  if (hasKw) {
    // Keyword in SEO/meta title
    const inTitle = effectiveTitle.toLowerCase().includes(kw);
    checks.push(check(
      'kw-title', 'keyword', 'Keyword in title',
      inTitle ? 'good' : 'bad',
      inTitle
        ? `"${focusKeyword}" found in the title.`
        : `Add "${focusKeyword}" to the title for better ranking.`,
      inTitle ? 10 : 0, 10,
    ));

    // Keyword in meta description
    const inDesc = metaDescription.toLowerCase().includes(kw);
    checks.push(check(
      'kw-desc', 'keyword', 'Keyword in meta description',
      inDesc ? 'good' : 'bad',
      inDesc
        ? `"${focusKeyword}" found in the meta description.`
        : `Include "${focusKeyword}" in your meta description.`,
      inDesc ? 8 : 0, 8,
    ));

    // Keyword in slug
    const inSlug = slug.toLowerCase().includes(kw.replace(/\s+/g, '-'));
    checks.push(check(
      'kw-slug', 'keyword', 'Keyword in URL slug',
      inSlug ? 'good' : 'ok',
      inSlug
        ? `"${focusKeyword}" is reflected in the URL slug.`
        : `Consider including "${focusKeyword}" in the slug.`,
      inSlug ? 5 : 2, 5,
    ));

    // Keyword in content / description
    if (plainContent.length > 50) {
      const density = keywordDensity(plainContent, kw);
      const occurrences = keywordOccurrences(plainContent, kw);
      const densityStatus: CheckStatus =
        density >= 0.5 && density <= 2.5 ? 'good' : density > 0 ? 'ok' : 'bad';
      const densityPts = density >= 0.5 && density <= 2.5 ? 12 : density > 0 ? 6 : 0;
      checks.push(check(
        'kw-density', 'keyword', 'Keyword density',
        densityStatus,
        density === 0
          ? `"${focusKeyword}" not found in the content.`
          : density < 0.5
            ? `Density ${density.toFixed(1)}% is low (${occurrences}× found). Aim for 0.5–2.5%.`
            : density > 2.5
              ? `Density ${density.toFixed(1)}% is high. Reduce to 0.5–2.5% to avoid keyword stuffing.`
              : `Good — density is ${density.toFixed(1)}% (${occurrences}× found).`,
        densityPts, 12,
      ));
    }
  }

  // ── Headings (blog content only) ────────────────────────────────────────────

  if (hasContent) {
    const headings = extractHeadings(content);
    const h1s = headings.filter(h => h.level === 1);
    const h2s = headings.filter(h => h.level === 2);

    // H1 check
    const h1Status: CheckStatus = h1s.length === 1 ? 'good' : h1s.length === 0 ? 'bad' : 'ok';
    checks.push(check(
      'h1', 'headings', 'H1 heading',
      h1Status,
      h1s.length === 0
        ? 'No H1 found. Add one H1 heading to your content.'
        : h1s.length > 1
          ? `Found ${h1s.length} H1 headings. Use exactly one H1 per page.`
          : 'H1 heading is present.',
      h1s.length === 1 ? 5 : 0, 5,
    ));

    // Keyword in H1
    if (hasKw && h1s.length > 0) {
      const kwInH1 = h1s.some(h => h.text.toLowerCase().includes(kw));
      checks.push(check(
        'kw-h1', 'keyword', 'Keyword in H1',
        kwInH1 ? 'good' : 'ok',
        kwInH1
          ? `"${focusKeyword}" found in the H1 heading.`
          : `Consider including "${focusKeyword}" in your H1 heading.`,
        kwInH1 ? 5 : 2, 5,
      ));
    }

    // H2 check
    const h2Status: CheckStatus = h2s.length >= 2 ? 'good' : h2s.length === 1 ? 'ok' : 'bad';
    checks.push(check(
      'h2', 'headings', 'H2 subheadings',
      h2Status,
      h2s.length === 0
        ? 'No H2 subheadings found. Structure your content with H2 sections.'
        : h2s.length === 1
          ? 'Only 1 H2 found. Use multiple H2s to organize long content.'
          : `Good — ${h2s.length} H2 subheadings found.`,
      h2s.length >= 2 ? 5 : h2s.length === 1 ? 2 : 0, 5,
    ));

    // Heading hierarchy
    let hierarchyOk = true;
    let prevLevel = 0;
    for (const h of headings) {
      if (prevLevel > 0 && h.level > prevLevel + 1) { hierarchyOk = false; break; }
      prevLevel = h.level;
    }
    checks.push(check(
      'hierarchy', 'headings', 'Heading hierarchy',
      hierarchyOk ? 'good' : 'ok',
      hierarchyOk
        ? 'Heading levels are in logical order.'
        : 'Heading levels skip (e.g. H2 → H4). Keep headings sequential.',
      hierarchyOk ? 5 : 2, 5,
    ));

    // Content length
    const words = plainContent.split(/\s+/).filter(Boolean).length;
    const lengthStatus: CheckStatus = words >= 600 ? 'good' : words >= 300 ? 'ok' : 'bad';
    checks.push(check(
      'length', 'headings', 'Content length',
      lengthStatus,
      words < 300
        ? `Only ${words} words. Aim for at least 300 (ideally 600+).`
        : words < 600
          ? `${words} words is acceptable. 600+ words ranks better.`
          : `${words} words — good content depth.`,
      words >= 600 ? 5 : words >= 300 ? 2 : 0, 5,
    ));

    // ── Readability ─────────────────────────────────────────────────────────

    const flesch = fleschReadingEase(plainContent);
    const readStatus: CheckStatus = flesch >= 60 ? 'good' : flesch >= 45 ? 'ok' : 'bad';
    checks.push(check(
      'readability', 'readability', 'Readability score',
      readStatus,
      flesch < 10
        ? 'Not enough content to analyse readability.'
        : flesch >= 60
          ? `Flesch score ${Math.round(flesch)}/100 — easy to read.`
          : flesch >= 45
            ? `Flesch score ${Math.round(flesch)}/100 — somewhat difficult. Try shorter sentences.`
            : `Flesch score ${Math.round(flesch)}/100 — difficult. Simplify sentence structure.`,
      flesch >= 60 ? 10 : flesch >= 45 ? 5 : 0, 10,
    ));

    // ── Internal links ───────────────────────────────────────────────────────

    const linkCount = countInternalLinks(content);
    const linkStatus: CheckStatus = linkCount >= 2 ? 'good' : linkCount >= 1 ? 'ok' : 'bad';
    checks.push(check(
      'links', 'links', 'Internal links',
      linkStatus,
      linkCount === 0
        ? 'No internal links found. Add links to related pages to improve navigation.'
        : linkCount === 1
          ? '1 internal link found. Adding 2+ helps distribute page authority.'
          : `${linkCount} internal links found — good.`,
      linkCount >= 2 ? 8 : linkCount >= 1 ? 4 : 0, 8,
    ));

    // ── Images in content ────────────────────────────────────────────────────

    const badImgs = contentImagesWithoutAlt(content);
    if (badImgs > 0) {
      checks.push(check(
        'img-content', 'images', 'Images in content',
        'bad',
        `${badImgs} image${badImgs > 1 ? 's' : ''} in content missing alt text.`,
        0, 5,
      ));
    }
  }

  // ── Meta checks ──────────────────────────────────────────────────────────────

  // Meta title length
  const titleLen = effectiveTitle.length;
  const titleStatus: CheckStatus =
    titleLen >= 50 && titleLen <= 60 ? 'good' :
    titleLen >= 30 && titleLen <= 70 ? 'ok' : 'bad';
  checks.push(check(
    'meta-title-len', 'meta', 'Title length',
    titleLen === 0 ? 'bad' : titleStatus,
    titleLen === 0
      ? 'Title is empty. Add a title.'
      : titleLen < 30
        ? `Title is too short (${titleLen} chars). Aim for 50–60.`
        : titleLen > 70
          ? `Title is too long (${titleLen} chars). Keep it under 70.`
          : titleLen >= 50 && titleLen <= 60
            ? `Title length is perfect (${titleLen} chars).`
            : `Title length is acceptable (${titleLen} chars). Ideal is 50–60.`,
    titleLen === 0 ? 0 : titleStatus === 'good' ? 8 : titleStatus === 'ok' ? 4 : 1, 8,
  ));

  // Meta description length
  const descLen = metaDescription.length;
  const descStatus: CheckStatus =
    descLen >= 120 && descLen <= 160 ? 'good' :
    descLen >= 70 && descLen <= 170 ? 'ok' : 'bad';
  checks.push(check(
    'meta-desc-len', 'meta', 'Meta description length',
    descLen === 0 ? 'bad' : descStatus,
    descLen === 0
      ? 'Meta description is missing. Add one (120–160 chars).'
      : descLen < 70
        ? `Too short (${descLen} chars). Aim for 120–160 characters.`
        : descLen > 170
          ? `Too long (${descLen} chars). Keep it under 160 to prevent truncation.`
          : descLen >= 120 && descLen <= 160
            ? `Meta description length is perfect (${descLen} chars).`
            : `Acceptable length (${descLen} chars). Ideal is 120–160.`,
    descLen === 0 ? 0 : descStatus === 'good' ? 9 : descStatus === 'ok' ? 4 : 1, 9,
  ));

  // ── Image alt text ─────────────────────────────────────────────────────────

  const altText = coverImageAlt || imageAlt;
  checks.push(check(
    'img-alt', 'images', 'Cover image alt text',
    altText ? 'good' : 'bad',
    altText
      ? 'Cover image has descriptive alt text.'
      : 'Add alt text to the cover/main image.',
    altText ? 5 : 0, 5,
  ));

  // ── Compute final score ───────────────────────────────────────────────────

  const totalMax = checks.reduce((n, c) => n + c.max, 0);
  const totalEarned = checks.reduce((n, c) => n + c.points, 0);
  const score = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const grade: SeoScore['grade'] =
    score >= 70 ? 'good' : score >= 40 ? 'ok' : 'bad';

  return { score, grade, checks };
}
