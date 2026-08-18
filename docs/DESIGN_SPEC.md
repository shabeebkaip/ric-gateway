# Milestone 2 Design Specification — Shared Product Quotation Modal

## Status and intent

This specification covers Milestone 2 only. It is a behavior-only correction for product-detail pages; it does not introduce a visual redesign.

The blue hero `Request for Quotation` control beside `Call Us` and `Visit Office` must open the same existing `RequestQuoteModal` used by the lower `ProductCTA`. Activating either quotation control must keep the visitor on the current product URL and open one product-specific dialog instance.

The existing modal layout, fields, copy, colors, typography, spacing, animation, validation, loading, error, and success presentation remain unchanged unless a minimal accessibility correction is required to satisfy the keyboard and focus requirements below.

## Target user and jobs to be done

The target user is a public visitor evaluating medical equipment on a product-detail page.

Their primary jobs are:

1. Request pricing or product information without losing the product context they are currently reviewing.
2. Confirm that the quotation request names the correct product and partner/brand.
3. Choose an alternative contact method—telephone or office directions—without those actions changing unexpectedly.

## Scope boundaries

### Included

- Change the hero `Request for Quotation` control from navigation to a modal trigger.
- Make `ProductDetailContent` the owner of one quotation-open state and one `RequestQuoteModal`.
- Pass one open callback to both `ProductHero` and `ProductCTA`.
- Derive and pass the current product quotation payload once from the shared owner.
- Preserve the existing visual treatment and responsive wrapping of both quotation controls.
- Preserve and verify the existing modal's pointer, keyboard, focus, dismissal, scroll-lock, form, loading, error, and success behavior.

### Excluded

- Redesigning the modal or either CTA.
- Adding fields, changing validation, changing copy, or changing the product-enquiry API.
- Changing the adjacent phone link, office map link, lower `Explore {categoryName}` link, or global navigation `Get a Quote` behavior.
- Adding global state, URL parameters, route parsing, or a second modal instance.

## Information architecture

No page, route, or navigation changes are introduced.

```text
Product detail page
├── ProductHero
│   ├── Request for Quotation — opens shared dialog
│   ├── Call Us — existing telephone link
│   └── Visit Office — existing external map link
├── Product information sections
├── ProductCTA
│   ├── Request a Quotation — opens shared dialog
│   └── Explore {categoryName} — existing category link
└── RequestQuoteModal — one instance, owned by ProductDetailContent
```

## User flows

### Flow 1 — Open from the hero

1. **Visitor sees:** the existing blue `Request for Quotation` button in the hero action group, with its present label, icon, size, gradient, and position beside the phone and office links.
   **System does:** renders it as a semantic `button`, not a link to `/contact`; no route change is prepared or prefetched.
2. **Visitor does:** activates the button with a pointer, Enter, or Space.
   **System does:** calls the shared quotation-open callback and opens the single `RequestQuoteModal` with the current product payload. Opening is synchronous; no new loading state or transient second overlay appears.
3. **Visitor sees:** the existing modal title, current product name, optional partner/brand, and unchanged quotation form over a dimmed page.
   **System does:** locks background scrolling, makes background content non-interactive to keyboard and assistive technology, and moves focus into the dialog.
4. **Visitor does:** dismisses with the visible close control, Escape, or a pointer press outside the dialog.
   **System does:** closes the dialog, removes the overlay and scroll lock, performs the modal's existing form reset behavior, and restores focus to the hero quotation button.

### Flow 2 — Open from the lower ProductCTA

1. **Visitor sees:** the existing lower `Request a Quotation` button with no visual or copy change.
2. **Visitor does:** activates it with a pointer, Enter, or Space.
   **System does:** invokes the same callback used by the hero button and opens the same modal instance with the same current product payload.
3. **Visitor does:** closes the dialog by any supported dismissal method.
   **System does:** restores focus to the lower button that invoked it, not to the hero button.

