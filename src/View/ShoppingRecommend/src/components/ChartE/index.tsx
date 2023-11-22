import './index.scss'
import ReactECharts from 'echarts-for-react';
import { formData } from '../../data/data';

// 价格排序
const sortData = formData.sort((item1, item2)=>(item1.price > item2.price ? -1 : 1))

const posData = sortData.map(item => item.comment_pos)

const aveData = sortData.map(item => item.comment_ave)

const badData = sortData.map(item => item.comment_bad)

const priceData = sortData.map(item => item.price)

const titleData = sortData.map(item => item.title)


export default function ChartE() {

    const getOption = () => {
        const option = {
            tooltip: { // 提示框
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: { // 图例
                data: ['pos', 'ave', 'bad', 'price']
            },
            xAxis: [ // x轴
                {
                type: 'category',
                data: titleData,
                axisPointer: {
                    type: 'shadow'
                }
                }
            ],
            yAxis: [ // y轴
                {
                    type: 'value',
                    name: 'number',
                    min: 0,
                },
                {
                    type: 'value',
                    name: 'price',
                    min: 0,
                    axisLabel: {
                        formatter: '{value} 元'
                    }
                }
            ],
            series: [
                {
                    name: 'pos',
                    type: 'bar',
                    stack: 'total',
                    data: posData
                },
                {
                    name: 'ave',
                    type: 'bar',
                    stack: 'total',
                    data: aveData
                },
                {
                    name: 'bad',
                    type: 'bar',
                    stack: 'total',
                    data: badData
                },
                {
                    name: 'price',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: (value: number) => value + ' 元'
                    },
                    data: priceData
                }
            ]
        };
        return option;
    }

  return (
    <div className='ChartE'>
        <ReactECharts option={getOption()} />
    </div>
  )
}
