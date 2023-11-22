import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from 'antd';
const { Search } = Input;
import './index.scss'
import { ResContext } from '../../App'


export default function SearchBar() {

    const navigate = useNavigate();
    const { setResult } = useContext(ResContext)!

    // 搜索处理
    const onSearch = (value: any) => {
      if(!value) return ;
      navigate('/Result');
      axios.get(`http://yyjbye.natappfree.cc/Search?name=${value}`).then(
        res => {
          setResult(res.data.result)
        },
        err => {
          console.log('err->', err);
        }
      )
    } 

  return (
    <div className="SearchBar">
        <Search placeholder="输入详细商品信息" classNames={{input: 'search'}} onSearch={onSearch} enterButton/>
    </div>
  )
}
