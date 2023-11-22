import { useContext } from 'react';
import './index.scss'
import { ResContext } from '../../App';
import { Card, List } from 'antd';
import logo from '../../assets/logo_square.png'
import { formData } from '../../data/data';

const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
  };

export default function Compare() {

    // const { result } = useContext(ResContext)!;
    const result = formData;
    

  return (
    <div className='Compare'>
        <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={result}
            renderItem={(item) => (
            <List.Item>
                <Card 
                    title={item.title}
                    cover={<img alt="商品图片" src={item.picture ? item.picture : logo} />}
                >
                    <Card.Grid style={gridStyle}><strong>价格：</strong>{item.price} 元</Card.Grid>
                    <Card.Grid style={gridStyle}><strong>平台：</strong>{item.platform} </Card.Grid>
                    <Card.Grid style={gridStyle}><strong>店铺：</strong>{item.store_name} </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <strong>评价：</strong>{item.comment_count}<br/>
                        {/* <strong>好评率：</strong>{item.evaluate.rate} */}
                    </Card.Grid>
                    <Card.Grid style={gridStyle}><a href={`${item.url}`}>商品详情</a></Card.Grid>
                </Card>
            </List.Item>
            )}
        />
    </div>
  )
}
