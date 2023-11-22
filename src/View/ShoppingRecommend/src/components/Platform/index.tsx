import ReactECharts from 'echarts-for-react';
import './index.scss'
import { formData } from '../../data/data';

export default function Platform() {

    const getOption = () => {
        return {
            title: {
                text: '平台统计',
                left: 'center'
            },
            tooltip: { // 标签
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: { // 图例
              left: 'center',
              top: 'bottom',
              data: [
                'rose1',
                'rose2',
                'rose3',
                'rose4',
                'rose5',
                'rose6',
                'rose7',
                'rose8'
              ]
            },
            series: [
              {
                name: '平台',
                type: 'pie',
                radius: [20, 140],
                roseType: 'radius',
                itemStyle: {
                  borderRadius: 5
                },
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: [
                  { value: 40, name: 'rose 1' },
                  { value: 33, name: 'rose 2' },
                  { value: 28, name: 'rose 3' },
                  { value: 22, name: 'rose 4' },
                  { value: 20, name: 'rose 5' },
                  { value: 15, name: 'rose 6' },
                  { value: 12, name: 'rose 7' },
                  { value: 10, name: 'rose 8' }
                ]
              }
            ]
          };
    }

  return (
    <ReactECharts option={getOption()} className='Platform_E'/>
  )
}
