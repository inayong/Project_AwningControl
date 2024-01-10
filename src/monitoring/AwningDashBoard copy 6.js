import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);




const AwningDashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState([]);

  /**
 * In the chart render event, add icons on top of the circular shapes
 */
function renderIcons() {
  const chart = this;
  const series = chart.series[0];

  // this.series.forEach(series => {
      if (!series.icon) {
          series.icon = chart.renderer
              .text(
                  `<i class="fa fa-${series.options.custom.icon}"></i>`,
                  chart.plotLeft + (chart.plotWidth * 0.5),
                  chart.plotTop + (chart.plotHeight * 0.5)
                  )
              .css({
                  color: '#4572A7',
                  fontSize: '16px'
              })
              .add(series.group);
      }
      series.icon.attr({
          x: chart.plotLeft + (chart.plotWidth * 0.5) - 10,
          y: chart.plotTop + (chart.plotHeight * 0.5) - 10
      });
  // });
}

const trackColors = Highcharts.getOptions().colors.map(color =>
  new Highcharts.Color(color).setOpacity(0.3).get()
);

const gaugeOptions = {

  chart: {
      type: 'solidgauge',
      height: '110%',
      events: {
          render: renderIcons
      }
  },
  accessibility: {
    enabled: false // 접근성 기능 비활성화
  },
  credits: {
    enabled: false
  },
  title: {
      text: '정상작동 가동 시간',
      style: {
          fontSize: '24px'
      }
  },

  tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      shadow: false,
      style: {
          fontSize: '16px'
      },
      valueSuffix: '%',
      pointFormat: '{series.name}<br>' +
          '<span style="font-size: 2em; color: {point.color}; font-weight: bold">{point.y}</span>',
      positioner: function (labelWidth) {
          return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: (this.chart.plotHeight / 2) + 15
          };
      }
  },

  pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Feedback
          outerRadius: '62%',
          innerRadius: '38%',
          backgroundColor: trackColors[2],
          borderWidth: 0
      }]
  },

  yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
      }
  },

  series: [{
      name: '가동시간',
      data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '62%',
          innerRadius: '38%',
          y: 75
      }],
      custom: {
          icon: 'commenting-o',
          iconColor: '#303030'
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