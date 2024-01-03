import React from 'react'
import { Link } from 'react-router-dom';
import { GoDash } from "react-icons/go";

const SideMenu = ({ menuName, clickMenu, setClickMenu, close, icon: Icon, label, clickSubMenu, setClickSubMenu }) => {

    const handleClickMenu = () => {
        if (menuName === 'monitoring') {
            setClickSubMenu(!clickSubMenu);
        } else {
            setClickSubMenu(false);
        }
        setClickMenu(menuName);
    };


    const content = (menuName === 'monitoring' && clickSubMenu) ? (
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
                        <div className='bg-white ml-16 w-full'>
                            <div className='flex items-center'>
                                <GoDash className='mr-2'/>sub
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    ) : (
        <div className={`w-full py-3 ${clickMenu === menuName ? 'bg-gray-300 text-black' : 'text-gray-700'}`}>
            <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
                {close ? (
                    <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-600'}`} />
                ) : (
                    <div className='flex items-center'>
                        <Icon size={30} className={`${clickMenu === menuName ? ' text-black' : 'text-gray-600'}`} />
                        <div className='pl-5'>{label}</div>
                    </div>
                )}
            </div>
        </div >
    );



    return (
        <Link to={`/${menuName}`} onClick={handleClickMenu}>
            {content}
        </Link>
    )
}

export default SideMenu;