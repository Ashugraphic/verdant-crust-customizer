# Verdant Crust Customizer

Create a modern, responsive single-page web app for a gourmet pizza brand named "Slice & Crust".

Design & Aesthetic:

- Dark charcoal background with warm amber and pizza-orange accents.

- Premium typography, clean rounded cards, and smooth micro-interactions.

Key Sections & Features:

1. Header / Navbar:

   - Brand logo "Slice & Crust", links to Menu, Rate Chart, Offers, and a floating Cart Icon with live item count badge.

2. Hero Section:

   - Headline: "Freshly Baked, Delivered Hot"

   - Subheadline highlighting 100% vegetarian, stone-oven baked pizzas with slow-proofed dough and fresh mozzarella.

   - Primary CTA: "View Menu" and a promotional banner for coupon code "CRUST20" (20% off).

3. Interactive Pizza Menu (20 pure-veg items):

   - Filterable categories: All, Classic, Spicy, Cheese Burst, Chef's Special.

   - Each Pizza Card must include:

     - Placeholder high-quality pizza image, Veg indicator tag, Pizza name, description, tags.

     - Interactive Size Selector: Regular (7"), Medium (10"), Large (12") with dynamic price updates.

     - Crust Selection: Classic Pan, Thin Crust, Cheese Burst (+₹60).

     - Live dynamic price calculation on the "Add to Cart" button.

4. Dynamic Rate Chart:

   - Searchable table displaying all 20 pizzas with prices across Regular, Medium, and Large sizes.

5. Slide-Out Cart & Checkout Drawer:

   - Slide-in panel showing cart items, quantity increment/decrement, and item removal.

   - Coupon code input field: Applying "CRUST20" subtracts 20% from subtotal.

   - Real-time bill breakdown: Subtotal, Promo Discount, 5% GST, Delivery Fee (₹40, free over ₹500), and Final Total.

   - Demo checkout form: Name, Phone, Delivery Address, and a "Place Demo Order" button that displays an order confirmation modal with an estimated 30-minute delivery timer.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://verdant-crust-customizer.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1ce98837-e617-482a-b758-9e248086e1d4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
