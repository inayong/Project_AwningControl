import React from 'react'
import { Link } from 'react-router-dom';

const SideMenu = ({ menuName, clickMenu, setClickMenu, close, icon: Icon, label, onModal, isLink = true }) => {

    const handleClickMenu = () => {
        setClickMenu(menuName);
        if (onModal) {
            onModal(menuName);
        }
    };


    const content = () => (
        <div className={`w-full py-3 ${clickMenu === menuName ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
            { close ? (
            <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
            ) : (
            <div className='flex items-center'>
                <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
                <div className='pl-5'>{label}</div>
            </div>
            )}
            </div>
        </div >
    );



return isLink ? (
    <Link to={`/${menuName}`} onClick={handleClickMenu}>
                {content()}
    </Link>
) : (
    <div onClick={handleClickMenu}>
            {content()}
    </div>
)
}

export default SideMenu;