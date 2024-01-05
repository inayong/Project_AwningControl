import { atom } from 'recoil';

export const DetailBarState = atom({
  key: 'DetailBarState',
  default: {
    isOpen: false,
    markerData: null,
  }
});