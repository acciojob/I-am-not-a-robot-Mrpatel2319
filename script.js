//your code here
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let selectedImages = [];
    let imageElements = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderImages() {
        imageContainer.innerHTML = '';
        selectedImages = [];
        para.textContent = '';
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';

        const randomIndex = Math.floor(Math.random() * images.length);
        const imagesToRender = [...images];
        imagesToRender.push(images[randomIndex]);
        shuffle(imagesToRender);

        imagesToRender.forEach((imgClass, index) => {
            const img = document.createElement('div');
            img.className = imgClass;
            img.dataset.index = index;
            img.addEventListener('click', handleImageClick);
            imageContainer.appendChild(img);
            imageElements.push(img);
        });
    }

    function handleImageClick(event) {
        const img = event.target;
        const index = img.dataset.index;

        if (!selectedImages.includes(index)) {
            selectedImages.push(index);
            img.style.border = '2px solid blue';

            if (selectedImages.length === 1) {
                resetButton.style.display = 'block';
            }

            if (selectedImages.length === 2) {
                verifyButton.style.display = 'block';
            }
        }
    }

    resetButton.addEventListener('click', () => {
        renderImages();
    });

    verifyButton.addEventListener('click', () => {
        verifyButton.style.display = 'none';
        const [firstIndex, secondIndex] = selectedImages;
        if (imageElements[firstIndex].className === imageElements[secondIndex].className) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
    });

    renderImages();
});