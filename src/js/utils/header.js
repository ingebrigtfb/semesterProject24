import { logout } from "./logout.js";

const header = document.createElement("div");

// Header container
const container = document.createElement("div");
container.className =
  "max-w-7xl mx-auto flex justify-between items-center p-4 relative z-10";

// Logo
const logo = document.createElement("div");
logo.className = "logo flex-shrink-0";

const logoLink = document.createElement("a");
logoLink.href = "/";
logoLink.className = "block";

const logoImage = document.createElement("img");
logoImage.src = "/images/solgtLogo.webp";
logoImage.alt = "Solgt logo";
logoImage.className = "h-11";

logoLink.appendChild(logoImage);
logo.appendChild(logoLink);
container.appendChild(logo);

// Hamburger menu
const menu = document.createElement("div");
menu.className =
  "hamburger-menu flex flex-col justify-around h-7 md:hidden cursor-pointer";

for (let i = 0; i < 3; i++) {
  const line = document.createElement("div");
  line.className = "bg-black h-1 w-6 mb-1 transition-transform duration-300";
  menu.appendChild(line);
}

container.appendChild(menu);

// Dropdown menu
const dropdown = document.createElement("div");
dropdown.className =
  "dropdown-menu hidden md:flex flex-col md:flex-row mt-2 md:mt-0 bg-containers md:bg-transparent shadow-lg md:shadow-none rounded-lg p-4 md:p-0 absolute md:static left-0 w-full md:w-auto top-16 md:top-auto";

// Public options
const publicOptions = [{ text: "Hjem", href: "/" }];

// Private options
const privateOptions = [
  { text: "Min profil", href: "/profil/" },
  { text: "Lag ny annonse", href: "/lage/" },
];

const token = localStorage.getItem("token");

// Add public options to dropdown
publicOptions.forEach((option) => {
  const optionElement = document.createElement("a");
  optionElement.href = option.href;
  optionElement.className =
    "block px-4 py-2 text-black hover:underline rounded md:rounded-none";
  optionElement.textContent = option.text;
  dropdown.appendChild(optionElement);
});

// Add private options if token exists
if (token) {
  privateOptions.forEach((option) => {
    const optionElement = document.createElement("a");
    optionElement.href = option.href;
    optionElement.className =
      "block px-4 py-2 text-black hover:underline rounded md:rounded-none";
    optionElement.textContent = option.text;
    dropdown.appendChild(optionElement);
  });
}

// Add auth option (login/logout)
const authOption = document.createElement("a");
authOption.className =
  "block px-4 py-2 text-black hover:underline rounded md:rounded-none";

if (token) {
  authOption.textContent = "Logout";
  authOption.href = "#";
  authOption.addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });
} else {
  authOption.textContent = "Login/Registrer";
  authOption.href = "/auth/login/";
}

dropdown.appendChild(authOption);
container.appendChild(dropdown);

// Hamburger menu click event
menu.addEventListener("click", () => {
  dropdown.classList.toggle("hidden"); // Toggle dropdown visibility

  const lines = menu.querySelectorAll("div");
  // Animate lines for "X" effect
  lines[0].classList.toggle("translate-y-[9px]");
  lines[0].classList.toggle("rotate-45");

  lines[1].classList.toggle("opacity-0");

  lines[2].classList.toggle("-translate-y-[10px]");
  lines[2].classList.toggle("-rotate-45");
});

header.appendChild(container);

export default header;
