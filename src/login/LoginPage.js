import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <div className='flex h-screen'>
                <div className='bg-slate-400 sm:w-1/2'>사진</div>
                <div className='sm:w-2/3'>
                    <div className='flex justify-center items-center sm:text-4xl font-bold mt-48'>
                        스마트 어닝 관리 시스템
                    </div>
                    <div className='flex justify-center items-center pt-20'>
                        {/* <form className='flex flex-col justify-center items-center'> onsubmit */}
                        <form  className='w-full'> 
                            <div className='flex justify-center items-center'>
                                <input type='text' placeholder='아이디를 입력하세요.' className='border-2 rounded-lg sm:h-14 sm:w-1/3 px-3'/>
                            </div>
                            <div className='flex justify-center items-center pt-6'>
                                <input type='password' placeholder='비밀번호를 입력하세요.' className='border-2 rounded-lg sm:h-14 sm:w-1/3 px-3'/>
                            </div>
                            <div className='flex justify-center items-center pt-14'>
                                <button type='submit' className='bg-slate-700 text-white rounded-lg sm:h-14 sm:w-1/3 px-3'>로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;