import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 serves only the qualities listed here. The studio site sets the
  // same pair; anything not listed 400s rather than falling back.
  images: { qualities: [75, 85] },

  /* `next dev` otherwise writes AGENTS.md and CLAUDE.md into the repo root on
     every run. Both are Next's own boilerplate, both are re-created after any
     deletion, and one of them contains an em dash, which this project's copy
     rules forbid and the dash check greps for. Turning the generator off is
     the only way to keep the tree clean and the check honest. */
  agentRules: false,
};

export default nextConfig;
