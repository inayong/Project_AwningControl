// import React from 'react';
import Sigungu from '../data/Sigungu.json';

export const SigunguData = () => {

  // const sel = Sigungu.map(item => item.status === '존재');
  const status = Sigungu.filter(item => item.status === '존재');
  // console.log("sel", status)
  const sigungu = status.filter((item) => {
    const addrsplit = item.address.split(" ");
    return addrsplit.length === 3;
  })
  // console.log("split", sigungu)

  const si = [...new Set (sigungu.map(item => item.address.split(" ")[0]))]; //공백기준으로 첫번째
  // const si = [...siMap].sort();
  // console.log("si", si)

  const gu = [...new Set (sigungu.map(item => item.address.split(" ")[1]))];
  const dong = [...new Set (sigungu.map(item => item.address.split(" ")[2]))];

  return { sigungu, si, gu, dong };
};

// export default SigunguData;