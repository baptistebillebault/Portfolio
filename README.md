# Iris Halden — portfolio (Next.js)

A one-page portfolio for a digital-twin / real-to-sim-to-real engineer. It is built from the
Claude Design mockup "Portfolio v4 Digital Twin".

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

The page is prerendered as static HTML. Only the 3D figure and the contact form run on the client.

## Where things live

| File | What it holds |
| --- | --- |
| `lib/content.ts` | All copy: name, projects, skills, talks, links and captions. **Placeholder content: replace it here.** |
| `app/page.tsx` | The six sections (server component). |
| `components/TwinFigure.tsx` | Client component: the background figure, C1–C5 callouts, nav, caption, and the scroll-driven animation loop (`POSES` sets the pose for each section). |
| `components/RobotArm.tsx` | The CSS-3D arm (cuboids nested in joints). |
| `components/ContactForm.tsx` | The contact form. It opens a `mailto:` link; swap in an API route or form service. |
| `app/globals.css` | Design tokens (Classical design system, dark theme, Helvetica) and all styles. |

Sections are tracked by their `data-sec` attribute, in page order. That order must match
`POSES`, `sectionNames` and `captions`.
