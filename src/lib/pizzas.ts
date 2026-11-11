import classic from "@/assets/pizza-classic.jpg";
import spicy from "@/assets/pizza-spicy.jpg";
import cheese from "@/assets/pizza-cheese.jpg";
import chef from "@/assets/pizza-chef.jpg";
import paneer from "@/assets/pizza-paneer.jpg";
import garden from "@/assets/pizza-garden.jpg";
import fourCheese from "@/assets/pizza-fourcheese.jpg";
import margherita from "@/assets/hero-pizza.jpg";
import type { PriceTable } from "./pricing";

export type Category = "Classic" | "Spicy" | "Cheese Burst" | "Chef's Special";
export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Classic",
  "Spicy",
  "Cheese Burst",
  "Chef's Special",
];

export type Pizza = {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  prices: PriceTable;
  image: string;
};

const p = (
  id: string,
  name: string,
  category: Category,
  description: string,
  tags: string[],
  [regular, medium, large]: [number, number, number],
  image: string,
): Pizza => ({ id, name, category, description, tags, prices: { regular, medium, large }, image });

export const PIZZAS: Pizza[] = [
  // Classic
  p("margherita", "Margherita Royale", "Classic", "San Marzano tomato, fior di latte mozzarella, torn basil and cold-pressed olive oil.", ["Bestseller", "Basil"], [199, 349, 469], margherita),
  p("farmhouse", "Farmhouse Harvest", "Classic", "Sweet corn, green capsicum, red onion and mushrooms on a herbed tomato base.", ["Loaded veg"], [229, 389, 519], classic),
  p("garden-fresh", "Garden Fresh", "Classic", "Spinach, cherry tomato, black olives and crumbled feta on thin, crisp dough.", ["Light", "Greens"], [239, 399, 529], garden),
  p("corn-capsicum", "Golden Corn & Capsicum", "Classic", "Buttery sweet corn and crunchy capsicum with oregano-flecked mozzarella.", ["Kids' pick"], [189, 329, 449], classic),
  p("veggie-supreme", "Veggie Supreme", "Classic", "Eight garden vegetables, house tomato sauce and a generous mozzarella blanket.", ["Hearty"], [249, 419, 559], classic),
  // Spicy
  p("peri-paneer", "Peri Peri Paneer", "Spicy", "Charred paneer, roasted red peppers and jalapeños with a fiery peri peri drizzle.", ["Hot", "Paneer"], [259, 429, 569], spicy),
  p("tandoori-paneer", "Tandoori Paneer Tikka", "Spicy", "Clay-oven paneer tikka, pickled onion, capsicum and a cool mint chutney swirl.", ["Desi", "Bestseller"], [269, 449, 589], paneer),
  p("mexican-fiesta", "Mexican Fiesta", "Spicy", "Jalapeños, black beans, sweet corn, onion and smoky chipotle salsa.", ["Smoky", "Hot"], [249, 419, 549], spicy),
  p("schezwan-inferno", "Schezwan Inferno", "Spicy", "Indo-Chinese schezwan sauce, spring onion, crispy babycorn and chilli flakes.", ["Extra hot"], [239, 399, 539], spicy),
  p("achari-delight", "Achari Delight", "Spicy", "Tangy pickle-spiced paneer, onion and green chilli with mustard oil finish.", ["Tangy", "Desi"], [249, 409, 549], paneer),
  // Cheese Burst
  p("four-cheese", "Quattro Formaggi", "Cheese Burst", "Mozzarella, aged cheddar, parmesan and gorgonzola melted to bubbling gold.", ["Cheesy", "Rich"], [299, 489, 639], fourCheese),
  p("cheese-volcano", "Cheese Volcano", "Cheese Burst", "Molten cheese-stuffed crust with mushroom, olive, corn and pepper topping.", ["Gooey", "Bestseller"], [289, 479, 629], cheese),
  p("double-cheese-margherita", "Double Cheese Margherita", "Cheese Burst", "Twice the mozzarella over our classic tomato base, finished with basil oil.", ["Cheesy"], [259, 429, 569], fourCheese),
  p("cheesy-mushroom", "Creamy Mushroom Melt", "Cheese Burst", "Garlic-sautéed button mushrooms in a cheddar-cream sauce under stretchy mozzarella.", ["Garlicky"], [279, 459, 599], cheese),
  p("paneer-makhani-burst", "Paneer Makhani Burst", "Cheese Burst", "Buttery makhani gravy, soft paneer and a cheese-flooded crust edge.", ["Desi", "Rich"], [299, 499, 649], paneer),
  // Chef's Special
  p("truffle-burrata", "Truffle Burrata", "Chef's Special", "Black truffle cream, wild mushrooms, arugula and a whole burrata at the centre.", ["Signature", "Premium"], [399, 649, 849], chef),
  p("pesto-primavera", "Pesto Primavera", "Chef's Special", "Basil-cashew pesto, zucchini, sun-dried tomato and shaved parmesan.", ["Herby"], [329, 539, 699], garden),
  p("fig-gorgonzola", "Fig & Gorgonzola", "Chef's Special", "Caramelised figs, gorgonzola, walnut crumble and a hot honey glaze.", ["Sweet & savoury"], [349, 579, 749], fourCheese),
  p("smoked-tandoori-veg", "Smoked Tandoori Garden", "Chef's Special", "Charcoal-smoked vegetables, tandoori mayo and coriander on stone-baked dough.", ["Smoky", "Desi"], [319, 529, 689], paneer),
  p("mediterranean-roast", "Mediterranean Roast", "Chef's Special", "Roasted aubergine, artichoke, kalamata olives, feta and za'atar oil.", ["Chef's pick"], [339, 559, 729], chef),
];
