import ActionButton from "../components/ActionButton";
import WeatherDetailedCard from "../components/WeatherDetailedCard"
import WeatherIcon from "../components/WeatherIcon";
import {useLocation, useNavigate } from "react-router-dom";
import { GoArrowDown, GoArrowDownLeft, GoArrowDownRight, GoArrowRight, GoArrowLeft, GoArrowUp, GoArrowUpRight, GoArrowUpLeft } from "react-icons/go";

//setting the wind direction icon based on the data from the api
function WindDirIcon(dir, size) {
    
    if ((dir >= 337.5 && dir < 360) || (dir > 0 && dir < 22.5)) return <GoArrowUp size={size} color='#3892D8' />;
    if (dir >= 22.5 && dir < 67.5) return <GoArrowUpRight size={size} color='#3892D8' />;
    if (dir >= 67.5 && dir < 112.5) return <GoArrowRight size={size} color='#3892D8' />;
    if (dir >= 112.5 && dir < 157.5) return <GoArrowDownRight size={size} color='#3892D8' />;
    if (dir >= 157.5 && dir < 202.5) return <GoArrowDown size={size} color='#3892D8' />;
    if (dir >= 202.5 && dir < 247.5) return <GoArrowDownLeft size={size} color='#3892D8' />;
    if (dir >= 247.5 && dir < 292.5) return <GoArrowLeft size={size} color='#3892D8' />;
    if (dir >= 292.5 && dir < 337.5) return <GoArrowUpLeft size={size} color='#3892D8' />;

}
//component that shows when clicked on a specific weather time to show more details
export default function Upcoming() {
    const location = useLocation();
    const navigate = useNavigate();
    const index = location.state.index;
    const city = location.state.city;
    const hourlyForecast = location.state.hourlyForecast;
    const isDaytime = location.state.isDaytime;
    const isDaytimee = location.state.isDaytimee;
    const weather = location.state.weather;



    return (
        <>
            <div className={`mx-auto h-screen max-w-xl md:p-20 ${isDaytimee ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                <div className="p-5">
                <ActionButton
                    title="< Home"
                    onClick={() => { navigate('/', { state: { weather: weather, hourlyForecast: hourlyForecast, weatherCardCity: city } }) }}>
                </ActionButton>
                </div>
                

                <div className="flex mt-4 h-3/4">
                    <WeatherDetailedCard

                        city={city}
                        isDaytime={isDaytimee}
                        icon={WeatherIcon(hourlyForecast[index] ? hourlyForecast[index].weather[0].id : null, isDaytime,200)}
                        temp={Math.round(hourlyForecast[index].main.temp)}
                        time={new Date(hourlyForecast[index].dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        feelsLike={hourlyForecast[index].main.feels_like}
                        humidity={hourlyForecast[index].main.humidity}
                        pressure={hourlyForecast[index].main.pressure}
                        windSpeed={hourlyForecast[index].wind.speed}
                        windDir={[WindDirIcon(hourlyForecast[index].wind.deg,50), hourlyForecast[index].wind.deg]}
                    />

                </div>
            </div>
        </>
    );
}
