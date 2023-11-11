import './index.scss'
import { Card, List } from 'antd';
import logo from '../../assets/logo1_1.png'
import { dataForCompare } from '../../data/data'

export default function Compare() {

    const gridStyle: React.CSSProperties = {
      width: '100%',
      textAlign: 'left',
    };

  return (
    <div className='Compare'>
        <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={dataForCompare}
            renderItem={(item) => (
            <List.Item>
                <Card 
                    title={item.name}
                    cover={<img alt="商品图片" src={logo} />}
                >
                    <Card.Grid style={gridStyle}><strong>价格：</strong>{item.price} 元</Card.Grid>
                    <Card.Grid style={gridStyle}><strong>配送地址：</strong>{item.address}</Card.Grid>
                    <Card.Grid style={gridStyle}><strong>配送时间：</strong>{item.delivery}</Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <strong>评价：</strong>{item.evaluate.num}<br/>
                        <strong>好评率：</strong>{item.evaluate.rate}
                    </Card.Grid>
                    <Card.Grid style={gridStyle}><a href="http://www.w3school.com.cn">商品详情</a></Card.Grid>
                </Card>
            </List.Item>
            )}
        />
    </div>
  )
}
