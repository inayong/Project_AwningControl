import React from 'react'
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);


const StackedBar = () => {
    const stackedBar = {
        chart: {
            type: 'bar',
            height: '36%'
        },
        accessibility: {
            enabled: false
          },
          credits: {
            enabled: false
          },
        title: {
            text: '고장 집계'
        },
        xAxis: {
            categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Goals'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Cristiano Ronaldo',
            data: [4, 4, 6, 15, 12]
        }, {
            name: 'Lionel Messi',
            data: [5, 3, 12, 6, 11]
        }, {
            name: 'Robert Lewandowski',
            data: [5, 15, 8, 5, 8]
        }]
    };

    return (
        <div className='p-5 box-border'>
        <HighchartsReact
            highcharts={Highcharts}
            options={stackedBar}
            containerProps={{ style: { height: "100%" } }}
        />
        </div>
    )
}

export default StackedBar