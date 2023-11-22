import { useContext } from 'react'
import { ResContext } from '../../App';
import ReactECharts from 'echarts-for-react';
import { formData } from '../../data/data';
import './index.scss'

export default function ReviewPrice() {

    const { result } = useContext(ResContext)!;
    // 价格排序
    const sortData = result.sort((item1, item2)=>(item2.price - item1.price))

    console.log('sortData->', sortData);
    

    // 好评
    const posData = sortData.map(item => item.comment_pos)

    // 中评
    const aveData = sortData.map(item => item.comment_ave)

    // 差评
    const badData = sortData.map(item => item.comment_bad)

    // 价格
    const priceData = sortData.map(item => item.price)

    // 标题
    const titleData = sortData.map(item => item.title)

    const getOption = () => {
        const option = {
            title: {
                text: '价格 用户评价',
                left: 40
            },
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
                data: ['pos', 'ave', 'bad', 'price'],
                right: 20
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
    <ReactECharts option={getOption()} className='ReviewPrice_E'/>
  )
}
