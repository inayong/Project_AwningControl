import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { GoDash } from "react-icons/go";

const SideMenu = ({ menuName, clickMenu, setClickMenu, close, icon: Icon, label, clickSubMenu, setClickSubMenu }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes(`/${menuName}`)) {
            setClickMenu(menuName);
        }
    }, [location, menuName, setClickMenu]);

    const handleClickMenu = () => {
        if (menuName === 'monitoring') {
            setClickSubMenu(true);
        } else {
            setClickSubMenu(false);
        }
        setClickMenu(menuName);
    };


    const content = (
        <div className={`w-full py-3 ${clickMenu === menuName ? 'bg-gray-300 text-black' : 'text-gray-700'}`}>
            <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
                {close ? (
                    <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-600'}`} />
                ) : (
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <Icon size={30} className={`${clickMenu === menuName ? ' text-black' : 'text-gray-600'}`} />
                            <div className='pl-5'>{label}</div>
                        </div>
                    </div>

                )}
            </div>
        </div >
    );



    return (
        <Link to={`/${menuName}`} onClick={handleClickMenu}>
            {content}
            {!close && menuName === 'monitoring' && clickSubMenu && (
                <div className='ml-16 w-full'>
                    <button className='flex items-center mb-2 mt-2'>
                        <div>
                            <GoDash className='mr-2' />
                        </div>
                        <div className='hover:bg-gray-200'>
                            회사 1
                        </div>
                    </button>
                    <button className='flex items-center'>
                        <div>
                            <GoDash className='mr-2' />
                        </div>
                        <div className='hover:bg-gray-200'>
                            회사 2
                        </div>
                    </button>
                </div>
            )}
        </Link>
    )
}

export default SideMenu;