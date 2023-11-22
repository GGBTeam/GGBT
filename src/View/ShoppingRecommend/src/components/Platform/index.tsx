import { useContext } from 'react'
import { ResContext } from '../../App';
import ReactECharts from 'echarts-for-react';
import './index.scss'
import { formData, Data } from '../../data/data';

type CountResult = Record<string, number>;

const platformStatistics = (data: Data[]): CountResult  => {
  return data.reduce((acc, cur) => {
    const platform = cur.platform;
    if (acc[platform]) {
      acc[platform]++;
    } else {
      acc[platform] = 1;
    }
    return acc;
  }, {} as CountResult);
}

export default function Platform() {

  const { result } = useContext(ResContext)!;

  // 平台数量统计
  const platformCount = platformStatistics(result);

  const platformType = Object.keys(platformCount)

  const chartData = platformType.map(item => ({
      name: item,
      value: platformCount[item]
  }))

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
              data: platformType
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
                data: chartData
              }
            ]
          };
    }

  return (
    <ReactECharts option={getOption()} className='Platform_E'/>
  )
}
