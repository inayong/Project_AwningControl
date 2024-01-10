import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import solidGauge from 'highcharts/modules/solid-gauge';

// solidGauge(Highcharts);

// const data = [
//   { name : 'A', y: 10},
//   { name : 'B', y: 50}
// ]

// const options = {
//   chart: {
//     type: 'solidgauge'
//   },
//   title: null,
//   tooltip: {
//     enabled: false
//   },
//   pane: {
//     startAngle: 0,
//     endAngle: 360,
//     background: [{
//       outerRadius: '112%',
//       innerRadius: '83%',
//       backgroundColor: Highcharts.color('#ddd').setOpacity(0.3).get(),
//       borderWidth: 0
//     }]
//   },
//   yAxis: {
//     min: 0,
//     max: 100,
//     lineWidth: 0,
//     tickPositions: []
//   },
// plotOptions: {
//   solidgauge: {
//     dataLabels: {
//       enabled: false
//     },
//     linecap: 'round',
//     stickyTracking: false,
//     rounded: true
//   }
// },
//   series: [{
//     name: '가동 시간',
//     data: [
//       { name: '가동', y: 60, color: Highcharts.getOptions().colors[4], radius: '112%', innerRadius: '80%' }, // 강조하고 싶은 부분
//       { name: '비가동', y: 40 }
//     ],
//     innerSize: '80%',
//     size: '50%',
//   }],
//   colors: ['#FCE700', '#f6e1ea'],
//   credits: {
//     enabled: false
//   },
//   };
const trackColors = Highcharts.getOptions().colors.map(color =>
  new Highcharts.Color(color).setOpacity(0.3).get()
);
const gaugeOptions = {
  chart: {
      type: 'solidgauge'
  },

  title: null,
  accessibility: {
    enabled: false // 접근성 기능 비활성화
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{ // Track for Conversion
        outerRadius: '112%',
        innerRadius: '88%',
        backgroundColor: trackColors[0],
        borderWidth: 0
    }, { // Track for Engagement
        outerRadius: '87%',
        innerRadius: '63%',
        backgroundColor: trackColors[1],
        borderWidth: 0
    }, { // Track for Feedback
        outerRadius: '62%',
        innerRadius: '38%',
        backgroundColor: trackColors[2],
        borderWidth: 0
    }]
},

  exporting: {
      enabled: false
  },

  tooltip: {
      enabled: false
  },

  // the value axis
  yAxis: {
      stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
          y: -70
      },
      labels: {
          y: 16
      }
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
          }
      }
  }
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
        options={gaugeOptions}
      />
      </div>
    </div>
  )
}

export default AwningDashBoard;