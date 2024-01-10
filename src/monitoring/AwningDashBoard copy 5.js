import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);




const AwningDashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState([]);
  
  const gaugeOptions = {
    chart: {
      type: 'solidgauge',
      height: '110%',
    },
    title: {
      text: 'KPI 게이지'
    },
    pane: {
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    yAxis: {
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'] // red
      ],
      lineWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      },
      min: 0,
      max: 100
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'KPI',
      data: [80], // 여기에 KPI 값 입력
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">%</span></div>'
      },
      tooltip: {
        valueSuffix: ' %'
      }
    }]
  };

  

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