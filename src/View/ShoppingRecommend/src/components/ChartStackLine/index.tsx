import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { dataAll } from '../../data/data';

const data = dataAll.flatMap((item)=>([
    {
        "商品": item.name,
        "type": '好评',
        "数量": item.evaluate.pos, 
        "价格": item.price,
    },
    {
        "商品": item.name,
        "type": '中评',
        "数量": item.evaluate.ave,
        "价格": item.price,
    },
    {
        "商品": item.name,
        "type": '差评',
        "数量": item.evaluate.bad,
        "价格": item.price,
    }
]))


function renderBarChart(container: any, data: any) { // 渲染条形图
    const chart = new Chart({
        container, // 以传参container为基础
        autoFit: true,
    });

    chart.data(data);
    
    chart
      .interval()
      .transform({ type: 'stackY' })
      .encode('x', '商品')
      .encode('y', '数量')
      .encode('color', 'type')
      .axis('x', {
        labelSpacing: 4,
        labelTransform: 'rotate(90)',
      })
      .axis('y', { labelFormatter: '~s' });
    
      chart
        .line()
        .transform({ type: 'sortX', by: 'y', reverse: true })
        .encode('x', '商品')
        .encode('y', '价格')
        .encode('shape', 'smooth')
        .style('stroke', '#fdae6b')
        .style('lineWidth', 2)
        .scale('y', { independent: true })
        .axis('y', {
            position: 'right',
            grid: null,
            title: '价格',
            titleFill: '#fdae6b',
        });

    // 渲染可视化
    chart.render();

    return chart;
}

export default function ChartStackLine() { // 堆叠柱状图

    const container = useRef<HTMLDivElement>(null);
    const chart = useRef<any>(null);

    useEffect(() => { // 执行渲染图表
        if (!chart.current) {
          chart.current = renderBarChart(container.current, data);
        }
      }, []);

  return (
    <div className='ChartStackLine'>
      <div ref={container}></div>
    </div>
  )
}
