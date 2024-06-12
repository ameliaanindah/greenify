const ongkir = 5000; // Shipping cost
const diskon = 10000; // Discount

function keranjangFormatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function keranjangIncreaseQuantity(button) {
    const input = button.closest('.quantity').querySelector("input[type='text']");
    let quantity = parseInt(input.value);
    input.value = quantity + 1;

    // Mengupdate total harga
    keranjangUpdateTotalPrice(input);
}

function keranjangDecreaseQuantity(button) {
    const input = button.closest('.quantity').querySelector("input[type='text']");
    let quantity = parseInt(input.value);
    if (quantity > 1) {
        input.value = quantity - 1;

        // Mengupdate total harga
        keranjangUpdateTotalPrice(input);
    }
}

function keranjangUpdateTotalPrice(input) {
    const priceCell = input.parentElement.parentElement.previousElementSibling;
    const price = parseFloat(priceCell.textContent.replace("Rp ", "").replace(/\./g, ""));
    const quantity = parseInt(input.value);
    const totalCell = input.parentElement.parentElement.nextElementSibling;
    const total = price * quantity;
    totalCell.textContent = "Rp " + keranjangFormatNumber(total);

    // Memperbarui total jumlah ketika kuantitas diubah
    keranjangUpdateCartTotals();
}

function keranjangUpdateCartTotals() {
    const cartRows = document.querySelectorAll(".cart-item");
    let subtotal = 0;

    cartRows.forEach(row => {
        const priceCell = row.querySelector(".price");
        const price = parseFloat(priceCell.textContent.replace("Rp ", "").replace(/\./g, ""));
        const quantityElement = row.querySelector(".quantity input");
        const quantity = parseInt(quantityElement.value);
        subtotal += price * quantity;
    });

    const total = subtotal + ongkir - diskon; // Menghitung total berdasarkan subtotal, diskon, dan biaya pengiriman

    // Memperbarui subtotal dan total di keranjang
    document.querySelector("#keranjang-subtotal").textContent = "Rp " + keranjangFormatNumber(subtotal);
    document.querySelector("#keranjang-total").textContent = "Rp " + keranjangFormatNumber(total);
}

function keranjangDisplayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.querySelector('.keranjang-cart-list');
    cartList.innerHTML = ''; // Clear existing items

    cart.forEach(product => {
        const cartItem = document.createElement('div');

        cartItem.classList.add('cart-item', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-center', 'mb-4');
        cartItem.innerHTML = `
            <div class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></div>
            <div class="image-prod mr-md-3 mb-3 mb-md-0">
                <div class="img" style="background-image:url(${product.image}); width: 100px; height: 100px; background-size: cover; background-position: center;"></div>
            </div>
            <div class="product-details text-center text-md-left">
                <h5>${product.name}</h5>
                <p>${product.description}</p>
            </div>
            <div class="price text-center text-md-left" style="margin-bottom: 1em;">Rp ${keranjangFormatNumber(product.price)}</div>
            <div class="quantity d-flex justify-content-center justify-content-md-start" style="margin-top: 1em;">
                <div class="input-group mb-3">
                    <span class="input-group-btn mr-2">
                        <button type="button" class="quantity-left-minus btn" data-type="minus" data-field="">
                            <i class="ion-ios-remove"></i>
                        </button>
                    </span>
                    <input type="text" name="quantity" class="form-control input-number" value="${product.quantity}" min="1" max="100">
                    <span class="input-group-btn ml-2">
                        <button type="button" class="quantity-right-plus btn" data-type="plus" data-field="">
                            <i class="ion-ios-add"></i>
                        </button>
                    </span>
                </div>
            </div>
            <div class="total text-center text-md-left">Rp ${keranjangFormatNumber(product.price * product.quantity)}</div>
        `;

        cartList.appendChild(cartItem);

        // Menambahkan event listener untuk tombol tambah dan kurang
        cartItem.querySelector('.quantity-right-plus').addEventListener('click', function() {
            keranjangIncreaseQuantity(this);
        });

        cartItem.querySelector('.quantity-left-minus').addEventListener('click', function() {
            keranjangDecreaseQuantity(this);
        });
    });

    // Mengupdate total jumlah saat pertama kali memuat keranjang
    keranjangUpdateCartTotals();
}

// Panggil fungsi untuk menampilkan keranjang saat halaman dimuat
window.onload = function() {
    keranjangDisplayCart();
};
