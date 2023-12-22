import React from 'react'
import { Link } from 'react-router-dom';

const SideMenu = ({ menuName, clickMenu, setClickMenu, close, icon: Icon, label, onModal, isLink = true }) => {

    const handleClickMenu = () => {
        setClickMenu(menuName);
        if (onModal) {
            onModal(menuName);
        }
    };


    const content =
        close ? (
            <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
        ) : (
            <div className='flex items-center'>
                <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
                <div className='pl-5'>{label}</div>
            </div>
        );



    return (
        <Link to={`/${menuName}`} onClick={handleClickMenu}>
        <div className={`w-full py-3 ${clickMenu === menuName ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
                {isLink ? <Link to={`/${menuName}`}>{content}</Link> : <div onClick={handleClickMenu}>{content}</div>}
            </div>
        </div>
        </Link>
    )
}

export default SideMenu;