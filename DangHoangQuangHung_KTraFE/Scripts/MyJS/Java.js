document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCountBadge = document.getElementById('cart-count');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const subtotalAmountLeft = document.getElementById('subtotal-amount-left');
    const totalQtyTexts = document.querySelectorAll('.total-qty-text');

    // Hàm cập nhật tổng số lượng và tổng tiền giỏ hàng
    function updateCartSummary() {
        let totalQuantity = 0;
        let totalPrice = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const checkbox = item.querySelector('.item-select');
            const qtyInput = item.querySelector('.qty-input');
            const itemPriceAttr = parseFloat(item.getAttribute('data-price'));

            if (checkbox && checkbox.checked) {
                const qty = parseInt(qtyInput.value) || 0;
                totalQuantity += qty;
                totalPrice += qty * itemPriceAttr;
            }
        });

        // Cập nhật số lượng trên icon Giỏ hàng (Navbar)
        cartCountBadge.textContent = totalQuantity;

        // Cập nhật tổng số lượng ở các vị trí Subtotal
        totalQtyTexts.forEach(el => {
            el.textContent = totalQuantity;
        });

        // Cập nhật tổng thành tiền
        const formattedTotal = totalPrice.toFixed(2);
        subtotalAmount.textContent = formattedTotal;
        if (subtotalAmountLeft) {
            subtotalAmountLeft.textContent = formattedTotal;
        }
    }

    // Gán sự kiện cho từng sản phẩm
    cartItems.forEach(item => {
        const unitPrice = parseFloat(item.getAttribute('data-price'));
        const qtyInput = item.querySelector('.qty-input');
        const btnMinus = item.querySelector('.btn-minus');
        const btnPlus = item.querySelector('.btn-plus');
        const itemTotalPriceEl = item.querySelector('.item-total-price');
        const checkbox = item.querySelector('.item-select');
        const btnDelete = item.querySelector('.btn-delete');

        // Hàm tính giá tiền cho từng mặt hàng riêng lẻ
        function updateItemPrice() {
            let qty = parseInt(qtyInput.value);
            if (isNaN(qty) || qty < 0) {
                qty = 0;
                qtyInput.value = 0;
            }
            const itemTotal = qty * unitPrice;
            itemTotalPriceEl.textContent = itemTotal.toFixed(2);
            updateCartSummary();
        }

        // Sự kiện nút Tăng (+)
        btnPlus.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value || 0) + 1;
            updateItemPrice();
        });

        // Sự kiện nút Giảm (-)
        btnMinus.addEventListener('click', () => {
            let currentQty = parseInt(qtyInput.value || 0);
            if (currentQty > 0) {
                qtyInput.value = currentQty - 1;
                updateItemPrice();
            }
        });

        // Sự kiện thay đổi số lượng trực tiếp trong input
        qtyInput.addEventListener('input', updateItemPrice);

        // Sự kiện chọn/bỏ chọn checkbox sản phẩm
        checkbox.addEventListener('change', updateCartSummary);

        // Nút Xóa sản phẩm
        btnDelete.addEventListener('click', () => {
            item.remove();
            updateCartSummary();
        });
    });

    // Khởi tạo tính toán ban đầu khi tải trang
    updateCartSummary();
});