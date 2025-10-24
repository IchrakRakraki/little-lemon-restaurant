type rangeDiners = { min: number; max: number };
type rangeTime = { min: string; max: string };
export const minMaxDiners: rangeDiners = { min: 1, max: 20 };
export const minMaxTime: rangeTime = { min: "12:00", max: "22:00" };

// Reservation error messages
export const timeErrorMsg = "Reservation time is required";
export const dinersErrorMsg: { min: string; max: string } = {
  min: `At least ${minMaxDiners.min} diner required`,
  max: `Maximum ${minMaxDiners.max} diners allowed`,
};
export const occasionErrorMsg = "Occasion is required";

// Contact error messages
export const firstNameErrorMsg = "First name is required";
export const lastNameErrorMsg = "Last name is required";
export const emailErrorMsg: { required: string; invalid: string } = {
  required: "Email is required",
  invalid: "Invalid email address",
};

// Top bar navigation links
type NavigationLink = { link: string; label: string };
export const navigationLinks: NavigationLink[] = [
  { link: "/#", label: "Home" },
  { link: "/#specials", label: "Menu" },
  { link: "/#about", label: "About" },
  { link: "/booking", label: "Reservations" },
  { link: "/#order", label: "Order Online" },
  // { link: "/login", label: "Login" },
];

export const footerNavigationLinks: {
  doormat: NavigationLink[];
  contact: NavigationLink[];
  social: NavigationLink[];
} = {
  doormat: navigationLinks,
  contact: [
    { link: "", label: "Address" },
    { link: "", label: "Phone Number" },
    { link: "", label: "Email" },
  ],
  social: [
    { link: "", label: "Tiktok" },
    { link: "", label: "Instagram" },
    { link: "", label: "Facebook" },
  ],
};
