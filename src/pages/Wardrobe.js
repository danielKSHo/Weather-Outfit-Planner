import React, { useState } from 'react';

import ActionButton from "../components/ActionButton";
import { useLocation, useNavigate } from "react-router-dom";



export default function Wardrobe() {
  //initialising the states from the parent component
  const navigate = useNavigate();
  const location = useLocation();
  const isDaytime = location.state.isDaytimee;
  const weather = location.state.weather;
  const hourlyForecast = location.state.hourlyForecast;
  const weatherCardCity = location.state.weatherCardCity;
  const imagess = location.state.imagess
  const [savedImages, setSavedImages] = useState(JSON.parse(localStorage.getItem("savedImages")) || []);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [isHovered, setIsHovered] = useState(Array(savedImages.length).fill(false));
  const [isClicked, setIsClicked] = useState(Array(savedImages.length).fill(false));


  // handle mouse enter event for a specific index
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
    // check if the image at the index is not already clicked
    if (!isClicked[index]) {
      setImagesToRemove(() => [...imagesToRemove, savedImages[index]]);
    }
    else {
      // remove the image url from imagesToRemove state if it's already there
      setImagesToRemove(() => imagesToRemove.filter(imageUrl => imageUrl !== savedImages[index]));
    }
    // toggle the clicked state for the index
    updatedClick[index] = !(isClicked[index]);

    // update the state
    setIsClicked(updatedClick);

  };

  const makeChanges = () => {
    // Retrieve the existing saved URLs from local storage
    for (const image of imagesToRemove) {
      const indexToRemove = savedImages.indexOf(image);
      // If the URL is found, remove it from the array
      if (indexToRemove !== -1) {
        savedImages.splice(indexToRemove, 1);
      }
      // Update the local storage with the modified array
    }
    setImagesToRemove([]);
    setIsClicked(Array(savedImages.length).fill(false));
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    setSavedImages(JSON.parse(localStorage.getItem("savedImages")) || []);
    //window.location.reload();
  }



  return (

    <div className={`mx-auto h-screen  max-w-xl md:p-10 ${isDaytime ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <div className='p-5'>
        <ActionButton
          title="< Home"
          onClick={() => { navigate('/', { state: { weather: weather, hourlyForecast: hourlyForecast, weatherCardCity: weatherCardCity } }) }} />

      </div>

      <div className='w-1/2 mx-auto h-screen' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="columns-2 max-w-md mx-auto space-y-3">
          {savedImages.slice(0, savedImages.length).map((image, index) => (
            <div key={index} className="overflow-hidden">
              <img src={image.thumbnail} alt={`image-${index}`}
                className={`border-2 transition duration-300 ${isHovered[index] ? 'border-black' : ''} ${isClicked[index] ? 'border-red-500' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleClick(index)}
              />

            </div>

          ))}
        </div>

      </div>

      <div className='text-center mt-4 sm:h-fit h-svh'>
        <ActionButton
          title="Make Changes"
          onClick={() => makeChanges()} />

      </div>

    </div>

  );
}
