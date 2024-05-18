// import components and dependencies 
import ActionButton from "../components/ActionButton";
import WeatherCard from "../components/WeatherCard";
import WeatherIcon from "../components/WeatherIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiDayCloudy, WiNightCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';
import { useLocation, useNavigate } from "react-router-dom";



//creates the standarised version of the weather query
const cloudsArray = ["clear sky", "overcast clouds", "few clouds", "scattered clouds", "broken clouds"]
const rainArray = ["shower rain", "rain", "mist"]
const snowArray = ["snow", "thunderstorm"]

function weatherSearchBuilder(weather) {
  // Extracts the weather description from the provided weather data
  const description = weather.weather[0].description;

  // Determines the weather category based on temperature and description
  if (weather.main.temp < 0) {
    if (cloudsArray.includes(description)) {
      return "cold";
    } else if (rainArray.includes(description)) {
      return "rainy";
    } else if (snowArray.includes(description)) {
      return "snowy";
    } else {
      return "extreme cold";
    }
  } else if (weather.main.temp > 0 && weather.main.temp < 15) {
    if (cloudsArray.includes(description)) {
      return "warm";
    } else if (rainArray.includes(description)) {
      return "rainy";
    } else if (snowArray.includes(description)) {
      return "jacket";
    } else {
      return "hot";
    }
  }
  else if (weather.main.temp > 15) {
    if (cloudsArray.includes(description)) {
      return "sunny";
    } else if (rainArray.includes(description)) {
      return "humid";
    } else if (snowArray.includes(description)) {
      return "jacket";
    } else {
      return "hot";
    }
  }
}





