document.addEventListener('DOMContentLoaded', function() {
    const carouselData = [
        { img: "../media/carousel/car1.jpg", title: "Wheels & Tires" },
        { img: "../media/carousel/car2.jpg", title: "Custom Tinting" },
        { img: "../media/carousel/car3.jpg", title: "Custom Tinting" },
        { img: "../media/carousel/car4.jpg", title: "Paint Protection Film (PPF)" }
    ];
    let current = 0;
    const img = document.getElementById('carousel-img');
    const title = document.getElementById('carousel-title');
    document.getElementById('prevBtn').onclick = () => {
        current = (current - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    };
    document.getElementById('nextBtn').onclick = () => {
        current = (current + 1) % carouselData.length;
        updateCarousel();
    };
    function updateCarousel() {
        img.src = carouselData[current].img;
        img.alt = carouselData[current].title;
        title.textContent = carouselData[current].title;
    }
    // Auto-rotate every 3 seconds
    setInterval(() => {
        current = (current + 1) % carouselData.length;
        updateCarousel();
    }, 3000);
    // Initialize carousel on load
    updateCarousel();
});

