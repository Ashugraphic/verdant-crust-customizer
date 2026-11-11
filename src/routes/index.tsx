import { createFileRoute } from "@tanstack/react-router";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Menu } from "@/components/site/Menu";
import { FloatingCart, Navbar } from "@/components/site/Navbar";
import { Offers } from "@/components/site/Offers";
import { RateChart } from "@/components/site/RateChart";
import { CartProvider } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slice & Crust — Freshly Baked, Delivered Hot" },
      {
        name: "description",
        content:
          "20 gourmet, 100% vegetarian stone-oven pizzas with slow-proofed dough and fresh mozzarella. Use CRUST20 for 20% off.",
      },
      { property: "og:title", content: "Slice & Crust — Freshly Baked, Delivered Hot" },
      {
        property: "og:description",
        content: "Gourmet pure-veg pizzas, stone-oven baked and delivered in 30 minutes. 20% off with CRUST20.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <RateChart />
        <Offers />
      </main>
      <Footer />
      <FloatingCart />
      <CartDrawer />
    </CartProvider>
  );
}
