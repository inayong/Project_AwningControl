import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// const data = [
//   { name : 'A', y: 10},
//   { name : 'B', y: 50}
// ]

const options = {
  chart: {
    type: 'pie',
    backgroundColor: '#cbd5e1',
    plotBackgroundColor: '#9ca3af',
    plotBorderWidth: 1,
    plotBorderColor: 'gray',
    plotShadow: true
  },
  title: {
    text: '정상 가동 시간'
  },
  credits: {
    enabled: false
  },
  series: [{
    name: '가동 시간',
    data: [
      { name: '가동', y: 60, color: Highcharts.getOptions().colors[4] }, // 강조하고 싶은 부분
      { name: '비가동', y: 40 }
    ],
    innerSize: '80%',
    size: '50%',
  }],
  colors: ['#FCE700', '#f6e1ea'],
  };

const AwningDashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState([]);

  // useEffect(() => {
  //     fetch("http://10.125.121.206:8080/user/device/view", {
  //         method: "GET",
  //         headers: {
  //             'Authorization': localStorage.getItem("token"),
  //         }
  //     })
  //     .then(resp => resp.json())
  //     .then((data) => {
  //         setDashBoardData(data);
  //         console.log("dashboard", data)
  //     })
  //     .catch(err => console.error(err))
  // }, [])

  return (
    <div>
      <div>AwningDashBoard</div>
      <div>정상동작 가동 시간 {'->'} 파이차트같은?</div>
      <div>고장 집계 그래프/차트 {'->'} 막대그래프</div>
      <div>요약 정보(총 설치대수, 정상 동작 대수, 차양막 가동대수) {'->'} 그냥 사각형에 원</div>
      <div>일자별 차양막 가동대수와 가동시간 그래프 {'->'} 선 그래프 2개</div>
      <div>지도로 합계?같은거 나타낼거 있으면 해보기</div>
      <div className='w-1/3 border-2'>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      </div>
    </div>
  )
}

export default AwningDashBoard;