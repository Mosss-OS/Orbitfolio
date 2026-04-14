import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-foreground uppercase">
            Orbitfolio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-primary font-medium">
            About
          </a>
          <a href="/explore" className="text-sm text-foreground hover:text-primary transition-colors">
            Explore
          </a>
        </div>

        {/* Connect Wallet */}
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground border-l border-border pl-6 hover:text-primary transition-colors">
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
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <a href="/" className="block text-sm text-primary font-medium">About</a>
          <a href="/explore" className="block text-sm text-foreground">Explore</a>
          <button className="w-full text-left text-sm font-medium text-foreground border-t border-border pt-3">
            Connect Wallet
          </button>
        </div>
      )}
    </nav>
  );
}
