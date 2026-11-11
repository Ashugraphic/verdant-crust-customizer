import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#rate-chart", label: "Rate Chart" },
  { href: "#offers", label: "Offers" },
];

export function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative flex size-9 items-center justify-center rounded-full bg-flame shadow-glow transition-transform duration-500 group-hover:rotate-[200deg]">
        <svg viewBox="0 0 24 24" className="size-5 fill-primary-foreground" aria-hidden>
          <path d="M12 2 3 20.5c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5L12 2Zm-2.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm.5-6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Slice <span className="text-flame">&amp;</span> Crust
      </span>
    </a>
  );
}

export function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "glass border-b border-border/60" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open cart, ${count} items`}
          className="relative flex size-11 items-center justify-center rounded-full border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-glow"
        >
          <ShoppingBag className="size-5" />
          {count > 0 && (
            <span
              key={count}
              className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-flame px-1 text-[11px] font-bold text-primary-foreground"
            >
              {count}
            </span>
          )}
        </button>
      </div>
      <nav className="flex justify-center gap-1 pb-2 md:hidden">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-accent-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function FloatingCart() {
  const { count, bill, setOpen, open } = useCart();
  if (count === 0 || open) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="fixed bottom-5 right-5 z-40 flex animate-in fade-in slide-in-from-bottom-4 items-center gap-3 rounded-full bg-flame py-2 pl-2 pr-5 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-1"
    >
      <span className="relative flex size-10 items-center justify-center rounded-full bg-background/20">
        <ShoppingBag className="size-5" />
        <span
          key={count}
          className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-background px-1 text-[11px] font-bold text-foreground"
        >
          {count}
        </span>
      </span>
      View cart · ₹{bill.total.toLocaleString("en-IN")}
    </button>
  );
}
