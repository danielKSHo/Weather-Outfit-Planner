import React from 'react'

const WeatherCard = ({icon, isDaytime, temp, time,onClick}) => {
  return (
    <div >
      <button onClick={onClick} className='mb-10'>
      <div className={`rounded-full p-4 w-20 h-36 hover:bg-sky-200 hover:text-black duration-300 ease-out flex flex-col items-center justify-center ${isDaytime ? 'border-black text-black' : 'border-white text-white'} border `}>
      {/* w-20 h-36 */}
        <div className='w-full flex justify-center'>
          {icon}
        </div>
        
        {/* Temperature */}
        <div className="text-xl font-bold mb-2">{temp}°C</div>

        {/* Time */}
        <div className="text-sm">{time}</div>
        
      </div>
      </button>
    </div>
    

  )
}

export default WeatherCard
