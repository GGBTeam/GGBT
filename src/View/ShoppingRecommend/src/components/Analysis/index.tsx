import './index.scss'
import ReviewPrice from '../ReviewPrice'
import Platform from '../Platform'

export default function Analysis() {
  return (
    <div className='Analysis'>
        <div className="ReviewPrice">
            <ReviewPrice></ReviewPrice>
        </div>
        <div className="Platform">
            <Platform></Platform>
        </div>
    </div>
  ) 
}
