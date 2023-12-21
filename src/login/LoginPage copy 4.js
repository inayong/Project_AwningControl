import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SidebarState } from '../sidebar/SidebarState';
import { Link, useNavigate } from 'react-router-dom';
import { LogAtom } from './LogAtom';

const LoginPage = () => {
    const [, setSidebar] = useRecoilState(SidebarState);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [, setLogAtom] = useRecoilState(LogAtom);

    const navigate = useNavigate();


    useEffect(() => {
        setSidebar(false);
        return () => setSidebar(true);
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "loginId": loginId,
                    "loginPassword": password
                })
            })
                .then((resp) => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("로그인 실패")
                    }
                })
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    setLogAtom(true);
                    navigate("/monitoring")
                })
                .catch((error) => {
                    console.error("로그인 시도 중 오류", error);
                })
        }
    }

    return (
        <div>
            <div className='flex h-screen'>
                <div className='bg-slate-400 sm:w-1/2'>사진</div>
                <div className='sm:w-2/3'>
                    <div className='flex justify-center items-center sm:text-4xl font-bold mt-48'>
                        스마트 어닝 관리 시스템
                    </div>
                    <div className='flex justify-center items-center pt-20'>
                        <form className='w-full'>
                            <div className='flex justify-center items-center'>
                                <input onChange={(e) => setLoginId(e.target.value)} type='text' placeholder='아이디를 입력하세요.' className='border-2 rounded-lg sm:h-14 sm:w-1/3 px-3' />
                            </div>
                            <div className='flex justify-center items-center pt-6'>
                                <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='비밀번호를 입력하세요.' className='border-2 rounded-lg sm:h-14 sm:w-1/3 px-3' />
                            </div>
                            <div className='flex justify-center items-center pt-14'>
                                <button onClick={fetchLogin} className='bg-slate-700 text-white rounded-lg sm:h-14 sm:w-1/3 px-3'>로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;