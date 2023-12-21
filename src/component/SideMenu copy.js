import React from 'react'
import { Link } from 'react-router-dom';

const SideMenu = ({ menuName, clickMenu, setClickMenu, close, icon: Icon, label, onModal, isLink = true }) => {

    const handleClickMenu = () => {
        setClickMenu(menuName);
        if (onModal) {
            onModal(menuName);
        }
    };

    // console.log("Menu Name:", menuName);
    const content = () => {
        {close ? (
            <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
        ) : (
            <div className='flex items-center'>
                <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
                <div className='pl-5'>{label}</div>
            </div>
        )}
    }

    // <div onClick={() => handleClickMenu('add')}
    //                 className={`w-full py-3 ${clickMenu === 'add' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
    //                 <div className={`flex ${close ? "justify-center" : "justify-start pl-2"} items-center`} onClick={openModal}>
    //                     {close ? (
    //                         <CiSquarePlus size={30} color={'#6b7280'} />
    //                     ) : (
    //                         <div className='flex items-center'>
    //                             <CiSquarePlus size={30} color={'black'} />
    //                             <div className='pl-5'>추가</div>
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>


    return (
        <div onClick={handleClickMenu}
            className={`w-full py-3 ${clickMenu === menuName ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <div className={`flex ${close ? "justify-center" : "justify-start px-2"} items-center`}>
                <Link to={`/${menuName}`}>
                    {close ? (
                        <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
                    ) : (
                        <div className='flex items-center'>
                            <Icon size={30} className={`${clickMenu === menuName ? ' text-white' : 'text-gray-700'}`} />
                            <div className='pl-5'>{label}</div>
                        </div>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default SideMenu