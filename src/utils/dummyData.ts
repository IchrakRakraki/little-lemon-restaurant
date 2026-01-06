import greekSalad from "../assets/images/greek_salad.jpg";
import bruschetta from "../assets/images/bruschetta.jpg";
import lemonDessert from "../assets/images/lemon_dessert.jpg";
import avatarSara from "../assets/images/testimonials/sara.jpg";
import avatarJon from "../assets/images/testimonials/jon-do.jpg";
import avatarElise from "../assets/images/testimonials/elise.jpg";
import avatarAsh from "../assets/images/testimonials/ash.jpg";

export const weekSpecials = [
  {
    id: 1,
    title: "Greek Salad",
    price: 12.99,
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    imgSrc: greekSalad,
    altText:
      "A fresh Greek salad with sliced cucumbers, tomatoes, red onions, Kalamata olives, and feta cheese, lightly drizzled with olive oil and sprinkled with herbs.",
  },
  {
    id: 2,
    title: "Bruschetta",
    price: 5.99,
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    imgSrc: bruschetta,
    altText:
      "Toasted slices of bread topped with diced tomatoes and onions, fresh basil, garlic, and a drizzle of olive oil.",
  },
  {
    id: 3,
    title: "Lemon Dessert",
    price: 5.0,
    description:
      "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    imgSrc: lemonDessert,
    altText:
      "A slice of lemon dessert on a white plate, topped with lemon drizzle and garnished with a small slice of lemon.",
  },
];

export const testimonials = [
  {
    id: 1,
    rating: 5,
    fullName: "Sara Lopez",
    userName: "Sara72",
    review: '"Seriously cannot stop thinking about the Turkish Mac n’ Cheese!!"',
    avatar: avatarSara,
  },
  {
    id: 2,
    rating: 5,
    fullName: "Jon Do",
    userName: "Johnny_utah",
    review: '"We had such a great time celebrating my grandmother’s birthday!"',
    avatar: avatarJon,
  },
  {
    id: 3,
    rating: 5,
    fullName: "Elise J.",
    userName: "EliJ",
    review: '"Best Feta Salad in town. Flawless everytime!"',
    avatar: avatarElise,
  },
  {
    id: 4,
    rating: 5,
    fullName: "Ash Smith",
    userName: "Ash_09",
    review: '"Such a chilled out atmosphere - love it!"',
    avatar: avatarAsh,
  },
];

export const occasionOptions: string[] = [
  "Birthday",
  "Anniversary",
  "Casual Dining",
  "Family Gathering",
  "Business Meeting",
];
