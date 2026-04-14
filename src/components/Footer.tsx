export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-10">
        <p className="text-xs text-muted-foreground">
          © Orbitfolio 2026 · <a href="#" className="hover:text-foreground transition-colors">Legal</a>
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}
