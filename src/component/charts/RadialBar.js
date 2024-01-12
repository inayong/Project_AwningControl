import React from 'react';
import ApexCharts from 'react-apexcharts';
// import ApexCharts from 'apexcharts';

const RadialBar = () => {

    // const options = {
    //     chart: {
    //         height: 350,
    //         toolbar: {
    //             show: true
    //         }
    //     },
    //     plotOptions: {
    //         radialBar: {
    //             startAngle: -135,
    //             endAngle: 225,
    //             hollow: {
    //                 margin: 0,
    //                 size: '70%',
    //                 background: '#fff',
    //                 image: undefined,
    //                 imageOffsetX: 0,
    //                 imageOffsetY: 0,
    //                 position: 'front',
    //                 dropShadow: {
    //                     enabled: true,
    //                     top: 3,
    //                     left: 0,
    //                     blur: 4,
    //                     opacity: 0.24
    //                 }
    //             },
    //             track: {
    //                 background: '#fff',
    //                 strokeWidth: '67%',
    //                 margin: 0, // margin is in pixels
    //                 dropShadow: {
    //                     enabled: true,
    //                     top: -3,
    //                     left: 0,
    //                     blur: 4,
    //                     opacity: 0.35
    //                 }
    //             },
    //             dataLabels: {
    //                 show: true,
    //                 name: {
    //                     offsetY: -10,
    //                     show: true,
    //                     color: '#888',
    //                     fontSize: '17px'
    //                 },
    //                 value: {
    //                     formatter: function (val) {
    //                         return parseInt(val);
    //                     },
    //                     color: '#111',
    //                     fontSize: '36px',
    //                     show: true,
    //                 }
    //             }
    //         }
    //     },
    //     fill: {
    //         type: 'gradient',
    //         gradient: {
    //             shade: 'dark',
    //             type: 'horizontal',
    //             shadeIntensity: 0.5,
    //             gradientToColors: ['#ABE5A1'],
    //             inverseColors: true,
    //             opacityFrom: 1,
    //             opacityTo: 1,
    //             stops: [0, 100]
    //         }
    //     },
    //     stroke: {
    //         lineCap: 'round'
    //     },
    //     labels: ['Percent'],
    // }

    // const series = [75];


    return (
        <div className='flex justify-center items-center bg-white shadow-xl rounded-xl border-2 border-blue-300'>
            <ApexCharts
                type="radialBar"
                height={400}
                width={400}
                series={[75]}
                options={{
                    chart: { toolbar: { show: false } },
                    plotOptions: {
                        radialBar: {
                            startAngle: 0,
                            endAngle: 360,
                            hollow: {
                                margin: 0,
                                size: '70%',
                                background: '#fff',
                                image: undefined,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                position: 'front',
                                dropShadow: {
                                    enabled: true,
                                    top: 3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24
                                }
                            },
                            track: {
                                background: '#fff',
                                strokeWidth: '67%',
                                margin: 0,
                                dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35
                                }
                            },
                            dataLabels: {
                                show: true,
                                name: {
                                    offsetY: -10,
                                    show: true,
                                    color: '#888',
                                    fontSize: '17px'
                                },
                                value: {
                                    formatter: function (val) {
                                        return parseInt(val);
                                    },
                                    color: '#111',
                                    fontSize: '36px',
                                    show: true,
                                }
                            }
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: ['#ABE5A1'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                    },
                    stroke: {
                        lineCap: 'round'
                    },
                    title: {
                        text: '정상 작동 가동 시간',
                        align: 'center'
                    },
                    labels: ['Hour'],
                }}
            />
        </div>
    );
};

export default RadialBar;