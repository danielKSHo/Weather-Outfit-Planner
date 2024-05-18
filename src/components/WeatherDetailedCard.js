import React from 'react'

const WeatherDetailedCard = ({city,icon, temp, time, feelsLike, isDaytime, humidity, pressure,windSpeed,windDir}) => {
  return (
  
    <div className={`rounded-full sm:p-16 flex flex-col items-center mx-auto justify-center ${isDaytime ? 'text-black border-black' : 'text-white border-white'} border shadow-lg`}>
    {/* City */}
    <div className="text-xl font-bold">{city}</div>
    
    {/* Weather Icon */}
    {icon}
    
    {/* Temperature */}
    <div className="text-3xl font-bold mb-2">{temp}°C</div>

    {/* Time */}
    <div className="text-xl mb-2">{time}</div>
    
    {/* Additional Weather Information */}
    <div className="grid grid-cols-1 gap-2">
        {/* Feels Like */}
        <div className="flex items-center">
            <span className="text-sm mr-2">Feels Like:</span>
            <span className="text-sm font-bold">{feelsLike}°C</span>
        </div>
        
        {/* Humidity */}
        <div className="col-span-1 flex items-center">
            <span className="text-sm mr-2">Humidity:</span>
            <span className="text-sm font-bold">{humidity}%</span>
        </div>
        
        {/* Pressure */}
        <div className="col-span-1 flex items-center">
            <span className="text-sm mr-2">Pressure:</span>
            <span className="text-sm font-bold content-center">{pressure} hPa</span>
        </div>
        
        {/* Wind Speed */}
        <div className="col-span-1 flex items-center">
            <span className="text-sm mr-2">Wind Speed:</span>
            <span className="text-sm font-bold">{windSpeed} m/s</span>
        </div>
        
        {/* Wind Direction */}
        <div className="col-span-1 flex items-center">
            <span className="text-sm mr-2">Wind Direction:</span>
            <span className="text-sm font-bold">{windDir[0]}</span>
        </div>
    </div>
</div>

  )
}

export default WeatherDetailedCard
