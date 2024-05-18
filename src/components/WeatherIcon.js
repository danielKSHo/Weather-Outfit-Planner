import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiDayCloudy, WiNightCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';

export default function WeatherIcon(weatherId, isDaytime,size) {
  
    if (!weatherId) return <WiDaySunny size={size}/>;
  
    const prefix = isDaytime ? 'Day' : 'Night';
    if (weatherId >= 200 && weatherId <= 232) return <WiThunderstorm size={size} color='#3892D8' />;
    if (weatherId >= 300 && weatherId <= 321) return <WiRain size={size} color='#3892D8' />;
    if (weatherId >= 500 && weatherId <= 531) return <WiRain size={size} color='#3892D8' />;
    if (weatherId >= 600 && weatherId <= 622) return <WiSnow size={size} color='#3892D8' />;
    if (weatherId >= 701 && weatherId <= 781) return <WiFog size={size} color='#3892D8' />;
    if (weatherId === 800) return isDaytime ? <WiDaySunny size={size} color='#3892D8' /> : <WiNightClear size={size} color='#3892D8' />;
    if (weatherId >= 801 && weatherId <= 804) return isDaytime ? <WiDayCloudy size={size} color='#3892D8' /> : <WiNightCloudy size={size} color='#3892D8' />;
  
    return <WiDaySunny size={size} color='#3892D8' />;
  }