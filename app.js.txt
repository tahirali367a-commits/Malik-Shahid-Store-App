// ملک شاہد ڈرائی فروٹ - اوریجنل ڈائریکٹ HD تصاویر اور ایڈوانسڈ آرڈرنگ فیچرز
const products = [
    {
        id: 1,
        nameUrdu: "مونگ پھلی",
        nameEnglish: "Roasted Peanuts",
        image: "https://images.unsplash.com/photo-1567892560267-2f3a8b4171d1?auto=format&fit=crop&w=800&q=80",
        units: ["1 پاؤ (250g)", "آدھا کلو (500g)", "1 کلو (1kg)", "2 کلو", "5 کلو"]
    },
    {
        id: 2,
        nameUrdu: "ابلا ہوا انڈا",
        nameEnglish: "Boiled Egg",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80",
        units: ["1 انڈا", "2 انڈے", "5 انڈے", "10 انڈے", "20 انڈے"]
    },
    {
        id: 3,
        nameUrdu: "بھنے ہوئے چنے",
        nameEnglish: "Roasted Black Chickpeas",
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
        units: ["1 پاؤ (250g)", "آدھا کلو (500g)", "1 کلو (1kg)", "2 کلو"]
    },
    {
        id: 4,
        nameUrdu: "چکوالی ریوڑی",
        nameEnglish: "Chakwal Til Rewri",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80",
        units: ["1 پاؤ (250g)", "آدھا کلو (500g)", "1 کلو (1kg)", "پیکٹ کے حساب سے"]
    },
    {
        id: 5,
        nameUrdu: "ٹانگری",
        nameEnglish: "Tangri Namkeen Snack",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80",
        units: ["1 پیکٹ", "2 پیکٹس", "5 پیکٹس", "10 پیکٹس", "باکس سپلائی"]
    }
];

const rollSamosaOnlineImage = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";

let cart = {};
let rollQtyIndex = 0;
const rollQuantitiesList = ["10 رول", "20 رول", "50 رول", "100 رول", "200 رول", "400 رول", "دکان ہول سیل بلک سپلائی"];
const ownerWhatsApp = "923493900367";

