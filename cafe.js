/* =========================================================
   ROAST & RYE – script.js
   1. Data  2. Helpers  3. Menu  4. Cart  5. Navigation  6. Start
   ========================================================= */

/* ---------- 1. DATA ---------- */

// Build a photo URL from an Unsplash photo ID. To change a photo, change the ID in MENU below.
const photoUrl = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`;

// Shown automatically if any image fails to load.
const FALLBACK_IMG = 'data:image/svg+xml,' + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450'><rect width='600' height='450' fill='#eddfc8'/>" +
  "<path d='M230 190h140v70a70 70 0 0 1-70 70 70 70 0 0 1-70-70z' fill='#b9803d'/>" +
  "<path d='M370 205h25a25 25 0 0 1 0 50h-25' fill='none' stroke='#b9803d' stroke-width='14'/>" +
  "<text x='300' y='385' text-anchor='middle' font-family='Georgia' font-size='28' fill='#34200f'>Roast & Rye</text></svg>"
);

// Option lists: [label, extra price in ₹]. The item's last value picks which list it uses.
const OPTION_SETS = {
  size:   [['Small', 0], ['Medium', 30], ['Large', 60]],
  cheese: [['Regular', 0], ['Extra cheese', 30]],
  icecream: [['Plain', 0], ['With ice cream', 40]]
};

// Each item: [category, name, price (₹), photo ID, description, option set (or '')]
const MENU_DATA = [
  // Hot Coffee
  ['hot', 'Espresso', 100, '1510707577719-ae7c14805e3a', 'A bold single shot with a golden crema.', ''],
  ['hot', 'Double Espresso', 130, '1511920170033-f8396924c348', 'Two shots of our house roast, deep and rich.', ''],
  ['hot', 'Americano', 140, '1509042239860-f550ce710b93', 'Espresso lengthened with hot water, smooth and clean.', 'size'],
  ['hot', 'Cappuccino', 170, '1572442388796-11668a67e53d', 'Espresso, steamed milk and a thick velvety foam.', 'size'],
  ['hot', 'Cafe Latte', 180, '1461023058943-07fcbe16d735', 'Silky steamed milk over a gentle espresso base.', 'size'],
  ['hot', 'Flat White', 190, '1514432324607-a09d9b4aefdd', 'Double ristretto with thin, glossy microfoam.', 'size'],
  ['hot', 'Mocha', 210, '1578314675249-a6910f80cc4e', 'Espresso, dark chocolate and steamed milk.', 'size'],
  ['hot', 'Caramel Macchiato', 220, '1485808191679-5f86510681a2', 'Vanilla milk, espresso and a caramel drizzle.', 'size'],
  // Cold Coffee & Iced Drinks
  ['cold', 'Classic Iced Coffee', 180, '1517701604599-bb29b565090c', 'Chilled coffee over ice with a touch of cream.', 'size'],
  ['cold', 'Iced Americano', 150, '1461023058943-07fcbe16d735', 'Espresso poured over ice and cold water.', 'size'],
  ['cold', 'Iced Latte', 190, '1517701550927-30cf4ba1dba5', 'Cold milk and espresso over ice.', 'size'],
  ['cold', 'Iced Mocha', 220, '1553909489-cd47e0907980', 'Chocolate, espresso and milk, served cold.', 'size'],
  ['cold', 'Caramel Frappe', 240, '1572490122747-3968b75cc699', 'Blended coffee, ice and caramel with whipped cream.', 'size'],
  ['cold', 'Chocolate Frappe', 230, '1577805947697-89e18249d767', 'Thick chocolate frappe finished with cocoa.', 'size'],
  ['cold', 'Vietnamese Iced Coffee', 210, '1578314675249-a6910f80cc4e', 'Strong coffee sweetened with condensed milk.', 'size'],
  ['cold', 'Cold Brew', 200, '1517701604599-bb29b565090c', 'Steeped for 18 hours, naturally smooth.', 'size'],
  // Tea & Other Beverages
  ['tea', 'Masala Chai', 90, '1561336313-0bd5e0b27ec8', 'Assam tea simmered with ginger and spices.', 'size'],
  ['tea', 'English Breakfast Tea', 120, '1556679343-c7306c1976bc', 'A classic robust black tea, served hot.', 'size'],
  ['tea', 'Green Tea', 110, '1564890369478-c89ca6d9cde9', 'Light, fresh and gently grassy.', 'size'],
  ['tea', 'Lemon Iced Tea', 140, '1556679343-c7306c1976bc', 'Black tea shaken with lemon and ice.', 'size'],
  ['tea', 'Peach Iced Tea', 160, '1499638673689-79a0b5115d87', 'Sweet peach and chilled black tea.', 'size'],
  ['tea', 'Hot Chocolate', 180, '1542990253-0d0f5be5f0ed', 'Rich cocoa and steamed milk, the comfort classic.', 'size'],
  ['tea', 'Matcha Latte', 220, '1515823064-d6e0c04616a7', 'Whisked matcha with steamed milk.', 'size'],
  ['tea', 'Iced Matcha Latte', 240, '1536256263959-770b48d82b0a', 'Matcha poured over cold milk and ice.', 'size'],
  // Bakery & Desserts
  ['bakery', 'Butter Croissant', 130, '1555507036-ab1f4038808a', 'Flaky, golden and baked fresh each morning.', ''],
  ['bakery', 'Chocolate Croissant', 160, '1530610476181-d83430b64dcd', 'Buttery layers around dark chocolate.', ''],
  ['bakery', 'Blueberry Muffin', 140, '1607958996333-41aef7caefaa', 'Soft crumb studded with blueberries.', ''],
  ['bakery', 'Chocolate Brownie', 160, '1606313564200-e75d5e30476c', 'Fudgy, dense and deeply chocolatey.', 'icecream'],
  ['bakery', 'Classic Cheesecake', 220, '1533134242443-d4fd215305ad', 'Creamy baked cheesecake on a biscuit base.', ''],
  ['bakery', 'Chocolate Lava Cake', 200, '1624353365286-3f8d62daad51', 'Warm cake with a molten chocolate centre.', 'icecream'],
  ['bakery', 'Tiramisu', 240, '1571877227200-a0d98ea607e9', 'Coffee-soaked layers with mascarpone cream.', ''],
  ['bakery', 'Cinnamon Roll', 170, '1509365465985-25d11c17e812', 'Soft roll, cinnamon sugar and vanilla glaze.', ''],
  // Snacks & Savoury
  ['snacks', 'Classic Veg Sandwich', 160, '1528735602780-2552fd46c7af', 'Fresh vegetables and herb spread on toasted bread.', 'cheese'],
  ['snacks', 'Grilled Cheese Sandwich', 190, '1528736235302-52922df5c122', 'Golden, crisp and gooey with melted cheese.', 'cheese'],
  ['snacks', 'Paneer Tikka Sandwich', 210, '1553909489-cd47e0907980', 'Spiced paneer, onions and mint chutney.', 'cheese'],
  ['snacks', 'Margherita Pizza', 250, '1565299624946-b28f40a0ae38', 'Tomato, mozzarella and basil on a thin crust.', 'cheese'],
  ['snacks', 'Peri Peri Fries', 150, '1573080496219-bb080dd4f877', 'Crisp fries tossed in peri peri seasoning.', 'cheese'],
  ['snacks', 'Loaded Nachos', 220, '1513456852971-30c0b8199d4d', 'Corn chips, salsa, beans and melted cheese.', 'cheese'],
  ['snacks', 'White Sauce Pasta', 240, '1621996346565-e3dbc646d9a9', 'Penne in a creamy garlic white sauce.', 'cheese'],
  ['snacks', 'Garlic Bread', 140, '1573140247632-f8fd74997d5c', 'Toasted baguette with garlic butter and herbs.', 'cheese'],
  // Breakfast & All-Day Meals
  ['meals', 'Classic Pancakes', 220, '1567620905732-2d1ec7ab7445', 'Fluffy stack with butter and maple syrup.', 'icecream'],
  ['meals', 'Chocolate Waffles', 230, '1562376552-0d160a2f238d', 'Crisp waffles with chocolate sauce.', 'icecream'],
  ['meals', 'French Toast', 210, '1484723091739-30a097e8f929', 'Cinnamon egg bread with honey and fruit.', 'icecream'],
  ['meals', 'Veggie Omelette', 180, '1525351484163-7529414344d8', 'Three-egg omelette with peppers and herbs.', 'cheese'],
  ['meals', 'English Breakfast Plate', 280, '1533089860892-a7c6f0a88666', 'Eggs, toast, beans, grilled tomato and sausage.', '']
];

// Turn each row into an object with a unique id (its position in the list)
const MENU = MENU_DATA.map(([category, name, price, photo, description, optionSet], id) => (
  { id, category, name, price, photo, description, optionSet }
));

/* ---------- 2. HELPERS ---------- */

const CART_KEY = 'roastAndRyeCart';
const formatPrice = (amount) => '₹' + Math.round(amount);
const getOptions = (item) => OPTION_SETS[item.optionSet] || null;
const $ = (selector) => document.querySelector(selector);

let activeCategory = 'all';
let searchText = '';
let cart = loadCart();

// If any image fails to load, swap in the fallback picture
function useFallbackImage(img) {
  if (!img.dataset.fallbackUsed) {
    img.dataset.fallbackUsed = 'true';
    img.src = FALLBACK_IMG;
  }
}
document.addEventListener('error', (event) => {
  if (event.target.tagName === 'IMG') useFallbackImage(event.target);
}, true); // "true" lets us catch image errors, which do not bubble
document.querySelectorAll('img').forEach((img) => {
  if (img.complete && img.naturalWidth === 0) useFallbackImage(img);
});

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

/* ---------- 3. MENU: render, filter, search ---------- */

function renderMenu() {
  const term = searchText.trim().toLowerCase();
  const visible = MENU.filter((item) => {
    const inCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term);
    return inCategory && matchesSearch;
  });

  $('#menuGrid').innerHTML = visible.map((item) => {
    const options = getOptions(item);
    const select = options
      ? `<select class="size-select" aria-label="Choose option for ${item.name}">
          ${options.map(([label, extra], index) =>
            `<option value="${index}">${label} – ${formatPrice(item.price + extra)}</option>`).join('')}
         </select>`
      : '';
    return `
      <article class="card" data-id="${item.id}">
        <div class="card-img"><img src="${photoUrl(item.photo)}" alt="${item.name}" loading="lazy"></div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="card-foot">
            <strong class="price">${formatPrice(item.price)}</strong>
            ${select}
            <button class="btn btn-primary btn-sm" data-add>Add to Cart</button>
          </div>
        </div>
      </article>`;
  }).join('');

  $('#menuEmpty').hidden = visible.length > 0;
}

// Category buttons
$('#menuFilters').addEventListener('click', (event) => {
  const button = event.target.closest('.filter-btn');
  if (!button) return;
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  button.classList.add('active');
  activeCategory = button.dataset.filter;
  renderMenu();
});

// Search box
$('#menuSearch').addEventListener('input', (event) => {
  searchText = event.target.value;
  renderMenu();
});

// Cards: one listener on the grid handles every "Add to Cart" button and size dropdown
$('#menuGrid').addEventListener('click', (event) => {
  if (!event.target.closest('[data-add]')) return;
  const card = event.target.closest('.card');
  const select = card.querySelector('.size-select');
  addToCart(Number(card.dataset.id), select ? Number(select.value) : 0);
});

$('#menuGrid').addEventListener('change', (event) => {
  if (!event.target.matches('.size-select')) return;
  const card = event.target.closest('.card');
  const item = MENU[Number(card.dataset.id)];
  const extra = getOptions(item)[Number(event.target.value)][1];
  card.querySelector('.price').textContent = formatPrice(item.price + extra);
});

// Specials buttons add the item by name (first option, e.g. Small)
document.querySelectorAll('[data-special]').forEach((button) => {
  button.addEventListener('click', () => {
    const item = MENU.find((menuItem) => menuItem.name === button.dataset.special);
    if (item) addToCart(item.id, 0);
  });
});

/* ---------- 4. CART ---------- */

// localStorage only stores text, so we convert the cart array to/from JSON.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return []; // storage blocked or data broken: start with an empty cart
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('Could not save cart:', error);
  }
}

function addToCart(itemId, optionIndex) {
  const item = MENU[itemId];
  const options = getOptions(item);
  const label = options ? options[optionIndex][0] : '';
  const unitPrice = item.price + (options ? options[optionIndex][1] : 0);
  const key = `${itemId}-${label}`; // same item + same option = same cart line

  const existing = cart.find((line) => line.key === key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ key, name: item.name, label, unitPrice, photo: item.photo, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast(`${item.name}${label ? ' (' + label + ')' : ''} added to cart`);
  const badge = $('#cartCount');
  badge.classList.remove('bump');
  void badge.offsetWidth; // restart the animation
  badge.classList.add('bump');
}

function changeQuantity(key, change) {
  const line = cart.find((entry) => entry.key === key);
  if (!line) return;
  line.quantity += change;
  if (line.quantity <= 0) cart = cart.filter((entry) => entry.key !== key);
  saveCart();
  renderCart();
}

function removeFromCart(key) {
  cart = cart.filter((entry) => entry.key !== key);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const tax = subtotal * 0.05;

  $('#cartCount').textContent = itemCount;
  $('#cartFoot').hidden = cart.length === 0;

  $('#cartItems').innerHTML = cart.length === 0
    ? '<li class="cart-empty">Your cart is empty.<br>Add something delicious from the menu.</li>'
    : cart.map((line) => `
      <li class="cart-item">
        <img src="${photoUrl(line.photo)}" alt="${line.name}">
        <div>
          <h4>${line.name}</h4>
          ${line.label ? `<small>${line.label}</small>` : ''}
          <small>${formatPrice(line.unitPrice)} each</small>
          <div class="qty">
            <button data-action="dec" data-key="${line.key}" aria-label="Decrease quantity">−</button>
            <span>${line.quantity}</span>
            <button data-action="inc" data-key="${line.key}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div>
          <strong>${formatPrice(line.unitPrice * line.quantity)}</strong><br>
          <button class="remove" data-action="remove" data-key="${line.key}" aria-label="Remove ${line.name}">Remove</button>
        </div>
      </li>`).join('');

  $('#cartSubtotal').textContent = formatPrice(subtotal);
  $('#cartTax').textContent = formatPrice(tax);
  $('#cartTotal').textContent = formatPrice(subtotal + tax);
}

$('#cartItems').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, key } = button.dataset;
  if (action === 'inc') changeQuantity(key, 1);
  if (action === 'dec') changeQuantity(key, -1);
  if (action === 'remove') removeFromCart(key);
});

$('#clearCart').addEventListener('click', clearCart);

// Open / close the cart drawer
function setCartOpen(isOpen) {
  $('#cartDrawer').classList.toggle('open', isOpen);
  $('#cartDrawer').setAttribute('aria-hidden', String(!isOpen));
  $('#overlay').classList.toggle('show', isOpen);
}
$('#cartBtn').addEventListener('click', () => setCartOpen(true));
$('#closeCart').addEventListener('click', () => setCartOpen(false));
$('#overlay').addEventListener('click', () => setCartOpen(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { setCartOpen(false); closeMobileMenu(); }
});

/* ---------- 5. NAVIGATION ---------- */

function closeMobileMenu() {
  $('#navLinks').classList.remove('open');
  $('#menuToggle').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded', 'false');
}

$('#menuToggle').addEventListener('click', () => {
  const isOpen = $('#navLinks').classList.toggle('open');
  $('#menuToggle').classList.toggle('open', isOpen);
  $('#menuToggle').setAttribute('aria-expanded', String(isOpen));
});

// Smooth scrolling is done in CSS (scroll-behavior). Here we just close the mobile menu after a tap.
$('#navLinks').addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMobileMenu();
});

// Add a shadow to the header once the page is scrolled
window.addEventListener('scroll', () => {
  $('#siteHeader').classList.toggle('scrolled', window.scrollY > 10);
});

/* ---------- 6. START ---------- */
renderMenu();
renderCart();

/* ---------- 7. CHECKOUT (demo payment: nothing is sent anywhere) ---------- */

const checkoutModal = $('#checkoutModal');
const checkoutForm = $('#checkoutForm');
const payBtn = $('#payBtn');

const getCartTotal = () => cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0) * 1.05; // incl. 5% GST
const getPayMethod = () => checkoutForm.payMethod.value;

// The button text follows the chosen payment method; UPI shows an extra field
function updatePayUI() {
  const method = getPayMethod();
  $('#upiRow').hidden = method !== 'upi';
  payBtn.textContent = method === 'counter' ? 'Place Order' : `Pay ${formatPrice(getCartTotal())} (demo)`;
}

function openCheckout() {
  if (cart.length === 0) return;
  setCartOpen(false);
  checkoutForm.hidden = false;
  $('#orderDone').hidden = true;
  $('#coError').textContent = '';
  payBtn.disabled = false;
  updatePayUI();
  checkoutModal.hidden = false;
  $('#coName').focus();
}

function closeCheckout() {
  checkoutModal.hidden = true;
}

function completeOrder(name, orderType, method) {
  const total = getCartTotal();
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const methodText = { counter: 'pay at counter', upi: 'UPI (demo)', card: 'card (demo)' }[method];

  $('#doneName').textContent = name;
  $('#doneId').textContent = 'RR-' + Math.floor(1000 + Math.random() * 9000);
  $('#doneSummary').textContent = `${itemCount} item(s), ${formatPrice(total)}, ${orderType}, ${methodText}. This is a demo order, so nothing will be prepared.`;
  checkoutForm.hidden = true;
  $('#orderDone').hidden = false;
  clearCart(); // empties the cart and saves it
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = $('#coName').value.trim();
  const phone = $('#coPhone').value.trim();
  const method = getPayMethod();
  const errorBox = $('#coError');

  if (name.length < 2) { errorBox.textContent = 'Please enter your name.'; return; }
  if (!/^[6-9]\d{9}$/.test(phone)) { errorBox.textContent = 'Enter a valid 10-digit mobile number.'; return; }
  if (method === 'upi' && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test($('#coUpi').value.trim())) {
    errorBox.textContent = 'Enter a valid UPI ID, like name@bank.';
    return;
  }

  errorBox.textContent = '';
  const orderType = checkoutForm.orderType.value;
  if (method === 'counter') { completeOrder(name, orderType, method); return; }

  // Pretend to process the payment for 1.5 seconds
  payBtn.disabled = true;
  payBtn.textContent = 'Processing...';
  setTimeout(() => completeOrder(name, orderType, method), 1500);
});

checkoutForm.addEventListener('change', (event) => {
  if (event.target.name === 'payMethod') updatePayUI();
});
$('#checkoutBtn').addEventListener('click', openCheckout);
$('#closeCheckout').addEventListener('click', closeCheckout);
$('#doneClose').addEventListener('click', () => { closeCheckout(); location.hash = '#menu'; });
checkoutModal.addEventListener('click', (event) => { if (event.target === checkoutModal) closeCheckout(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCheckout(); });