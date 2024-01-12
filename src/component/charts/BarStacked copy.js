import React from 'react';
import ApexCharts from 'react-apexcharts';

const BarStacked = () => {
    return (
        <div className='flex justify-center items-center bg-white shadow-xl rounded-xl border-2 border-blue-300'>
            <ApexCharts
                type='bar'
                height={400}
                width={900}
                series={[{
                    name: '배터리',
                    data: [44, 55, 41, 37, 22, 43, 21]
                }, {
                    name: '조명',
                    data: [53, 32, 33, 52, 13, 43, 32]
                }, {
                    name: '모터',
                    data: [12, 17, 11, 9, 15, 11, 20]
                }]}
                options={{
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        toolbar: { show: false }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            dataLabels: {
                                total: {
                                    enabled: true,
                                    offsetX: 0,
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 900
                                    }
                                }
                            }
                        },
                    },
                    stroke: {
                        width: 1,
                        colors: ['#fff']
                    },
                    title: {
                        text: '고장 집계',
                        align: 'center'
                    },
                    xaxis: {
                        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                        labels: {
                            formatter: function (val) {
                                return val + "K"
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: undefined
                        },
                    },
                    tooltip: {
                        enabled: false,
                        y: {
                            formatter: function (val) {
                                return val + "K"
                            }
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                        offsetX: 40
                    }
                }}
            />
        </div>
    )
}

export default BarStacked;