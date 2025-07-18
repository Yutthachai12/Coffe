const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
let cartItems = [];

function updateCartCount() {
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQty;
  cartCount.style.display = totalQty > 0 ? 'block' : 'none';
}

function renderCart() {
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p>ตะกร้าว่างเปล่า</p>';
    cartTotalDiv.textContent = '';
    return;
  }
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cartItems.forEach(({ name, price, quantity }, index) => {
    total += price * quantity;
    const p = document.createElement('p');
    p.textContent = `${name} x${quantity} `;

    const spanPrice = document.createElement('span');
    spanPrice.textContent = `${price * quantity} บาท`;
    p.appendChild(spanPrice);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'ลบ';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => {
      cartItems.splice(index, 1);
      renderCart();
      updateCartCount();
    };
    p.appendChild(removeBtn);

    cartItemsDiv.appendChild(p);
  });
  cartTotalDiv.textContent = `รวม: ${total} บาท`;
}

// ใส่ event ให้ปุ่มสั่งซื้อ ในไฟล์ HTML ก็เหมือนเดิม
document.querySelectorAll('button[data-name]').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = parseInt(btn.getAttribute('data-price'), 10);
    const found = cartItems.find(item => item.name === name);
    if (found) {
      found.quantity++;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }
    updateCartCount();
    renderCart();
  });
});

cartIcon.addEventListener('click', () => {
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
});

closeCartBtn.addEventListener('click', () => {
  cartPopup.style.display = 'none';
});

updateCartCount();
