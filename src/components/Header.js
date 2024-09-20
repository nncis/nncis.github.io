import '../styles/Header.css'
import './Clock'
import Clock from './Clock'

const Header = () => {



  return (
    <div className="header">
      <h4 className='title-header'>Portfolio</h4>
      <Clock/>
    </div>
  )
}

export default Header