### Flow 3 — Submit the existing form

1. **Default/empty form:** the existing empty input values and placeholders are shown. Required fields retain their present required indicators and native validation. No additional empty state is needed.
2. **Invalid submission:** native validation prevents submission and identifies the first invalid required field. The dialog stays open and the product context is retained.
3. **Submitting/loading:** the existing submit button is disabled and shows `Submitting...` with its progress indicator. Repeated activation must not create duplicate requests. The quotation dialog and overlay remain a single instance.
4. **Server/API error or offline failure:** the existing destructive toast is shown; the form remains available with entered values preserved so the visitor can correct or retry. No navigation occurs.
5. **Success:** the existing success view is shown for the same current product. Closing the success view dismisses the shared dialog, resets it according to existing behavior, and returns focus to the button that opened it.

### Flow 4 — Alternative contact actions

1. Activating `Call Us: +966 11 465 4113 (Ext. 106)` continues to use `tel:+966114654113`.
2. Activating `Visit Office` continues to open its current Google Maps URL in a secure new tab using `target="_blank"` and `rel="noopener noreferrer"`.
3. Neither action opens the quotation dialog. The product-detail change must not alter the global navigation `Get a Quote` behavior.

## Interaction and state ownership

`ProductDetailContent` is the nearest shared owner and is the only product-detail component allowed to own quotation modal state.

Required interaction contract:

- `ProductDetailContent` owns one boolean open state, one state-change handler, one open callback, and one `RequestQuoteModal` instance.
- `ProductDetailContent` derives the modal payload once from the current `product` and `category` props:
  - `productName = product.name`
  - `productSlug = product.id` (the existing ID/slug value used by the enquiry flow)
  - `category = category.slug`
  - `partnerName = product.brand` when present
- `ProductHero` receives an `onRequestQuote` callback and calls it from the hero button.
- `ProductCTA` receives the same `onRequestQuote` callback and calls it from the lower button.
- `ProductCTA` must no longer own `quoteOpen`, render `RequestQuoteModal`, or independently derive the submission payload.
- `ProductHero` must not render a modal or own quotation state.
- Repeated activation while the modal is already open leaves one dialog and one overlay; it must not mount or queue a second modal.
- Closing from any supported path updates the one shared state owner.

The callback prop should describe intent (`onRequestQuote` or an equally explicit name), not implementation (`setOpen`). This keeps both child components stateless with respect to the dialog.

## Component inventory and states

### `ProductDetailContent`

- **Purpose:** orchestrates the product-detail page and owns the single quotation-dialog lifecycle and payload.
- **Inputs:** existing `product`, `category`.
- **Internal state:** quotation dialog open/closed only.
- **Children affected:** `ProductHero`, `ProductCTA`, one `RequestQuoteModal`.
- **States:** closed (default); open; closing/resetting according to the existing modal transition. No duplicate or child-owned quotation state.

### Hero quotation trigger

- **Purpose:** primary in-context quotation action near the product summary.
- **Element:** semantic `<button type="button">`; it must not be wrapped in `Link` or carry `/contact` navigation.
- **Accessible name:** visible text `Request for Quotation`.
- **Default, hover, active, focus-visible, and disabled presentation:** preserve current button styling. It is not normally disabled.
- **Keyboard:** Enter and Space open the dialog once.
- **ARIA:** `aria-haspopup="dialog"` is appropriate. `aria-expanded` may reflect the shared open state if it is passed to the trigger. Do not add `aria-controls` unless the dialog has a stable matching ID.

### Lower quotation trigger

- **Purpose:** repeats the quotation action after the visitor reviews product details.
- **Element:** semantic `<button type="button">` using its existing `Request a Quotation` label and styling.
- **Behavior:** identical open callback and modal instance as the hero trigger.
- **States:** preserve existing default, hover, active, and focus-visible presentation.

### `RequestQuoteModal`

