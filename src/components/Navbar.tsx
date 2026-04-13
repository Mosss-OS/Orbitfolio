import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Orbitfolio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </a>
        </div>

        {/* Connect Wallet */}
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-all px-4 py-2 rounded-lg">
          Connect Wallet
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3"
        >
          <a href="#features" className="block text-sm text-muted-foreground">About</a>
          <a href="/explore" className="block text-sm text-muted-foreground">Explore</a>
          <button className="w-full text-sm font-medium text-foreground border border-border px-4 py-2 rounded-lg">
            Connect Wallet
          </button>
        </motion.div>
      )}
    </nav>
  );
}
