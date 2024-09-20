import '../styles/NavButtons.css'
import arrow from '../assets/left-angle.png'
import home from '../assets/justify-align.png'


const NavButtons = ({ backButton }) => {

  const setBackButton = () => {
    backButton()
  }

  return (
    <div className="nav-buttons">
        <img className='home-btn' src={home} alt='icon'></img>
        <img className='back-btn' src={arrow} alt='icon' onTouchEnd={setBackButton}></img>
    </div>
  )
}

export default NavButtons