# TribalScale Landing Page — Accessibility Audit

## Executive Summary

This audit examined the live TribalScale landing page at [tribalscale.com](https://www.tribalscale.com/) against WCAG 2.2 Level AA. It found 8 unique verified findings: 4 Serious and 4 Moderate. No Critical or Minor findings were assigned.

The strongest implementation qualities are the meaningful page title and language, a clear primary heading and section structure, strong primary CTA naming, a chat iframe that is explicitly named, a main-document keyboard traversal with no reproduced trap, and a reduced-motion path that removes the observed page animation layer.

The most important accessibility risks are concentrated in the visually ambitious parts of the page: unnamed Spline and HubSpot form iframes, focusable links without names, custom navigation disclosures that do not expose equivalent semantics, informational logos/images with empty alternatives, a low-contrast newsletter privacy link, incomplete/duplicated landmarks, and narrow-layout clipping.

Automated results are evidence of concrete implementation conditions, not proof of conformance. The report intentionally deduplicates repeated instances of the same systemic problem.

## What Was Tested

- Date: 2026-09-30, America/Toronto.
- Production URL: `https://www.tribalscale.com/`.
- Visual and accessibility-tree inspection: Microsoft Edge user tab through the live page.
- Repeatable DOM and interaction inspection: Playwright 1.63.0 with Chromium 153.0.8010.12.
- Automated checks: axe-core through `@axe-core/playwright`.
- Accessibility-tree capture: Chrome DevTools Protocol `Accessibility.getFullAXTree`, plus the browser accessibility tree.
- Viewports: 1440×1000 desktop, 1024×900 tablet, 390×844 mobile, and 320×844 narrow mobile.
- No website code or production configuration was changed.
- No NVDA, JAWS, or VoiceOver user test was performed.

The page inventory included the desktop/mobile navigation, hero content and CTA links, the Spline 3D iframe/canvas, customer-logo grid, service cards, insights cards, numeric statistics, approach steps, final CTA, HubSpot newsletter form iframe, footer navigation, and fixed HubSpot chat widget.

The captured automated baseline reported these recurring rule types:

| Viewport | Recurring axe rule types |
| --- | --- |
| Desktop | `frame-title`, `heading-order`, duplicate/unlabelled contentinfo, `link-name`, `region` |
| Tablet | The desktop set plus `color-contrast` |
| Mobile | The desktop set plus `color-contrast`; the unnamed-link count increased with the mobile logo variant |

## What TribalScale Does Well

1. The document exposes `TribalScale - Global Innovation Partner` as its title and `lang="en-US"` at every tested viewport.
2. The accessibility tree exposes a meaningful primary H1, `AI-First, Relentlessly Human.`, plus recognizable section headings for the page’s major content groups.
3. The main conversion links have useful names: `Let’s build what others can’t`, `See our Work`, `Book a call`, `Explore The Latest Issue`, `Let's work together`, and the article titles. The search button is labelled `Search Icon`.
4. The HubSpot chat iframe is explicitly named `Chat Widget`, and the newsletter fields were exposed inside its iframe as `First Name*`, `Last Name*`, and `Business Email*`, with a named `Subscribe` button. The iframe boundary itself still needs a title; see Finding TS-A11Y-001.
5. The reduced-motion preference is respected by the observed animation layer. In normal mode, one long-running UL animation was present; with `prefers-reduced-motion: reduce`, the media query matched and `document.getAnimations()` returned zero animations.
6. A 90-Tab trace at desktop, tablet, and mobile did not reproduce a main-document keyboard trap. The mobile menu also changed state when activated with Enter and Space in Chromium, even though its semantic exposure is inadequate.

Evidence: [desktop initial viewport](evidence/desktop-initial-viewport.png), [mobile initial viewport](evidence/mobile-initial-viewport.png), [mobile menu open](evidence/mobile-menu-open.png), [desktop accessibility tree](evidence/desktop-ax-tree.json), and [motion-check.json](motion-check.json).

## Verified Findings

### Unnamed Spline and newsletter iframes

Severity: Serious  
WCAG: 4.1.2 Name, Role, Value; 1.3.1 Info and Relationships  
Viewport: Desktop, tablet, and mobile  
Evidence: axe `frame-title` reported two nodes in each viewport. The Spline iframe and the `srcdoc` HubSpot newsletter iframe have no `title`, `aria-label`, or usable `aria-labelledby`. The chat iframe is separately named `Chat Widget`. See [desktop DOM](evidence/desktop-dom.json) and [desktop AX tree](evidence/desktop-ax-tree.json).

User impact: A screen-reader user encounters the large hero experience and the newsletter task without reliable iframe context.

Technical explanation: The host page exposes the frames as focusable browsing contexts without names. The HubSpot form’s internal labels do not replace a name for the outer iframe.

Suggested remediation: Give each iframe a concise purpose-based title. If an iframe is decorative, remove it from the accessibility tree rather than leaving an unnamed focusable frame.

### Focusable links without discernible names

Severity: Serious  
WCAG: 2.4.4 Link Purpose (In Context); 4.1.2 Name, Role, Value  
Viewport: Desktop, tablet, and mobile  
Evidence: axe `link-name` reported two nodes on desktop/tablet and three on mobile. The desktop logo anchor is focusable while `aria-hidden="true"`; the mobile logo has the same pattern. The Spline watermark link is empty. See [keyboard trace](evidence/desktop-keyboard-focus.json) and [mobile keyboard trace](evidence/mobile-keyboard-focus.json).

User impact: Keyboard and screen-reader users reach a link with no usable name or destination description.

Technical explanation: The link contains only an aria-hidden SVG, and the Spline watermark anchor contains no accessible text. Hiding the graphic does not correctly label the interactive link.

Suggested remediation: Name the logo link `TribalScale home`, keep only the decorative SVG hidden, and label or remove the Spline watermark link according to whether it is intended page content.

### Visual navigation disclosures lack equivalent keyboard semantics

Severity: Serious  
WCAG: 2.1.1 Keyboard; 2.4.3 Focus Order; 4.1.2 Name, Role, Value  
Viewport: Desktop and mobile  
Evidence: The desktop `Capabilities` and `Company` items are generic divs with no role and `tabIndex=-1`; hovering them reveals substantial submenu content. The mobile hamburger is a generic `div` with `tabIndex=0`, no role, no accessible name, and no `aria-expanded`. See [mobile navigation inspection](mobile-nav-check.mjs), [desktop interaction inspection](desktop-interaction-check.mjs), and [open mobile menu](evidence/mobile-menu-open.png).

User impact: Desktop keyboard users cannot discover the same navigation revealed by hover. Mobile users may activate the menu in Chromium, but assistive technology is not told that the control is a menu button, what it controls, or whether it is expanded.

Technical explanation: Visual hover/click behavior is implemented on generic Framer containers. The mobile control responds to Enter and Space in the tested browser, but that behavior is not paired with button semantics or disclosure state.

Suggested remediation: Use real buttons for menu disclosures; expose names, `aria-expanded`, and `aria-controls`; make submenu links reachable in a predictable order; support Escape and focus return; provide a keyboard equivalent for desktop hover menus.

### Heading hierarchy skips from H2 to H4

Severity: Moderate  
WCAG: 1.3.1 Info and Relationships; 2.4.6 Headings and Labels  
Viewport: Desktop, tablet, and mobile  
Evidence: axe `heading-order` reported two nodes in every viewport. The observed sequence includes H2 `Why TribalScale?` followed directly by H4 service cards, and H2 `Our Human-Centred, Results-Driven Approach` followed directly by H4 process cards. See [desktop DOM](evidence/desktop-dom.json).

User impact: Heading-navigation users receive a misleading outline and may infer missing section levels.

Technical explanation: Card titles are emitted as H4 without an H3 parent. The three numeric statistics are also emitted as H1 elements, adding noise to the page outline.

Suggested remediation: Use heading levels from the information hierarchy rather than visual size: H1 for the page title, H2 for major sections, and H3 for cards or subsections beneath them.

### Landmark structure is incomplete and duplicated

Severity: Moderate  
WCAG: 1.3.1 Info and Relationships; 2.4.1 Bypass Blocks  
Viewport: Desktop, tablet, and mobile  
Evidence: axe reported duplicate/unlabelled contentinfo landmarks in every viewport and 24–28 `region` nodes outside landmarks. The DOM landmark inventory exposed nav, two footer elements, and the chat region but no dependable semantic main region. See [desktop DOM](evidence/desktop-dom.json) and [tablet AX tree](evidence/tablet-ax-tree.json).

User impact: Landmark navigation is noisy and incomplete: users may encounter duplicate footer destinations while the primary page content is not grouped under a dependable main region.

Technical explanation: Responsive Framer variants remain exposed as duplicate footer landmarks, while many major content containers are generic div/section elements outside a named main landmark.

Suggested remediation: Expose one active footer/contentinfo per viewport, label genuinely distinct landmarks, and wrap the primary landing-page content in a semantic main landmark.

### Newsletter Privacy Policy link fails minimum contrast

Severity: Serious  
WCAG: 1.4.3 Contrast (Minimum)  
Viewport: Tablet and mobile; the same component is present on desktop  
Evidence: axe measured foreground `#c5a55a` on `#ffffff` at 2.35:1 for the small Privacy Policy link; AA requires 4.5:1 for normal text. See [desktop footer](evidence/desktop-footer-viewport.png) and [mobile footer](evidence/mobile-footer-viewport.png).

User impact: The privacy link in the newsletter consent copy is difficult to read for users with low vision or reduced contrast sensitivity.

Suggested remediation: Use a darker link color or larger/bolder typography that reaches 4.5:1, and preserve a clear hover/focus distinction.

### Informational images are indistinguishable from decorative images

Severity: Moderate  
WCAG: 1.1.1 Non-text Content  
Viewport: Desktop, tablet, and mobile  
Evidence: The DOM image inventory found 53 visible images, 52 with empty alt and no explicit aria-hidden state, and only one with non-empty alt. The customer-logo grid is the clearest concern because the visual logos communicate customer identity without an equivalent text list. See [image-check.json](image-check.json) and [desktop initial viewport](evidence/desktop-initial-viewport.png).

User impact: Nonvisual users cannot identify the brands presented as proof points, and many insight cards lose useful image context.

Technical explanation: Empty alt is correct for purely decorative images, but the current implementation gives no reliable way to distinguish decorative assets from informative logos and article imagery. One insight image has descriptive alt while neighboring card images do not.

Suggested remediation: Classify each image by purpose. Add concise alt or adjacent equivalent text for informative logos/article imagery; explicitly mark purely decorative artwork as decorative.

### Narrow mobile layout clips the trusted-by statement and carousel content

Severity: Moderate  
WCAG: 1.4.10 Reflow; 1.4.4 Resize Text  
Viewport: 390px mobile and 320px narrow viewport  
Evidence: At 320px, the trusted paragraph is positioned at x=-76px with width 472px, `white-space: pre`, inside a 277px `overflow:hidden` container. The page-level `scrollWidth` still equals `clientWidth`, so the content is clipped rather than horizontally scrollable. See [narrow-320.json](narrow-320.json) and [mobile initial viewport](evidence/mobile-initial-viewport.png).

User impact: Users lose the start/end of the trust statement and portions of the logo presentation at narrow widths.

Suggested remediation: Allow the statement to wrap within the available width, provide an intentional accessible carousel pattern for logos, and verify the same area at 320 CSS px and 400% zoom.

## Keyboard Experience

The main document was traversed with Tab through a 90-step trace at each tested desktop/tablet/mobile viewport. No main-document keyboard trap was reproduced. The sequence did, however, expose an unnamed logo link first, then skipped visual desktop navigation items such as Capabilities and Company, reached the Spline iframe as a nested browsing context, and eventually moved through page links, footer links, and the chat iframe before returning to body.

Desktop `Capabilities` and `Company` reveal navigation on hover but are not tab stops. `Our Work` is rendered as an anchor without an href, and it does not appear as a normal keyboard destination in the observed trace. The mobile hamburger is a generic focusable div. Direct testing showed that clicking it, pressing Enter, and pressing Space changed the mobile menu state in Chromium; the problem is the missing semantic name/role/state and the absence of a dependable assistive-technology contract.

Focus visibility and focus-not-obscured behavior were not confirmed to WCAG 2.2 AA standard. The fixed chat widget visibly overlaps lower-right mobile content, so a human check is required when focus enters nearby links or the widget itself.

## Semantic / Accessibility Tree Review

- Page title: PASS / positive evidence.
- Document language: PASS / positive evidence, `en-US`.
- Primary heading: PASS / positive evidence; the primary H1 is exposed.
- Heading hierarchy: ISSUE; H2-to-H4 skips and additional H1 statistics.
- Main landmark: ISSUE; the page exposes a generic main-like container in the tree but no dependable semantic main landmark was found in the host DOM inventory.
- Footer/contentinfo: ISSUE; duplicate footer variants remain exposed.
- Links: Mixed. Primary CTA and content links are named, but logo and Spline watermark links are unnamed.
- Buttons: Search is named and behaves as a control. The mobile menu is not a button in the DOM/accessibility tree.
- Images: ISSUE; most visible images have empty alt, including customer logos and many article images.
- Iframes: ISSUE; Spline and newsletter frames are unnamed. Chat is named `Chat Widget`.
- Newsletter fields: Positive partial evidence inside the iframe—First Name, Last Name, Business Email, and Subscribe are exposed. The outer iframe name and dynamic error/status announcements still require human verification.
- `aria-hidden`: ISSUE where it is applied to logo graphics inside still-focusable logo links.
- Positive `tabindex`: none detected in the host DOM. The mobile menu uses `tabindex=0` on a generic div, which is a semantic issue even though it is not a positive tabindex.

## Responsive + Zoom/Reflow

At 1440, 1024, 390, and 320 CSS-pixel viewport widths, the document-level `scrollWidth` equaled `clientWidth`; no page-level horizontal scrollbar was reproduced. This is a positive containment result, not proof that all content reflows correctly. Internal clipping was reproduced at narrow widths: the trusted-by statement is positioned off the left edge and the logo track is much wider than its clipped container. Browser zoom at actual 200%/400% was not established in this run and remains human verification.

## Motion + Reduced Motion

The hero contains a Spline 3D iframe/canvas and the page also exposes a long-running logo-list animation in normal mode. With `prefers-reduced-motion: reduce`, the media query matched and the observed page animation list was empty. No flashing content was measured in this audit. A human should still verify the Spline experience, actual OS-level reduced-motion behavior, and whether motion inside third-party frames changes appropriately.

## Visual Accessibility

The dominant black/yellow visual system provides strong large-button contrast in the captured states, and the primary CTAs are large and visually distinct. The verified visual failure is the small muted-gold newsletter Privacy Policy link at 2.35:1 against white. Focus contrast, non-text contrast, forced-colors behavior, text-spacing overrides, and hover/focus overlays require human verification.

## Mobile Accessibility

The mobile layout provides a visible hamburger and a working menu state, but the control is a generic focusable div without role, name, or expanded state. The open menu visually presents Our Work, Capabilities, Company, Insights, and Book a call. At 390px the hero remains visually ambitious, but the trusted-by statement is visibly clipped; at 320px the DOM confirms the text is positioned at a negative x coordinate inside a clipped container. The fixed chat widget overlays lower-right content and needs a focus-obscuration and screen-reader interaction test.

## Human Verification Required

See [A11Y-HUMAN-TEST-PLAN.md](A11Y-HUMAN-TEST-PLAN.md). The highest-priority human checks are real screen-reader navigation, desktop/mobile menu announcements and focus return, actual 200%/400% zoom, focus visibility around the fixed chat widget, HubSpot form error/status announcements, and Spline/HubSpot iframe focus behavior.

## WCAG 2.2 AA Evidence Matrix

| Criterion | Status | Evidence / boundary |
| --- | --- | --- |
| 1.1.1 Non-text Content | ISSUE | Informative-looking logos/article images are predominantly empty-alt; see TS-A11Y-007. |
| 1.2.1–1.2.5 Time-based Media | NOT APPLICABLE / verify third-party frame | No page video/audio workflow was observed; Spline is interactive visual content, not a time-based media transcript case. |
| 1.3.1 Info and Relationships | ISSUE | Heading skips, duplicate/incomplete landmarks, and unclassified images. |
| 1.3.2 Meaningful Sequence | NEEDS HUMAN VERIFICATION | Verify linearized reading order across responsive variants and iframes. |
| 1.4.1 Use of Color | NEEDS HUMAN VERIFICATION | No concrete color-only failure was reproduced; verify logo/status meaning with a human tester. |
| 1.4.3 Contrast (Minimum) | ISSUE | Newsletter Privacy Policy link measured 2.35:1. |
| 1.4.4 Resize Text | NEEDS HUMAN VERIFICATION / ISSUE risk | Narrow CSS viewport reproduced clipping; actual 200%/400% zoom remains untested. |
| 1.4.10 Reflow | ISSUE | Trusted-by statement and logo content clip at 390/320px. |
| 1.4.11 Non-text Contrast | NEEDS HUMAN VERIFICATION | Check focus rings, icons, borders, and the Spline/canvas controls. |
| 1.4.12 Text Spacing | NEEDS HUMAN VERIFICATION | Apply spacing overrides and verify the newsletter, navigation, cards, and footer. |
| 1.4.13 Content on Hover or Focus | NEEDS HUMAN VERIFICATION / ISSUE risk | Desktop mega-menu content appears on hover; verify keyboard equivalent and dismissal. |
| 2.1.1 Keyboard | ISSUE | Desktop hover disclosures are not keyboard-reachable; mobile control lacks semantics despite working with Enter/Space in Chromium. |
| 2.1.2 No Keyboard Trap | PASS / positive evidence for host document | No trap reproduced in 90-Tab traces; third-party iframe focus still requires human testing. |
| 2.4.1 Bypass Blocks | ISSUE | Landmark structure is incomplete and duplicated; no reliable main region was found. |
| 2.4.2 Page Titled | PASS | Meaningful title present in all viewports. |
| 2.4.3 Focus Order | ISSUE / NEEDS HUMAN VERIFICATION | Visual desktop menu order does not match keyboard exposure; iframe and chat order need human testing. |
| 2.4.4 Link Purpose | ISSUE | Unnamed logo and Spline watermark links. |
| 2.4.6 Headings and Labels | ISSUE | H2-to-H4 skips; several custom controls lack labels. |
| 2.4.7 Focus Visible | NEEDS HUMAN VERIFICATION | Keyboard trace established focus movement, not visual ring quality. |
| 2.4.11 Focus Not Obscured | NEEDS HUMAN VERIFICATION | Fixed chat widget overlaps mobile content. |
| 2.5.3 Label in Name | NEEDS HUMAN VERIFICATION | Check visible labels against spoken names for custom menu/chat/form controls. |
| 2.5.8 Target Size | NEEDS HUMAN VERIFICATION | Primary CTAs are visually large; all icon and footer targets need measurement. |
| 3.3.1 Error Identification | NEEDS HUMAN VERIFICATION | Visible HubSpot required-field error text was captured after traversal; announcement and association were not established. |
| 3.3.2 Labels or Instructions | PASS / positive partial evidence | HubSpot fields expose First Name, Last Name, and Business Email labels in the accessibility tree. |
| 4.1.2 Name, Role, Value | ISSUE | Unnamed iframes/links and generic custom menu controls. |
| 4.1.3 Status Messages | NEEDS HUMAN VERIFICATION | Verify HubSpot validation and chat updates with a screen reader. |

## Conclusion

TribalScale preserves several accessibility fundamentals despite a highly visual landing page: meaningful document metadata, strong primary CTA naming, reduced-motion handling, and no reproduced host-document keyboard trap. The main gaps occur where the experience departs from native HTML—Framer-generated navigation disclosures, responsive variants, embedded Spline/HubSpot frames, and asset-heavy proof points. Fixing those semantic boundaries, the newsletter contrast failure, and the narrow-width clipping would materially improve the page without reducing its visual ambition.
