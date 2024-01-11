import React from 'react'
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);


const GaugeOptions = () => {
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
            height: '70%',
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
                    enabled: true,
                    useHTML: true,
                    format: '<div style="text-align: center;">' +
                        '<span style="font-size: 12px; opacity: 0.8; display: block; margin-bottom: 10px">{series.name}</span>' +
                        '<span style="font-size: 24px; color: {point.color}; font-weight: bold; display: block;">{point.y}h</span></div>',
                    y: -30, //라벨 위치
                    borderWidth: 0,
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
            },
        }]
    };
    return (
        <div className='p-5 box-border'>
            <HighchartsReact
                highcharts={Highcharts}
                options={gaugeOptions}
            />
        </div>
    )
}

export default GaugeOptions