export default function Home() {

  // Get location from react router
  const location = useLocation();

  // State variables with initial values based on location state or default
  const [city, setCity] = useState(location.state ? location.state.weather.name : 'London');
  const [weatherCardCity, setWeatherCardCity] = useState(location.state ? location.state.weatherCardCity : null);
  const [weather, setWeather] = useState(location.state ? location.state.weather : null);


  const [hourlyForecast, setHourlyForecast] = useState(location.state ? location.state.hourlyForecast : []);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [isDaytimee, setIsDaytimee] = useState(() => {
    // Initialize state from localStorage or default to true
    const savedMode = localStorage.getItem('isDaytimee');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [isMale, setIsMale] = useState(() => {
    // Initialize state from localStorage or default to true
    const savedMode = localStorage.getItem('isMale');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Log weather data for debugging
  console.log(weather);

  
  const currentTime = new Date().getTime() / 1000;
  const isDaytime = weather && currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset;
  const weatherIcon = WeatherIcon(weather ? weather.weather[0].id : null, isDaytime,200);
  //const weatherIconM = WeatherIconM(weather ? weather.weather[0].id : null, isDaytime);


  //formatting the times of the city 
  
  const timezoneOffsetSeconds = weather? weather.timezone:null; // Assuming the timezone field contains the offset in seconds
  const sunriseTimestamp = weather? weather.sys.sunrise * 1000: null; // Convert sunrise time to milliseconds
  const localSunrise = new Date(sunriseTimestamp + timezoneOffsetSeconds * 1000);
  const formattedSunrise = localSunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sunsetTimestamp = weather? weather.sys.sunset * 1000: null; // Convert sunset time to milliseconds
  const localSunset = new Date(sunsetTimestamp + timezoneOffsetSeconds * 1000); // Adjust sunset time using the timezone offset

  const formattedSunset = localSunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  

  //picks the correct weathericon based on the weather
  
  const navigate = useNavigate();

  const [imagess, setImagess] = useState([]);


   //used to toggle dark mode and light mode
   const toggleDarkMode = () => {
    setIsDaytimee(prevIsDaytime => {
      const newMode = !prevIsDaytime;
      // Update localStorage with the new mode
      localStorage.setItem('isDaytimee', JSON.stringify(newMode));
      return newMode;
    });
  };

  //used to switch genders
  const toggleGender = () => {
    setIsMale(prevIsMale => {
      const newMode = !prevIsMale;
      // Update localStorage with the new mode
      localStorage.setItem('isMale', JSON.stringify(newMode));
      return newMode;
    });
  };



  //used to fetch the image data from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fetch-images', {
          params: { searchQuery: `${isMale ? "Male" : "Female"} ${weather ? weatherSearchBuilder(weather) : ""} outfit` },
        });
        const data = response.data;
        setImagess(data); // Adjust based on your actual data structure
        console.log(weatherSearchBuilder(weather))
      } catch (error) {
        console.error('Error fetching data client:', error);
      }
    };

    fetchData();
  }, [isMale, latitude, longitude]);

  //used to get the hourly forecast
  useEffect(() => {
  const fetchWeather = async () => {
    try {
      const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${weather.name}&key=d9c2cbf68ae84af2913a111dbe2641c6`);
      const firstResult = geoResponse.data.results[0];
      if (firstResult) {
        setLatitude(firstResult.geometry.lat);
        setLongitude(firstResult.geometry.lng);
        console.log(weather);
      } else {
        console.error("No results found for the entered city");
      }

      setWeatherCardCity(weather.name);

    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  };
 fetchWeather();
  }, [weather])



  // handle weather serach based on the city
  const handleSearch = async () => {
    try {
      // fetch weather sata from API based on the city
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fb44b5a3e11fe750c9000813d6f5cefc`);
      setWeather(response.data);
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error("Error fetching weather data:", error);
    }
  };

  // when components load, it will handle the first api call of default city to render on page
  useEffect(() => {
    handleSearch();
  }, []);


  // called when the hourly forecast is needed
  const fetchHourlyForecast = async () => {
    
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=9&units=metric&appid=fb44b5a3e11fe750c9000813d6f5cefc`);
        setHourlyForecast(response.data.list.slice(0, 12)); // Adjust the number to get the desired number of hourly forecasts
      } catch (error) {
        console.error("Error fetching hourly forecast:", error);
        return [];
      }
  
  };

  // used to get the hourly forecast
  useEffect(() => {
    
    fetchHourlyForecast();
  }, [latitude, longitude]);

  return (
    <div className={`mx-auto h-full max-w-xl md:p-20 duration-300 ease-in ease-out ${isDaytimee ? 'bg-white text-black' : 'bg-gray-800 text-white'}` }>
      <div className="">
        <div className="flex items-center pt-10 pl-10">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="border border-black text-black p-2 mr-2 rounded-full"
          />
          <ActionButton onClick={handleSearch} className="border-none" title="🔍"></ActionButton>
          
          <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700"
          >
            {isDaytimee ? '🌙' : '☀️'}
          </button>

        </div>
        <h1 className="pt-5 pl-10 font-semibold text-xl"> {weather ? weather.name : "Loading..."}</h1>
        <h1 className="px-10 text-sm font-thin">{new Date().toLocaleString() + ""}</h1>
        <h1 className="pl-10 text-sm capitalize">Sunrise: {weather ? formattedSunrise : ""} | Sunset: {weather ? formattedSunset : ""}</h1>
        <div className="flex flex-col sm:flex-row mt-4 mx-10">
          <div className=" mx-auto">
            {weatherIcon}
          </div>

          <div className="text-center">
            <h1 className="font-semibold text-5xl">{weather ? `${Math.round(weather.main.temp)}°C` : ""}</h1>
            <h1 className="text-2xl capitalize">{weather ? weather.weather[0].description : ""}</h1>


          </div>

        </div>
        <div className={`mt-10 p-10 md:p-10 md:py-10 duration-300 ease-in ease-out ${isDaytimee ? 'bg-lightpink text-black' : 'bg-sky-700 text-white'} rounded-xl`}>
          <div className="flex flex-col sm:flex-row">
            <h1 className="text-2xl w-full sm:w-40"><span className={`font-bold capitalize ${isDaytimee ? 'text-pink' : 'text-green-400'}`}>{weather ? weatherSearchBuilder(weather) : ""}</span> today don't forget to wear these</h1>
            <div className="w-1/2 my-3 sm:my-0 sm:w-1/3 sm:ml-20 columns-2 max-w-md mx-auto space-y-1 ">
              {imagess.slice(0, 4).map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img className="rounded-md w-full " src={image.thumbnail} alt={`image-${index}`} />
                </div>
              ))}
            </div>

          </div>
          <div className="flex place-content-between mt-4 ">
            <ActionButton
              title="Learn More"
              onClick={() => { navigate('/learnmore', { state: { weather: weather, hourlyForecast: hourlyForecast, isDaytimee: isDaytimee, weatherCardCity: weatherCardCity, imagess: imagess } }) }}
              className={"border p-2 hover:bg-sky-200"} 
              colour={`${isDaytimee ? 'text-pink' : 'text-green-400'}`}
              />
            
            <ActionButton 
            title={isMale ? "Switch to Female" : "Switch to Male"} 
            onClick={toggleGender} 
            className="border p-2 hover:bg-sky-200" 
            colour={`${isDaytimee ? 'text-pink' : 'text-green-400'}`}
            />

          </div>
          <ActionButton
            title="View Saved"
            onClick={() => { navigate('/wardrobe', { state: { weather: weather, hourlyForecast: hourlyForecast, isDaytimee: isDaytimee, weatherCardCity: weatherCardCity, imagess: imagess } }) }}
            className={"mt-2 border p-2 hover:bg-sky-200"}
            colour={`${isDaytimee ? 'text-pink' : 'text-green-400'}`}
            />

        </div>

      </div>
      <div className="flex mx-10 mt-10 gap-28">
        <h1 className="font-bold mb-5">Today's Weather in {weatherCardCity}</h1>
      </div>
      <div className="pb-2 flex gap-4 place-content-center overflow-x-auto max-w-full h-svh sm:h-fit">


        {hourlyForecast.slice(0, 4).map((hourData, index) => (
          <WeatherCard
            key={index}
            isDaytime={isDaytimee}
            icon={WeatherIcon(hourData ? hourData.weather[0].id : null, isDaytime,50)}
            temp={Math.round(hourData.main.temp)}
            time={new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            onClick={() => { navigate('/upcoming', { state: { city: weatherCardCity, hourlyForecast: hourlyForecast, isDaytime: isDaytime, isDaytimee: isDaytimee, weather: weather, index: index } }) }}
          />
        ))}
      </div>


    </div>
  )
}