import { useNavigate } from 'react-router-dom'
import './index.scss'
import logo from '../../assets/logo16_9.png'
import SearchBar from '../../components/SearchBar'
import Compare from '../../components/Compare'
import Analysis from '../../components/Analysis'


export default function Result() {

  const navigate = useNavigate();

  const toHome = () => {
    navigate('/Home');
  }

  return (
    <div className='Result'>
        <div className="top">
            <div className="logo" onClick={toHome}><img src={logo} alt="GGB"/></div>
            <SearchBar></SearchBar>
        </div>
        <div className="middle">
            <div className="left"></div>
            <div className="body"><Compare/></div>
            <div className="right"><Analysis/></div>
        </div>
    </div>
  )
}