- **Purpose:** collect and submit a product-specific quotation enquiry.
- **Instance count:** exactly one within the product-detail page.
- **Inputs:** controlled `open`, `onOpenChange`, and the shared current product payload.
- **States:** closed; open/default form; native validation error; submitting; API/offline error; submitted/success; closing/resetting.
- **Visual treatment:** unchanged from the existing implementation.
- **Dismissal:** visible close button, Escape, and outside pointer interaction retain existing Radix dialog behavior.

### Phone and office controls

- **Purpose:** alternate contact routes.
- **Elements:** remain anchors, because they navigate to an external handler/location.
- **Targets and styling:** unchanged.

## Visual system and tokens

The aesthetic direction remains the current **precise medical/technical** product-detail design. No new tokens, colors, type sizes, spacing values, radii, shadows, or motion values are introduced.

- Preserve the hero trigger's current blue-to-sky gradient, white text, pill radius, spacing, shadow, icon, hover treatment, and transition classes.
- Preserve the lower trigger's current gradient, typography, spacing, radius, shadow, and label.
- Preserve all existing `RequestQuoteModal` tokens and layout.
- Preserve existing phone and office control treatment.
- No new color pairing is specified by this change; therefore the implementation must not alter existing foreground/background pairings. Visible focus must remain at least as perceivable as the current shared button/input focus treatment and must not be removed.
- Do not introduce new motion. Existing dialog and button transitions apply. Under `prefers-reduced-motion: reduce`, rely on the application's existing reduced-motion behavior and do not add required motion for understanding or completion.

## Responsive behavior

The current page and modal breakpoints remain authoritative; this fix must preserve them.

- **Below 640px:** the hero action group continues to wrap naturally without horizontal overflow. The quotation trigger remains a minimum 44px touch target and keeps its label readable. The modal remains within the viewport with its existing horizontal inset, `max-h-[90vh]`, and internal vertical scrolling; page content behind it must not scroll.
- **640px and above:** retain the current action ordering, gaps, button dimensions, and wrapping behavior. The existing modal `sm:max-w-lg` width remains unchanged.
- **All widths:** opening the dialog must not change document width, cause a layout jump beyond normal scrollbar compensation, clip the close control, or create two overlays. Long product or partner text continues to use the modal's existing truncation behavior and must not push controls outside the viewport.
- Test at a compact mobile width (approximately 375px) and a desktop width (at least 1280px), plus the existing wrap transition around the `sm` breakpoint.

## Accessibility specification

### Keyboard and focus

1. Both quotation triggers are reachable in normal DOM order.
2. Enter and Space activate either trigger exactly once.
3. On open, focus moves inside the dialog. Prefer the first required field (`Full Name`) as the initial focus target; if the existing Radix focus policy is retained, focus must at minimum land on a meaningful, visible control inside the dialog and never remain behind the overlay.
4. Tab and Shift+Tab remain trapped within the open dialog and traverse visible controls in logical order: close control, form fields, and submit control (or the success-state close action).
5. Escape closes the dialog unless the existing submission behavior deliberately prevents dismissal; no such new prevention is introduced by this milestone.
6. Closing by close button, Escape, outside pointer interaction, or the success-state Close button returns focus to the exact trigger that opened the dialog.
7. Focus indicators must be visible for both CTA buttons and every modal control. Do not use `outline: none` without an equivalent visible focus indicator.

### Semantics and announcements

- The trigger is a button because it performs an in-page action; it is not a link.
- The dialog retains the existing semantic title and description relationships supplied by the shared Radix dialog primitives.
- The current product name and optional partner context remain part of the dialog description available to assistive technology.
- Existing required-field semantics, input labels, disabled submitting state, toast error announcement, and success content remain intact.
- Decorative icons remain non-essential; visible labels carry the accessible names.
- Background content is inert/non-interactive while the dialog is open, and body scroll is restored after close.
- All touch targets involved in opening or closing the dialog must be at least 44 by 44 CSS pixels.

