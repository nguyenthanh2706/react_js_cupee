<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CSS & SCSS Import Rules
- CSS/SCSS must use `@import` and MUST declare `./` + `filename.scss` for CSS to work properly (example: `@import './layout/variables.scss';`).
