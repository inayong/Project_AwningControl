import React from 'react';
import { LuMonitorX } from "react-icons/lu";

const EventList = () => {
  return (
    <div className='flex justify-center items-center flex-col space-y-10 h-screen'>
      <div className='text-neutral-700 text-5xl animate-pulse font-Orbit'>work-in-progress</div>
      {/* <div><LuMonitorX size={100} /></div> */}
      <div>
      <img
        src="https://i.ibb.co/qBJkXYS/web-development.png"
        alt="work-in-progres"
        className="w-100 h-80"
      />
      </div>
    </div>
  )
}

export default EventList;