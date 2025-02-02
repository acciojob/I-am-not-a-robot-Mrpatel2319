//your code here
const images = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5'
   ];

   function generateImages(){
    var selectedImageIndex = Math.floor(Math.random()*images.length); //1 , 4,2,3, 0,5
    var selectedImage = images[selectedImageIndex];
    var allImages = images.concat(selectedImage);
    var shuffledImages = allImages.sort(function(){
        return 0.5 - Math.random();
    });

    
    var imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    for(var index = 0; index < shuffledImages.length; index++){
        var imgClass = shuffledImages[index];
        var img = document.createElement('img');
        img.className = imgClass;
        img.dataset.index = index;
        img.addEventListener('click', handleImageClick);
        imageContainer.appendChild(img);
    }
   }

   let firstClick = null;
   let secondClick = null;

   function handleImageClick(event){
    const clickedImage = event.target;
    if(firstClick == clickedImage || secondClick == clickedImage ) return;

    document.getElementById('reset').style.display = 'block';

    if(!firstClick) {
        firstClick = clickedImage;
        clickedImage.classList.add('selected');
    }else if(!secondClick){
        secondClick = clickedImage;
        clickedImage.classList.add('selected');
        document.getElementById('verify').style.display = 'block';
    }

    
   }

   function reset(){
    firstClick = null;
    secondClick = null;
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').style.display = 'none';
    document.getElementById('image-container').innerHTML = '';
    generateImages();
   }

   function verify(){
    if(firstClick && secondClick){
        if(firstClick.src === secondClick.src){
            document.getElementById('para').innerHTML = 'Verified';

        }else{
            document.getElementById('para').innerHTML = 'Not a human';
        }

        document.getElementById('para').style.display = 'block';
        document.getElementById('verify').style.display = 'none';
    }
   }
   document.getElementById('reset').addEventListener('click', reset);
   document.getElementById('verify').addEventListener('click', verify);

   generateImages();