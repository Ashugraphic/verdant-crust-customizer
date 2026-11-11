import { Logo } from "./Navbar";
import { VegMark } from "./VegMark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center">
        <div className="space-y-2">
          <Logo />
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <VegMark className="size-3.5" /> 100% vegetarian kitchen · Stone-oven baked
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Slice &amp; Crust. Demo storefront — prices include no hidden charges.
        </p>
      </div>
    </footer>
  );
}
