var cart = [
    {
        name: 'Jagung',
        description: 'Jagung kami hadir dengan aroma segar dan cita rasa autentik',
        price: 8500,
        quantity: 1,
        image: 'images/product-1.jpg'
    },
    {
        name: 'Daging',
        description: 'Daging kami hadir dengan fresh dan cita rasa autentik',
        price: 8500,
        quantity: 1,
        image: 'images/product-5.jpg'
    },
    // Tambahkan item lainnya jika perlu
];

localStorage.setItem('cart', JSON.stringify(cart));
