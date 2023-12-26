import React, { useEffect } from 'react';

const AddDevice = () => {
  const { naver } = window;

  useEffect(() => {

    const position = new naver.maps.LatLng(37.3595704, 127.105399);

    const map = new naver.maps.Map('map', {
      center: position,
      zoom: 10
    });

  }, [])

  return (
    <div className='h-screen bg-slate-200 flex justify-center items-center'>
      <div className=' flex bg-white w-[80%] h-[80%]'>
        <div className='flex bg-slate-400 w-2/5 h-full'>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className='w-2/3 text-lg p-3 flex flex-col justify-between'>
          <div className='flex justify-center text-xl font-bold p-1'>
            <div className='border p-3 w-2/3 text-center rounded-lg'>장치 추가</div>
          </div>
            <div className='pb-3 pt-1 pl-3'>주소</div>

          <div className='bg-slate-50 flex-grow '>
            <div className='py-3 pl-3'>관리구역</div>
            <div className='flex pt-3 pb-2 pl-3'>
              <div className='w-1/2'>관리번호</div>
              <div className=''>설치장소 메모</div>
            </div>
            <div className='flex py-2 pl-3'>
              <div className='w-1/2'>기구ID</div>
              <div>제어기ID</div>
            </div>
            <div className='flex py-4 pl-3'>
              <div className='w-1/2'>어닝 열림시간 - 좌(초)</div>
              <div>어닝 열림시간 - 우(초)</div>
            </div>
            <div className='flex py-7 pl-3'>
              <div className='w-1/2'>풍속 임계값</div>
              <div>어닝 재열림 시간(분)</div>
            </div>
          </div>

            <div className='flex py-7 pl-3 mb-2'>
              <div className='w-1/2'>설치일자</div>
              <div>계약만료기간</div>
            </div>
          <div className='flex justify-center mb-1'>
            <button className='border mr-3 p-1'>추가</button>
            <button className='border ml-3 p-1'>취소</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddDevice;