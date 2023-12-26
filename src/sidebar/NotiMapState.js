import { atom } from "recoil";

export const NotiMapState = atom({
    key: 'NotiMapState',
    default: {
        isOpen: false,
        markerData: null,
    }
})