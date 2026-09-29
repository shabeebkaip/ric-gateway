// Temporary campaign banner — remove after the event by deleting this file, its
// images in public/events/, and its import/usage in app/(public)/page.tsx.

export const EventBannerSection = () => (
  <section
    aria-label="RIC Medical at The 2nd Health Forum for Wound Care 2026"
    // pt clears the fixed navigation; bg matches the banner's edge color.
    className="bg-[#fdfdfd] pt-24 lg:pt-28"
  >
    <picture>
      <source media="(min-width: 768px)" srcSet="/events/event-banner-desktop.jpg" width={1774} height={887} />
      <img
        src="/events/event-banner-mobile.jpg"
        width={1024}
        height={1536}
        alt="The 2nd Health Forum for Wound Care 2026, October 2–4, 2026. We're attending. You're invited. We look forward to welcoming you to our exhibition stand."
        fetchPriority="high"
        className="block h-auto w-full"
      />
    </picture>
  </section>
);
