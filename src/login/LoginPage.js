import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SidebarState } from '../component/atoms/SidebarState';
import { Link, useNavigate } from 'react-router-dom';
import { LogAtom } from '../component/atoms/LogAtom';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const LoginPage = () => {
    const [, setSidebar] = useRecoilState(SidebarState);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [, setLogAtom] = useRecoilState(LogAtom);
    const [showPswd, setShowPswd] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        setSidebar(false);
        return () => setSidebar(true); //다른페이지 이동시 다시 표시
    }, []);

    const fetchLogin = (e) => {
        e.preventDefault();

        if (loginId === "") {
            alert("아이디를 입력 해주세요.")
        } else if (password === "") {
            alert("비밀번호를 입력 해주세요.")
        } else {
            fetch("http://10.125.121.206:8080/login", {
                method: "POST",
                body: JSON.stringify({
                    "loginId": loginId,
                    "loginPassword": password
                })
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        localStorage.setItem("token", resp.headers.get("Authorization"))
                        localStorage.setItem("loginId", loginId)
                        setLogAtom(true);
                        navigate("/monitoring")
                        alert("로그인 성공")
                    } else {
                        if (localStorage.getItem("loginId")) {
                            setLogAtom(localStorage.getItem("loginId"))
                        } else {
                            alert("아이디 및 비밀번호를 다시 확인해주세요.")
                        }
                    }
                })
                .catch((error) => {
                    console.error("로그인 시도 중 오류", error);
                })
        }
    }

    const showPswdBtn = () => {
        setShowPswd(!showPswd);
    }

    return (
        <div>
            <div className='flex h-screen'>
                <div className='bg-slate-400 sm:w-1/2 w-1/2'>
                    <img src="https://i.ibb.co/0n3DTXJ/loginawningimage.jpg" alt="loginawningimage" className='h-full w-full' />
                </div>
                <div className='sm:w-2/3 flex flex-col justify-center'>
                    <div className='flex justify-center items-center sm:text-4xl font-bold font-GmarketSansMedium'>
                        스마트 어닝 관리 시스템
                    </div>
                    <div className='flex justify-center items-center pt-20'>
                        <form className='w-full'>
                            <div className='flex justify-center items-center'>
                                <input onChange={(e) => setLoginId(e.target.value)} type='text' placeholder='아이디를 입력하세요.' className='border-2 rounded-lg sm:h-14 sm:w-1/3 px-3 outline-none font-NanumSquareNeoVariable' />
                            </div>
                            <div className='flex justify-center items-center pt-6 '>
                                <div className='border-2 rounded-lg sm:h-14 sm:w-1/3 flex items-center'>
                                    <input onChange={(e) => setPassword(e.target.value)} type={showPswd ? 'text' : 'password'} placeholder='비밀번호를 입력하세요.' className='h-full w-full outline-none pl-3 rounded-lg font-NanumSquareNeoVariable' />
                                    <button onClick={showPswdBtn} type="button" className='mr-3'>
                                        {showPswd ? <IoEyeSharp size={20} className='fill-gray-500' /> : <FaRegEyeSlash size={20} className='fill-gray-400' />}
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-center items-center pt-14'>
                                <button onClick={fetchLogin} className='bg-slate-700 text-white rounded-lg sm:h-14 sm:w-1/3 px-3 font-GmarketSansMedium pt-1'>로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;