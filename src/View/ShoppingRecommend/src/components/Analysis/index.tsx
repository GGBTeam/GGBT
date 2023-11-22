import './index.scss'
import ChartE from '../ChartE'

export default function Analysis() {
  return (
    <div className='Analysis'>
        <div className="delivery"></div>
        <div className="priceAndEva">
            <ChartE></ChartE>
        </div>
    </div>
  ) 
}