## RTL and localization

Arabic/RTL use is plausible for the Saudi market, so the interaction must remain direction-safe even though this milestone adds no translation work.

- Do not hardcode physical left/right positioning as part of the trigger refactor; preserve logical DOM order and inherited document direction.
- The CTA and dialog continue to inherit `dir` from the application/document.
- Icons remain adjacent to their labels without changing the accessible name.
- Telephone and email values should retain left-to-right rendering when placed inside an RTL document (using inherited existing bidi handling or an explicit `dir="ltr"` at the value level when localization is introduced).
- Focus order follows DOM order in both LTR and RTL; visual mirroring must not reverse keyboard order independently.
- Product and partner strings may be Arabic, English, or mixed-direction text and must continue to truncate/wrap within the current modal bounds without changing the payload.

## Acceptance criteria

1. On every valid product-detail route, the hero `Request for Quotation` is a semantic button and no longer navigates to `/contact`.
2. Pointer, Enter, and Space activation of the hero trigger open the existing product quotation dialog without changing the pathname, query, or hash.
3. The hero and lower quotation buttons invoke the same callback owned by `ProductDetailContent`.
4. `ProductDetailContent` renders exactly one `RequestQuoteModal`; neither `ProductHero` nor `ProductCTA` owns an independent modal instance or quotation-open state.
5. Both entry points show and submit the same current `product.name`, `product.id`, `category.slug`, and `product.brand` context.
6. Opening, closing, and reopening from alternating triggers never creates duplicate dialogs, overlays, requests, or stale product context.
7. The dialog closes with its visible close control, Escape, and outside pointer interaction, and focus returns to the exact invoking trigger.
8. While open, focus stays inside the dialog, background content is non-interactive, and page scrolling is locked; all are restored after close.
9. The existing form's default, validation, submitting, API/offline error, and success states remain functionally and visually unchanged.
10. The hero and lower CTA visual styling, labels, iconography, sizing, layout, hover behavior, and responsive wrapping remain unchanged.
11. The phone anchor remains `tel:+966114654113`; the office anchor retains its current Google Maps URL, `target="_blank"`, and `rel="noopener noreferrer"`.
12. The lower category link and the global navigation `Get a Quote` behavior remain unchanged.
13. At approximately 375px and at least 1280px wide, both triggers remain usable, the modal fits and scrolls within the viewport, its close control is visible, and no horizontal overflow or duplicate overlay occurs.
14. No new global state, backend/API change, route parsing, modal variant, or visual token is introduced.

## Handoff checklist for `[frontend-developer]`

1. Add the one controlled quotation-open state, state-change handler, and open callback to `ProductDetailContent`.
2. Render one `RequestQuoteModal` in `ProductDetailContent` and pass the current product/category/partner payload from that owner.
3. Add the same intent-named callback prop to `ProductHero` and `ProductCTA` and update their TypeScript interfaces.
4. Replace only the hero quotation `Link` with a semantic `button type="button"`; preserve its current classes, icon, and label.
5. Remove the lower CTA's local quotation state and nested modal while preserving its button styling and category link.
6. Remove only imports made obsolete by this refactor; do not modify the phone, office, category, or global header links.
7. Verify one modal/overlay in the DOM, unchanged URL, and correct product payload from both triggers on at least two different product-detail routes.
8. Verify pointer, Enter, Space, Escape, close-button, outside-click, focus trap, exact-trigger focus restoration, and scroll locking.
9. Verify the existing empty/validation, submitting, error/offline, and success states still work and do not double-submit.
10. Verify approximately 375px, the `sm` wrap transition, and at least 1280px widths without layout or visual regression.
11. Run TypeScript and applicable focused checks, then record runtime evidence for QA. Report repository-wide lint/build limitations separately rather than representing them as passes.

