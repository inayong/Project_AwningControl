import React from 'react';

const NotiMenu = ({ notiOpen, setNotiOpen, settingOpen, setSettingOpen, icon: Icon, title, content }) => {

    const toggleNoti = () => {
        setNotiOpen(!notiOpen);
        if (settingOpen) setSettingOpen(false);
    }

    const toggleSetting = () => {
        setSettingOpen(!settingOpen);
        if (notiOpen) setNotiOpen(false);
    }

    const button = (
        <button onClick={toggleNoti}
            className={`absolute top-0 mt-4 transition-transform duration-300 ease-in-out ${notiOpen || settingOpen ? 'right-64' : 'right-4'} ${notiOpen || settingOpen ? 'bg-white' : 'bg-white rounded-full'} p-3 `}>
            <MdOutlineNotificationsActive size={30} className='fill-blue-600' />
        </button>
    )

    const message = (
        <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div>{content}</div>
            </div>
        </div>
    )

    return (
        <div>
            <div>

            </div>
            <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-20 transform transition-transform ${notiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Notification</h2>
                    <div>알림 내용</div>
                </div>
            </div>
        </div>
    )
}

export default NotiMenu;