document.addEventListener("DOMContentLoaded", () => {
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
        let optionsHTML = product.units.map(unit => `<option value="${unit}">${unit}</option>`).join('');

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

            <div class="owner-badge-mini">
                <img src="malik-shahid-waris.jpg" alt="Owner" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><rect width=\'100%\' height=\'100%\' fill=\'%23ccc\'/></svg>';">
                <span>Malik Shahid Waris</span>
            </div>

            <div class="quantity-controls" style="margin: 10px 0; display: flex; flex-direction: column; gap: 5px;">
                <label style="font-size: 0.85rem; color: #00d4ff; font-weight: bold;">وزن / مقدار منتخب کریں:</label>
                <select id="select-unit-${product.id}" style="padding: 8px; border-radius: 8px; background: rgba(15, 23, 42, 0.9); color: white; border: 1px solid #00d4ff; font-weight: bold; cursor: pointer;">
                    ${optionsHTML}
                </select>
            </div>

            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒 کارٹ میں شامل کریں</button>
                <a href="#" class="product-whatsapp-btn" onclick="orderSingle(event, ${product.id})">💬 WhatsApp آرڈر</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateRollQty(change) {
    rollQtyIndex += change;
    if (rollQtyIndex < 0) rollQtyIndex = 0;
    if (rollQtyIndex >= rollQuantitiesList.length) rollQtyIndex = rollQuantitiesList.length - 1;
    
    const display = document.getElementById("roll-qty-display");
    if (display) {
        display.innerText = rollQuantitiesList[rollQtyIndex];
    }
}

function orderRollSamosa(event) {
    event.preventDefault();
    const selectedQtyText = rollQuantitiesList[rollQtyIndex];
    const customerName = prompt("براہ کرم اپنا نام درج کریں:", "محترم گاہک");
    if (!customerName) return;
    const customerAddress = prompt("براہ کرم اپنا پتہ یا دکان کا نام درج کریں:", "مقام / پتہ");
    if (!customerAddress) return;

    const message = `السلام علیکم ملک شاہد وارث صاحب!\n\nمجھے رول سموسوں کی ہول سیل سپلائی درکار ہے۔\n\n👤 نام: ${customerName}\n📍 پتہ/دکان: ${customerAddress}\n📦 مطلوبہ مقدار: ${selectedQtyText}\n\nبراہ کرم قیمت اور سپلائی کی تفصیلات بتا دیں۔ شکریہ!`;
    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const selectElem = document.getElementById(`select-unit-${productId}`);
    const selectedUnit = selectElem ? selectElem.value : "1 عدد";

    const cartKey = `${productId}-${selectedUnit}`;

    if (cart[cartKey]) {
        cart[cartKey].qtyCount += 1;
    } else {
        cart[cartKey] = {
            name: product.nameUrdu,
            nameEnglish: product.nameEnglish,
            unit: selectedUnit,
            qtyCount: 1
        };
    }
    updateCartCount();
    alert(`${product.nameUrdu} (${selectedUnit}) کارٹ میں شامل کر دیا گیا!`);
}

function updateCartCount() {
    let totalItems = 0;
    for (let key in cart) {
        totalItems += cart[key].qtyCount;
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
            <div style="margin-bottom: 8px;">
                <strong>${item.name}</strong> (${item.nameEnglish})<br>
                <small style="color: #00d4ff;">منتخب مقدار/وزن: ${item.unit} (تعداد: ${item.qtyCount})</small>
            </div>
            <button onclick="removeFromCart('${key}')" style="background:#ff4757; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">حذف کریں</button>
        `;
        list.appendChild(row);
    });
}

function removeFromCart(cartKey) {
    delete cart[cartKey];
    renderCartItems();
    updateCartCount();
}

function orderSingle(originEvent, productId) {
    originEvent.preventDefault();
    const product = products.find(p => p.id === productId);
    const selectElem = document.getElementById(`select-unit-${productId}`);
    const selectedUnit = selectElem ? selectElem.value : "1 عدد";

    const customerName = prompt("براہ کرم اپنا نام درج کریں:", "محترم گاہک");
    if (!customerName) return;
    const customerAddress = prompt("براہ کرم اپنا پتہ درج کریں:", "مقام / پتہ");
    if (!customerAddress) return;

    const message = `السلام علیکم ملک شاہد وارث صاحب!\n\nمجھے Malik Shahid Dry Fruit سے آرڈر منگوانا ہے۔\n\n👤 نام: ${customerName}\n📍 پتہ: ${customerAddress}\n\n📦 پروڈکٹ: ${product.nameUrdu} (${product.nameEnglish})\n⚖️ مقدار/وزن: ${selectedUnit}\n\nبراہ کرم اس کی قیمت اور دستیابی بتا دیں۔ شکریہ!`;
    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function sendCartToWhatsApp() {
    const keys = Object.keys(cart);
    if (keys.length === 0) {
        alert("کارٹ خالی ہے!");
        return;
    }

    const customerName = prompt("براہ کرم اپنا نام درج کریں:", "محترم گاہک");
    if (!customerName) return;
    const customerAddress = prompt("براہ کرم اپنا پتہ درج کریں:", "مقام / پتہ");
    if (!customerAddress) return;

    let message = `السلام علیکم ملک شاہد وارث صاحب!\n\nمیں Malik Shahid Dry Fruit سے یہ آرڈر کرنا چاہتا ہوں:\n\n👤 نام: ${customerName}\n📍 پتہ: ${customerAddress}\n\n--- آڈر کی تفصیلات ---\n`;
    
    keys.forEach(key => {
        const item = cart[key];
        message += `🔹 ${item.name} (${item.nameEnglish}) — مقدار/وزن: ${item.unit} (سیٹ: ${item.qtyCount})\n`;
    });

    message += "\nبراہ کرم کل قیمت اور دستیابی بتا دیں۔ شکریہ!";

    const url = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
