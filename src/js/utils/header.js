// src/header.js
const header = document.createElement('div');

const container = document.createElement('div');
container.className = 'max-w-7xl mx-auto flex justify-between items-center p-4 relative';

const logo = document.createElement('div');
logo.className = 'logo flex-shrink-0';

const logoImage = document.createElement('img');
logoImage.src = '/images/solgtLogo.webp';
logoImage.alt = 'Solgt logo';
logoImage.className = 'h-11'; 
logo.appendChild(logoImage);

container.appendChild(logo);

const menu = document.createElement('div');
menu.className = 'hamburger-menu flex flex-col justify-around h-7 md:hidden cursor-pointer'; 

for (let i = 0; i < 3; i++) {
  const line = document.createElement('div');
  line.className = 'bg-black h-1 w-6 mb-1'; 
  menu.appendChild(line);
}

container.appendChild(menu);

const dropdown = document.createElement('div');
dropdown.className = 'dropdown-menu hidden md:flex flex-col md:flex-row mt-2 md:mt-0 bg-containers md:bg-transparent shadow-lg md:shadow-none rounded-lg p-4 md:p-0 absolute md:static left-0 w-full md:w-auto top-16 md:top-auto';

const options = [
    { text: 'Hjem', href: '/' },
    { text: 'Min profil', href: '/profile/' },
    { text: 'Login/Registrer', href: '/auth/login/' },
    { text: 'Lag ny annonse', href: '/new-ad' }
  ];

options.forEach(option => {
  const optionElement = document.createElement('a');
  optionElement.href = option.href;
  optionElement.className = 'block px-4 py-2 text-black hover:bg-gray-200 rounded md:rounded-none';
  optionElement.textContent = option.text;
  dropdown.appendChild(optionElement);
});

container.appendChild(dropdown);

menu.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

header.appendChild(container);

export default header;