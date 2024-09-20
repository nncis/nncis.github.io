import '../styles/NavButtons.css'
import arrow from '../assets/left-angle.png'
import home from '../assets/justify-align.png'


const NavButtons = () => {



  return (
    <div className="nav-buttons">
        <img className='home-btn' src={home} alt='icon'></img>
        <img className='back-btn' src={arrow} alt='icon'></img>
    </div>
  )
}

export default NavButtons