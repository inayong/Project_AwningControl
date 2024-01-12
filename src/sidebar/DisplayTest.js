import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DetailBarState } from '../component/atoms/DetailBarState';
import DetailBar from './DetailBar';
import mapData from '../data/mapData.json';

const DisplayTest = () => {
    const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);

    useEffect(() => {
        console.log("mapData", mapData)
    })

    return (
        <div className='flex flex-col h-screen'>
            <div className='bg-slate-400 h-full '>
                <div className='pr-96'>DisplayTest</div>
                <button onClick={() => setIsDetailBar(true)} className='text-8xl h-96 rounded-full bg-lime-400'>DetailBar</button>
                <div className='bottom-0 pt-96'>alkdfjsldkfjsldkfjsldkfjdlskfjsl</div>
                <div style={{ textalign: 'center', padding: '5px' }}>
                    <span style={{ fontsize: '12px', opacity: '0.8' }}>name</span>
                </div >
                <span style={{ fontsize: '24px', fontweight: 'bold' }}>시간h</span >
            </div>
        </div >
    )
}

export default DisplayTest;