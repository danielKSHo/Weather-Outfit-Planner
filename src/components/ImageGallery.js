import React, { useState } from 'react';
import ActionButton from './ActionButton';

//retrieving the existing urls and pushing them onto the array
function saveImageURL(url) {
  const savedURLs = JSON.parse(localStorage.getItem('savedImages')) || [];
  savedURLs.push(url);
  localStorage.setItem('savedImages', JSON.stringify(savedURLs));
}
//removing the images from the array
function removeImageURL(url) {
  const savedURLs = JSON.parse(localStorage.getItem('savedImages')) || [];
  const indexToRemove = savedURLs.indexOf(url);
  if (indexToRemove !== -1) {
      savedURLs.splice(indexToRemove, 1);
      localStorage.setItem('savedImages', JSON.stringify(savedURLs));
  }
}

const ImageGallery = ({ images, className }) => {
  const [displayCount, setDisplayCount] = useState(5); // Start with displaying 10 images
  const imagesLength = images.length;
  
  const [isHovered, setIsHovered] = useState(Array(imagesLength).fill(false));
  const [isClicked, setIsClicked] = useState(Array(imagesLength).fill(false));


  const handleMouseEnter = (index) => {
    const updatedHover = [...isHovered];
        updatedHover[index] = true;
        setIsHovered(updatedHover);
    
};

const handleMouseLeave = (index) => {
  const updatedHover = [...isHovered];
        updatedHover[index] = false;
        setIsHovered(updatedHover);
    
};
const handleClick = (index) => {
  const updatedClick = [...isClicked];

        if (isClicked[index]){
          removeImageURL(images[index]);
        }
        else{
          saveImageURL(images[index]);
        }
        updatedClick[index] = !(isClicked[index]);
        
        setIsClicked(updatedClick);
       
};

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 5); // Increment display count by 10
  };

  return (
    <>
    <div className={className + " " + "w-1/2 mx-auto"} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="columns-2 max-w-md mx-auto space-y-3">
        {images.slice(0, displayCount).map((image, index) => (
          <div key={index} className="overflow-hidden">
            <img src={image.thumbnail} alt={`image-${index}`}
            className={`border-2 transition duration-300 ${isHovered[index] ? 'border-black' : ''} ${isClicked[index] ? 'border-red-500' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleClick(index)}/> 
            
          </div>
        ))}
      </div>
      </div>
      {displayCount < images.length && ( // Only show if more images are available to load
        <div className="text-center mt-4 sm:h-fit h-svh">
          <ActionButton title={"Load More"} onClick={handleLoadMore}/>
        </div>
      )}
      </>
    
  );
};

export default ImageGallery;





