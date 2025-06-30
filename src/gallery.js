document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = 0;

    function showLightbox(index) {
        currentIndex = index;
        document.getElementById('lightbox-img').src = galleryImages[currentIndex].src;
        document.getElementById('lightbox').style.display = 'flex';
    }

    galleryImages.forEach((img, idx) => {
        img.addEventListener('click', function() {
            showLightbox(idx);
        });
    });

    document.getElementById('lightbox-close').onclick = function() {
        document.getElementById('lightbox').style.display = 'none';
    };

    document.getElementById('lightbox').onclick = function(e) {
        if (e.target === this) this.style.display = 'none';
    };

    document.getElementById('lightbox-prev').onclick = function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentIndex);
    };

    document.getElementById('lightbox-next').onclick = function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showLightbox(currentIndex);
    };

    // Optional: Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                showLightbox(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                showLightbox(currentIndex);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
});