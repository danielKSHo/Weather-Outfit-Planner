import ActionButton from "../components/ActionButton";
import ImageGallery from "../components/ImageGallery";
import { useLocation, useNavigate } from "react-router-dom";

//used for the component that shows the outfits based on the weather using an imagegallery component
export default function LearnMore() {
    const navigate = useNavigate();
    const location = useLocation();

    const weather = location.state.weather;
    const hourlyForecast = location.state.hourlyForecast;
    const weatherCardCity = location.state.weatherCardCity;
    const isDaytime = location.state.isDaytimee;
    const imagess = location.state.imagess


    return (
        <>
            <div className={`mx-auto h-screen  max-w-xl md:p-10 ${isDaytime ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                <div className="p-5">
                    <ActionButton
                        title="< Home"
                        className={""}
                        onClick={() => { navigate('/', { state: { weather: weather, hourlyForecast: hourlyForecast, weatherCardCity: weatherCardCity } }) }}
                    />
                </div>
                <div className=" ">
                    <ImageGallery images={imagess} className={""} />
                </div>
            </div>
        </>
    )
}