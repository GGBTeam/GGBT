import './index.scss'
import logo from '../../assets/logo16_9.png'
import SearchBar from '../../components/SearchBar'
import Compare from '../../components/Compare'

export default function Result() {
  return (
    <div className='Result'>
        <div className="top">
            <div className="logo"><img src={logo} alt="GGB"/></div>
            <SearchBar></SearchBar>
        </div>
        <div className="middle">
            <div className="left"></div>
            <div className="body">
				<Compare/>
            </div>
        </div>
    </div>
  )
}
