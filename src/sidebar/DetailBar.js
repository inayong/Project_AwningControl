import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NotiMapState } from './NotiMapState';
import { DetailBarState } from './DetailBarState';

const DetailBar = () => {
    const setIsDetailBar = useSetRecoilState(DetailBarState);

    const clickCancle = () => {
        setIsDetailBar(false);
    }

  return (
    <div className='bg-slate-300 h-72'>
        <div>DetailBar</div>
        <button onClick={clickCancle}>취소</button>
    </div>
  )
}

export default DetailBar;