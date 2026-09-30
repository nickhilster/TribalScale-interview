# TribalScale Landing Page — Human Accessibility Test Plan

This checklist covers results that browser inspection and automated tools cannot establish confidently. Test the live page at `https://www.tribalscale.com/` without relying on the axe output as a conformance verdict.

## Screen readers and landmarks

- [ ] Windows: NVDA and/or JAWS; macOS/iOS: VoiceOver.
- [ ] Confirm the page title and language.
- [ ] Navigate by landmarks. Confirm one usable main region and one footer/contentinfo; confirm duplicate responsive variants are not announced.
- [ ] Navigate by headings. Confirm the H1, section hierarchy, card relationships, and numeric statistics are understandable.
- [ ] Navigate by links and buttons. Confirm every spoken name matches the visible purpose, especially the logo, Search, Book a call, and article cards.

## Desktop navigation

- [ ] With the mouse unused, reach Our Work, Capabilities, and Company using Tab.
- [ ] Operate each disclosure with Enter and Space.
- [ ] Confirm the control announces its name, role, and expanded/collapsed state.
- [ ] Enter submenu links in a predictable order.
- [ ] Press Escape and confirm the menu closes and focus returns to its trigger.
- [ ] Confirm hover-only content has an equivalent keyboard path and is not lost on focus movement.

## Mobile navigation

- [ ] At 390px and 320px, focus the hamburger with a screen reader.
- [ ] Confirm it is announced as a button with a useful name and expanded/collapsed state.
- [ ] Open with Enter and Space; confirm focus moves to the menu content in a logical order.
- [ ] Close with the control and Escape if supported; confirm focus returns to the hamburger.
- [ ] Confirm menu items are not duplicated or hidden from the accessibility tree.

## Iframes, chat, and dynamic content

- [ ] Confirm the Spline iframe is named or intentionally hidden from assistive technology.
- [ ] Enter and exit the Spline browsing context without a focus trap or confusing context switch.
- [ ] Open the HubSpot chat widget. Confirm the welcome message, close control, conversation control, and any new messages are announced.
- [ ] Confirm focus is not obscured by the fixed chat widget on mobile and at the bottom of the page.
- [ ] Confirm dynamic chat status/messages use appropriate status semantics without interrupting unrelated reading.

## Newsletter form

- [ ] Confirm First Name, Last Name, and Business Email labels are announced with required state.
- [ ] Submit the empty form. Confirm focus placement, error identification, field association, and error announcement.
- [ ] Enter invalid email text and confirm the error is understandable and announced.
- [ ] Confirm the Privacy Policy link is reachable, readable, and has sufficient contrast in normal, hover, and focus states.
- [ ] Confirm successful submission feedback is announced without requiring visual inspection.

## Zoom, reflow, and visual modes

- [ ] Test actual browser zoom at 200% and 400% on desktop.
- [ ] Test a 320 CSS-pixel equivalent viewport.
- [ ] Confirm the trust statement is not clipped and that the customer-logo presentation does not hide information without an accessible alternative.
- [ ] Apply text-spacing overrides from WCAG 1.4.12 and confirm no content or controls are lost.
- [ ] Test Windows High Contrast/forced-colors mode and confirm text, borders, focus indicators, icons, and controls remain perceivable.
- [ ] Verify focus indicators are visible and not obscured by the fixed chat widget or sticky navigation.

## Motion and sensory access

- [ ] Enable the operating system reduced-motion preference and verify the Spline/hero and logo motion are reduced or stopped in the actual browser.
- [ ] Confirm no flashing content reaches three flashes per second or otherwise creates a seizure risk.
- [ ] Confirm meaning is not conveyed by color alone in logos, navigation states, form errors, or chat states.

## Evidence capture

- [ ] Record browser, assistive technology, version, viewport, zoom, and operating-system settings.
- [ ] For each failure, capture the exact spoken output, focused element, visible state, and steps to reproduce.
- [ ] Separate observations that reproduce across assistive technologies from technology-specific behavior.
