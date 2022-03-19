let fgCanvas = document.getElementById("fgcan");
let bgCanvas = document.getElementById("bgcan");

let file = document.getElementById("fgfile");
let file2 = document.getElementById("bgfile");

let finalCanvas = document.getElementById("final");

let greenThreshold = 240;

fgImage=null;
bgImage=null;


function loadForegroundImage() {
    fgCanvas.style.display="block";
    fgImage = new SimpleImage(file);
    fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
    bgCanvas.style.display="block";
    bgImage = new SimpleImage(file2);
    bgImage.drawTo(bgCanvas);
}

function createComposite() {
    // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image

 
    var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());


    for (var pixel of fgImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (pixel.getGreen() > greenThreshold) {
            //pixel is green, use background
            var bgPixel = bgImage.getPixel(x, y);
            //   console.log(bgPixel);
            output.setPixel(x, y, bgPixel);
        }
        else {
            //pixel is not green, use foreground
            output.setPixel(x, y, pixel);
        }
    }
    return output;
    
}

function doGreenScreen() {
    fgCanvas.style.display="none";
    bgCanvas.style.display="none";
    finalCanvas.style.display = "block";
    //check that images are loaded
    if (fgImage == null || !fgImage.complete()) {
        alert("Foreground image not loaded");
    }
    if (bgImage == null || !bgImage.complete()) {
        alert("Background image not loaded");
    }
    
    clearCanvas();
    // call createComposite, which does green screen algorithm and returns a composite image
    let finalImage = createComposite();
    finalImage.drawTo(finalCanvas);

}

function clearCanvas() {
    Clear(fgCanvas);
    Clear(bgCanvas);
    Clear(finalCanvas);
    
    file.value = null;
    file2.value = null;
}

function Clear(canvas) {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}