// Script.js
const imageInput =
    document.getElementById(
        "imageInput"
    );
const previewImage =
    document.getElementById(
        "previewImage"
    );
const brightnessRange =
    document.getElementById(
        "brightness"
    );
const contrastRange =
    document.getElementById("contrast");
const grayscaleRange =
    document.getElementById(
        "grayscale"
    );
const blurRange =
    document.getElementById("blur");
const sepiaRange =
    document.getElementById("sepia");
const hueRange =
    document.getElementById("hue");
const resetButton =
    document.getElementById("reset");
const saveButton =
    document.getElementById("save");

let currentImage = null;

imageInput.addEventListener(
    "change",
    (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader =
                new FileReader();
            reader.onload = (event) => {
                currentImage =
                    new Image();
                currentImage.src =
                    event.target.result;
                currentImage.onload =
                    () => {
                        previewImage.src =
                            currentImage.src;
                        resetFilters();
                    };
            };
            reader.readAsDataURL(file);
        }
    });

brightnessRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

contrastRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

grayscaleRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

blurRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

sepiaRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

hueRange.addEventListener(
    "input",
    () => {
        applyFilters();
    });

resetButton.addEventListener(
    "click",
    () => {
        resetFilters();
    });

saveButton.addEventListener(
    "click",
    () => {
        saveEditedImage();
    });

function applyFilters() {
    if (currentImage) {
        const brightnessValue =
            brightnessRange.value;
        const contrastValue =
            contrastRange.value;
        const grayscaleValue =
            grayscaleRange.value;
        const blurValue =
            blurRange.value;
        const sepiaValue =
            sepiaRange.value;
        const hueValue = hueRange.value;

        const filterValue = `brightness(${brightnessValue}%) 
                            contrast(${contrastValue}%) 
                            grayscale(${grayscaleValue}%) 
                            blur(${blurValue}px) 
                            sepia(${sepiaValue}%) 
                            hue-rotate(${hueValue}deg)`;
        previewImage.style.filter =
            filterValue;
    }
}

function resetFilters() {
    if (currentImage) {
        brightnessRange.value = 100;
        contrastRange.value = 100;
        grayscaleRange.value = 0;
        blurRange.value = 0;
        sepiaRange.value = 0;
        hueRange.value = 0;
        previewImage.style.filter =
            "none";
    }
}

function saveEditedImage() {
    if (currentImage) {
        const canvas =
            document.createElement(
                "canvas"
            );
        canvas.width =
            currentImage.width;
        canvas.height =
            currentImage.height;
        const context =
            canvas.getContext("2d");
        context.filter =
            previewImage.style.filter;
        context.drawImage(
            currentImage,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const link =
            document.createElement("a");
        link.href = canvas.toDataURL(
            "image/jpeg"
        );
        link.download =
            "edited_image.jpg";
        link.click();
    }
}