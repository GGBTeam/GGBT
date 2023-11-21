import { useNavigate } from 'react-router-dom';
import './index.scss'
import axios from 'axios';
import { Input} from 'antd';
const { Search } = Input;

export default function SearchBar() {

    const navigate = useNavigate();

    const onSearch = (value: any) => {
      navigate('/Result');
      axios.get(`https://funky-amoeba-steady.ngrok-free.app/Search?name=${value}`).then(
        res => {
          console.log('res->', res);
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
