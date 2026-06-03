interface ArticleBodyProps {
  html: string;
}

export function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="
        prose prose-slate max-w-none
        prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-28
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-28
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
        prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:leading-relaxed prose-li:mb-1
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary-lighter/40
          prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
        prose-blockquote:text-foreground prose-blockquote:font-medium
        prose-code:bg-muted prose-code:text-foreground prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
          prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-foreground prose-pre:text-card prose-pre:rounded-2xl prose-pre:shadow-card
        prose-img:rounded-2xl prose-img:shadow-card prose-img:my-8
        prose-hr:border-border/50 prose-hr:my-10
        prose-table:text-sm
        prose-th:text-foreground prose-th:font-semibold prose-th:bg-muted/60
        prose-td:text-muted-foreground
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
