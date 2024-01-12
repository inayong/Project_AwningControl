import React from 'react';
import ApexCharts from 'react-apexcharts';

const LineCharts = () => {
    return (
        <div className='flex justify-center items-center bg-white shadow-xl rounded-xl border-2 border-blue-300'>
            <ApexCharts
                type='line'
                height={400}
                width={900}
                series={[
                    {
                        name: "High - 2013",
                        data: [28, 29, 33, 36, 32, 32, 33]
                    },
                    {
                        name: "Low - 2013",
                        data: [12, 11, 14, 18, 17, 13, 13]
                    }
                ]}
                options={{
                    chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#77B6EA', '#545454'],
                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    title: {
                        text: '일자별 차양막 가동대수와 가동시간',
                        align: 'center'
                    },
                    grid: {
                        borderColor: '#e7e7e7',
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    markers: {
                        size: 1
                    },
                    xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                        title: {
                            text: 'Month'
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Temperature'
                        },
                        min: 5,
                        max: 40
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    }
                }}
            />
        </div>
    )
}

export default LineCharts;