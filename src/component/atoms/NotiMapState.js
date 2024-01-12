import { atom } from "recoil";

export const NotiMapState = atom({
    key: 'NotiMapState',
    default: {
        isOpen: false,
        isOpen2: false,
        markerData: null,
    }
})