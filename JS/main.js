window.onload = () => {

    const imgUploadInput = document.querySelector('#imgUpload');
    const imageToModify = document.querySelector('#imageToModify');
    const imgCanvasHTML = document.querySelector('#imgCanvas');
    const filterInputGrayscale = document.querySelector('#filterGrayscale');
    const filterInputSepia = document.querySelector('#filterSepia');
    const filterInputContrast = document.querySelector('#filterContrast');
    const filterInputBrightness = document.querySelector('#filterBrightness');
    const filterInputInvert = document.querySelector('#filterInvert');
    const filterInputSaturate = document.querySelector('#filterSaturate');
    const grayscaleValue = document.querySelector('#grayscaleValue');
    const sepiaValue = document.querySelector('#sepiaValue');
    const contrastValue = document.querySelector('#contrastValue');
    const brightnessValue = document.querySelector('#brightnessValue');
    const invertValue = document.querySelector('#invertValue');
    const saturateValue = document.querySelector('#saturateValue');
    const downloadButtonLink = document.querySelector('#downloadButtonLink');


    function setEventListeners () {

        imgUploadInput.addEventListener('change', loadImg, false);
        imageToModify.addEventListener('load', imgCanvas, false);
        filterInputGrayscale.addEventListener('change', applyFilters);
        filterInputSepia.addEventListener('change', applyFilters);
        filterInputContrast.addEventListener('change', applyFilters);
        filterInputBrightness.addEventListener('change', applyFilters);
        filterInputInvert.addEventListener('change', applyFilters);
        filterInputSaturate.addEventListener('change', applyFilters);

    }

    function loadImg () {
        //if(!file) return;
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            imageToModify.src = e.target.result;
        };
        

        filterInputGrayscale.value = 0;
        filterInputSepia.value = 0;
        filterInputContrast.value = 100;
        filterInputBrightness.value = 100;
        filterInputInvert.value = 0;
        filterInputSaturate.value = 100;

        grayscaleValue.textContent = `${filterInputGrayscale.value} %`;
        sepiaValue.textContent = `${filterInputSepia.value} %`;
        contrastValue.textContent = `${filterInputContrast.value} %`;
        brightnessValue.textContent = `${filterInputBrightness.value} %`;
        invertValue.textContent = `${filterInputInvert.value} %`;
        saturateValue.textContent = `${filterInputSaturate.value} %`;
        
        reader.readAsDataURL(file);

    }

    function applyFilters () {
        if(!imageToModify) return;
        const context = imgCanvasHTML.getContext('2d');
        const filtersList = `grayscale(${filterInputGrayscale.value}%)
                            sepia(${filterInputSepia.value}%)
                            contrast(${filterInputContrast.value}%)
                            brightness(${filterInputBrightness.value}%)
                            invert(${filterInputInvert.value}%)
                            saturate(${filterInputSaturate.value}%)`;
        context.filter = filtersList;
        grayscaleValue.textContent = `${filterInputGrayscale.value} %`;
        sepiaValue.textContent = `${filterInputSepia.value} %`;
        contrastValue.textContent = `${filterInputContrast.value} %`;
        brightnessValue.textContent = `${filterInputBrightness.value} %`;
        invertValue.textContent = `${filterInputInvert.value} %`;
        saturateValue.textContent = `${filterInputSaturate.value} %`;
        imgCanvas();
        updateDownloadLink();
    }

    function imgCanvas () {
        console.log(imageToModify.naturalWidthwidth, imgCanvasHTML.width);
        if (imgCanvasHTML.width != imageToModify.naturalWidth){
            imgCanvasHTML.width = imageToModify.naturalWidth;
        }
        if (imgCanvasHTML.height != imageToModify.naturalHeight){
            imgCanvasHTML.height = imageToModify.naturalHeight;
        }
        const context = imgCanvasHTML.getContext('2d');
        //context.reset();
        context.drawImage(imageToModify, 0, 0, imageToModify.naturalWidth, imageToModify.naturalHeight);
    }

    function updateDownloadLink () {
        imgCanvasHTML.toBlob((blob) => {
            const downloadURL = URL.createObjectURL(blob);
            downloadButtonLink.href = downloadURL;
        });
    }

    setEventListeners();
}