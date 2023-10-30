import './index.scss'
import { Card, List } from 'antd';
import logo from '../../assets/logo1_1.png'

export default function Compare() {

    const data = [
        {
          title: '商品 1',
          price: '111',
          delivery: '现货,23:10前下单,预计明天(10月32日)送达',
          address: '广东广州市番禺区小谷围街道城环西路100号广东工业大学西生活区',
          detail: 'https://www.amazon.com/s/?_encoding=UTF8&k=gaming%20headsets&ref=nb_sb_noss_2&pd_rd_w=T6ImP&content-id=amzn1.sym.12129333-2117-4490-9c17-6d31baf0582a&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=8PBC89WKGV35Q1NHFVHM&pd_rd_wg=1YeSN&pd_rd_r=5cdbbf55-74b6-4b14-a30f-c207584360ab&ref_=pd_gw_unk'
        },
        {
            title: '商品 2',
            price: '222',
            delivery: '现货,23:10前下单,预计明天(10月32日)送达',
            address: '广东广州市番禺区小谷围街道城环西路100号广东工业大学西生活区',
            detail: 'https://www.amazon.com/s/?_encoding=UTF8&k=gaming%20headsets&ref=nb_sb_noss_2&pd_rd_w=T6ImP&content-id=amzn1.sym.12129333-2117-4490-9c17-6d31baf0582a&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=8PBC89WKGV35Q1NHFVHM&pd_rd_wg=1YeSN&pd_rd_r=5cdbbf55-74b6-4b14-a30f-c207584360ab&ref_=pd_gw_unk'
        },
    ];

    const gridStyle: React.CSSProperties = {
      width: '100%',
      textAlign: 'left',
    };

  return (
    <div className='Compare'>
        <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={data}
            renderItem={(item) => (
            <List.Item>
                <Card 
                    title={item.title}
                    cover={<img alt="商品图片" src={logo} />}
                >
                    <Card.Grid style={gridStyle}><strong>价格：</strong>{item.price} 元</Card.Grid>
                    <Card.Grid style={gridStyle}><strong>配送地址：</strong>{item.address}</Card.Grid>
                    <Card.Grid style={gridStyle}><strong>配送时间：</strong>{item.delivery}</Card.Grid>
                    <Card.Grid style={gridStyle}><a href="http://www.w3school.com.cn">商品详情</a></Card.Grid>
                </Card>
            </List.Item>
            )}
        />
    </div>
  )
}
