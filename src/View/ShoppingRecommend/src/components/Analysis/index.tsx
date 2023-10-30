import './index.scss'
import ChartStackLine from '../ChartStackLine'

export default function Analysis() {
  return (
    <div className='Analysis'>
        <div className="delivery"></div>
        <div className="priceAndEva">
            <ChartStackLine/>
        </div>
    </div>
  )
}
