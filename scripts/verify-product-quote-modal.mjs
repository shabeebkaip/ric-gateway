import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [detailContent, hero, cta, types] = await Promise.all([
  readFile("src/components/products/ProductDetailContent.tsx", "utf8"),
  readFile("src/components/products/detail/ProductHero.tsx", "utf8"),
  readFile("src/components/products/detail/ProductCTA.tsx", "utf8"),
  readFile("src/types/index.ts", "utf8"),
]);

const occurrences = (source, value) => source.split(value).length - 1;

assert.equal(
  occurrences(detailContent, "const [quoteOpen, setQuoteOpen] = useState(false)"),
  1,
  "ProductDetailContent must own exactly one quotation-open state",
);
assert.equal(
  occurrences(detailContent, "<RequestQuoteModal"),
  1,
  "ProductDetailContent must render exactly one RequestQuoteModal",
);
assert.equal(
  occurrences(detailContent, "onRequestQuote={openQuote}"),
  2,
  "ProductHero and ProductCTA must receive the same quotation callback",
);
assert.match(
  detailContent,
  /const quoteTriggerRef = useRef<HTMLButtonElement \| null>\(null\)/,
  "ProductDetailContent must track the exact invoking button",
);
assert.match(
  detailContent,
  /const openQuote = \(trigger: HTMLButtonElement\) => \{\s*quoteTriggerRef\.current = trigger;\s*setQuoteOpen\(true\);\s*\}/,
  "The shared open callback must record its invoking button",
);
assert.match(
  detailContent,
  /if \(!trigger\) return;\s*event\.preventDefault\(\);\s*trigger\.focus\(\);\s*quoteTriggerRef\.current = null;/,
  "Close autofocus must restore the exact trigger and clear the stored reference",
);
assert.match(detailContent, /onCloseAutoFocus=\{handleQuoteCloseAutoFocus\}/);
assert.match(detailContent, /productName=\{product\.name\}/);
assert.match(detailContent, /productSlug=\{product\.id\}/);
assert.match(detailContent, /category=\{category\.slug\}/);
assert.match(detailContent, /partnerName=\{product\.brand\}/);

assert.doesNotMatch(
  hero,
  /<Link href="\/contact">\s*<FileText[\s\S]*?Request for Quotation/,
  "The hero quotation control must not navigate to /contact",
);
assert.match(
  hero,
  /<Button\s+type="button"\s+onClick=\{\(event\) => onRequestQuote\(event\.currentTarget\)\}[\s\S]*?<FileText[\s\S]*?Request for Quotation\s*<\/Button>/,
  "The hero quotation control must be a semantic button using the shared callback",
);
assert.match(hero, /<a href="tel:\+966114654113">/);
assert.match(
  hero,
  /href="https:\/\/www\.google\.com\/maps\/place\/RIYADH\+INTERNATIONAL\+CORPORATION\/[^"]+"\s+target="_blank"\s+rel="noopener noreferrer"/,
  "The existing office destination and secure new-tab attributes must remain intact",
);

assert.doesNotMatch(cta, /useState/);
assert.doesNotMatch(cta, /RequestQuoteModal/);
assert.match(
  cta,
  /<Button\s+type="button"\s+onClick=\{\(event\) => onRequestQuote\(event\.currentTarget\)\}[\s\S]*?Request a Quotation\s*<\/Button>/,
  "The lower quotation control must use the shared callback",
);
assert.match(
  cta,
  /<Link href=\{`\/products\/\$\{categorySlug\}`\}>/,
  "The lower category link must remain intact",
);

assert.match(
  types,
  /export interface ProductHeroProps \{[\s\S]*?onRequestQuote: \(trigger: HTMLButtonElement\) => void;[\s\S]*?\}/,
);
assert.match(
  types,
  /export interface ProductCTAProps \{[\s\S]*?onRequestQuote: \(trigger: HTMLButtonElement\) => void;[\s\S]*?\}/,
);

const modal = await readFile(
  "src/components/shared/RequestQuoteModal.tsx",
  "utf8",
);
assert.match(modal, /onCloseAutoFocus\?: \(event: Event\) => void;/);
assert.match(modal, /onCloseAutoFocus=\{onCloseAutoFocus\}/);

console.log(
  "Product quotation modal regression checks passed: one owner, two shared triggers, exact-trigger focus restoration, one product payload, unchanged phone/office/category links.",
);
