import '../styles/Icon.css'
import Draggable from 'react-draggable';

const Icon = ({ id, title, IconImg, openWindow, bringWindowToFront }) => {

	const setBringWindowToFront = () => {
		bringWindowToFront(id)
	}

	const setOpenWindow = () => {
		openWindow(id)
	}

	const handleMultipleFunction = () => {
		setOpenWindow();
		setBringWindowToFront();
	}

return (
<Draggable key={id} bounds="parent">
	<div 
		id={id}
		className='icon-container'
		onClick={handleMultipleFunction}
		>
		<IconImg size={30}/>
		<h5>{title}</h5>
	</div>
</Draggable>	
	)
}

export default Icon