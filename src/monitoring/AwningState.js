import React from 'react';
import { RiSearch2Line, RiFilter3Line, RiCheckboxLine } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";

const AwningState = () => {
  const handlebutton = () => {
    console.log("input")
  }
  return (
    <div className='bg-slate-200 h-screen'>
      <div className='flex justify-center h-[28%] pt-14'>
        <div className='bg-white w-5/6'>
          <div className='flex justify-between'>
          <div className='flex p-3'>
            <div className='flex items-center w-48'>
              <RiSearch2Line size={20} className='m-3 fill-gray-500' />
              <div className='text-lg'>검색</div>
            </div>
            <select className='bg-slate-200 w-36 pl-2 rounded-lg'>
              <option value=''>전체</option>
            </select>
            <div className='flex bg-slate-300 ml-2 items-center rounded-lg'>
              <input type='text' className='w-72 bg-slate-300' />
              <button onClick={handlebutton} className='absolute ml-[260px]'><RiSearch2Line /></button>
            </div>
            </div>
            <div className='flex'>
              <button className='flex bg-gray-100 items-center mx-4 my-3 px-2 rounded-lg hover:bg-gray-200'>
                <div className='pr-2'>초기화</div>
                <GrPowerReset />
              </button>
            </div>
          </div>
          <div className='flex p-3'>
            <div className='flex items-center w-48'>
              <RiFilter3Line size={20} className='m-3 fill-gray-500' />
              <div className='text-lg'>필터</div>
            </div>
            <select className='w-36 pl-2 rounded-lg'>
              <option value=''>전체</option>
            </select>
          </div>
          <div className='flex p-3'>
            <div className='flex items-center w-48'>
              <RiCheckboxLine size={20} className='m-3 fill-gray-500' />
              <div className='text-lg'>장치 관리</div>
            </div>
            <button className='hover:bg-gray-200 border rounded-lg px-2'>어닝 열림</button>
          </div>
        </div>
      </div>
      <div className='flex justify-center h-1/2 mt-20'>
        <div className='bg-white w-5/6 '>q</div>
      </div>
    </div>
  )
}

export default AwningState;