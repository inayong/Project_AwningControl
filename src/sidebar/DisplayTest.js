import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DetailBarState } from './DetailBarState';
import DetailBar from './DetailBar';

const DisplayTest = () => {
    const [isDetailBar, setIsDetailBar] = useRecoilState(DetailBarState);
    return (
        <div className='flex flex-col h-screen'>
            <div className='bg-slate-400 h-full '>
                <div className='pr-96'>DisplayTest</div>
                <button onClick={() => setIsDetailBar(true)} className='text-8xl h-96 rounded-full bg-lime-400'>DetailBar</button>
                <div className='bottom-0 pt-96'>alkdfjsldkfjsldkfjsldkfjdlskfjsl</div>
            </div>
            {/* {isDetailBar && (
                <div className='bg-fuchsia-800 h-[1800px]'>
                    <DetailBar />
                </div>
            )} */}
        </div>
    )
}

export default DisplayTest;