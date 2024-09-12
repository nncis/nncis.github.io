import '../styles/Icon.css'
import Draggable from 'react-draggable';
import { useState } from 'react';

const Icon = ({ id, title, IconImg, openWindow, bringWindowToFront, initialY, initialX }) => {

	const [position, setPostition] = useState({ x: initialX , y: initialY });

	const setBringWindowToFront = () => {
		bringWindowToFront(id)
	};

	const setOpenWindow = () => {
		openWindow(id)
	};

	const handleMultipleFunction = () => {
		setOpenWindow();
		setBringWindowToFront();
	};

	const handleDrag = (e, data, id) => {
		
	};

return (
<Draggable key={id} bounds="parent" onDrag={(e, data) => handleDrag(e, data, id)}>
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