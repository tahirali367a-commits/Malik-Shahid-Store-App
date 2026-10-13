// آن لائن تازہ اور اسپیشل تصاویر کے لنکس کے ساتھ اپ ڈیٹ شدہ پروڈکٹ لسٹ
const products = [
    {
        id: 1,
        nameUrdu: "مونگ پھلی",
        nameEnglish: "Roasted Peanuts",
        image: "https://images.unsplash.com/photo-1567892560267-2f3a8b4171d1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nameUrdu: "ابلا ہوا انڈا",
        nameEnglish: "Boiled Egg",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nameUrdu: "بھنے ہوئے چنے",
        nameEnglish: "Roasted Chickpeas (Bhune Chane)",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nameUrdu: "چکوالی ریوڑی",
        nameEnglish: "Chakwal Rewri",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nameUrdu: "ٹانگری",
        nameEnglish: "Tangri Snack",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80"
    }
];

// رول سموسے کے لیے آن لائن تازہ تصویر کا لنک
const rollSamosaOnlineImage = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80";

let quantities = {};
let cart = {};
let rollQty = 10;
const ownerWhatsApp = "923493900367";

document.addEventListener("DOMContentLoaded", () => {
    products.forEach(p => { quantities[p.id] = 1; });

    renderProducts();
    setRollSamosaImage();

    const welcomeScreen = document.getElementById("welcome-screen");
    const mainApp = document.getElementById("main-app");
    const playBtn = document.getElementById("play-app-btn");
    const audioToggleBtn = document.getElementById("audio-toggle-btn");
    const welcomeAudio = document.getElementById("welcome-audio");

    playBtn.addEventListener("click", () => {
        welcomeAudio.play().catch(e => console.log("Audio autoplay blocked:", e));
        welcomeScreen.classList.add("hidden");
        mainApp.classList.remove("hidden");
    });

    audioToggleBtn.addEventListener("click", () => {
        if (welcomeAudio.paused) {
            welcomeAudio.play().catch(e => alert("welcome.mp3 فائل دستیاب نہیں ہے یا پلے نہیں ہو سکی۔"));
        } else {
            welcomeAudio.pause();
        }
    });

    const viewCartBtn = document.getElementById("view-cart-btn");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.getElementById("close-modal");
    const whatsappCheckoutBtn = document.getElementById("whatsapp-checkout-btn");

    viewCartBtn.addEventListener("click", () => {
        renderCartItems();
        cartModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    whatsappCheckoutBtn.addEventListener("click", () => {
        sendCartToWhatsApp();
    });
});

function setRollSamosaImage() {
    const rollImg = document.querySelector(".wholesale-img");
    if (rollImg) {
        rollImg.src = rollSamosaOnlineImage;
    }
}

function renderProducts() {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card glass-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.nameEnglish}" class="product-image" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'190\'><rect width=\'100%\' height=\'100%\' fill=\'%23eee\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%23888\' font-size=\'16\'>${product.nameEnglish}</text></svg>';">
            
            <div class="product-info-header">
                <div class="product-titles">
                    <h3>${product.nameUrdu}</h3>
                    <span>${product.nameEnglish}</span>
                </div>
                <div class="price-tag">قیمت واٹس ایپ پر معلوم کریں</div>
            </div>

            <div class="owner-badge">
                <img src="malik-shahid-waris.jpg" alt="Owner" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\'><rect width=\'100%\' height=\'100%\' fill=\'%23ccc\'/></svg>';">
                <span>Malik Shahid Waris</span>
            </div>

            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQty(${product.id}, -1)">-</button>
                <span class="qty-display" id="qty-${product.id}">${quantities[product.id]}</span>
                <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
            </div>

            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">کارٹ میں شامل کریں</button>
                <a href="#" class="product-whatsapp-btn" onclick="orderSingle(event, ${product.id})">💬 WhatsApp آرڈر</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateQty(productId, change) {
    quantities[productId] += change;
    if (quantities[productId] < 1) {
        quantities[productId] = 1;
    }
    const display = document.getElementById(`qty-${productId}`);
    if (display) {
        display.innerText = quantities[productId];
    }
}

function updateRollQty(change) {
    rollQty += change;
    if (rollQty < 1) {
        rollQty = 1;
    }
    const display = document.getElementById("roll-qty-display");
    if (display) {
        display.innerText = rollQty;
    }
}

function orderRollSamosa(event) {
    event.preventDefault();
    const message = `السلام علیکم ملک شاہد وارث صاحب! مجھے رول سموسوں کی سپلائی کے بارے میں معلومات چاہیے۔\n\nآرڈر کی قسم: دکان کے لیے سپلائی / عام آرڈر\nمطلوبہ مقدار: ${rollQty}\nبراہ کرم قیمت، مصنوعات کی حالت، دستیابی اور سپلائی کی تفصیلات بتا دیں۔\n\nشکریہ!`;
    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qty = quantities[productId];

    if (cart[productId]) {
        cart[productId].qty += qty;
    } else {
        cart[productId] = {
            name: product.nameUrdu,
            nameEnglish: product.nameEnglish,
            qty: qty
        };
    }
    updateCartCount();
    alert(`${product.nameUrdu} کارٹ میں شامل کر دیا گیا!`);
}

function updateCartCount() {
    let totalItems = 0;
    for (let key in cart) {
        totalItems += cart[key].qty;
    }
    document.getElementById("cart-count").innerText = totalItems;
}

function renderCartItems() {
    const list = document.getElementById("cart-items-list");
    list.innerHTML = "";

    const keys = Object.keys(cart);
    if (keys.length === 0) {
        list.innerHTML = "<p style='text-align:center; color:#666;'>آپ کا کارٹ خالی ہے۔</p>";
        return;
    }

    keys.forEach(key => {
        const item = cart[key];
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
            <div>
                <strong>${item.name}</strong> (${item.nameEnglish})<br>
                <small>مقدار: ${item.qty}</small>
            </div>
            <button onclick="removeFromCart(${key})" style="background:#ff4757; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">حذف کریں</button>
        `;
        list.appendChild(row);
    });
}

function removeFromCart(productId) {
    delete cart[productId];
    renderCartItems();
    updateCartCount();
}

function orderSingle(event, productId) {
    event.preventDefault();
    const product = products.find(p => p.id === productId);
    const qty = quantities[productId];

    const message = `السلام علیکم ملک شاہد وارث صاحب!\n\nمجھے Malik Shahid Dry Fruit سے یہ چیز منگوانی ہے۔\n\nپروڈکٹ: ${product.nameUrdu} (${product.nameEnglish})\nمقدار: ${qty}\n\nبراہ کرم اس کی قیمت اور دستیابی بتا دیں۔\n\nشکریہ!`;
    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function sendCartToWhatsApp() {
    const keys = Object.keys(cart);
    if (keys.length === 0) {
        alert("کارٹ خالی ہے!");
        return;
    }

    let message = "السلام علیکم ملک شاہد وارث صاحب!\n\nمیں Malik Shahid Dry Fruit سے یہ آرڈر کرنا چاہتا ہوں:\n\n";
    
    keys.forEach(key => {
        const item = cart[key];
        message += `- ${item.name} (${item.nameEnglish}) — مقدار: ${item.qty}\n`;
    });

    message += "\nبراہ کرم قیمت اور دستیابی بتا دیں۔\n\nشکریہ!";

    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
