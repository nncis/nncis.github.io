import '../styles/Window.css'
import Draggable from 'react-draggable';
import closeIcon from '../assets/maximize.png'
import expandIcon from '../assets/expand.png'
import minimizeIcon from '../assets/minimize.png'

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Window = ({ id, title, bringWindowToFront, closeWindow, display, Content }) => {

	const [position, setPosition] = useState({ x: 20, y: 50});
	const [windowSize, setWindowSize] = useState({width: '90rem', height: '70rem'});
	const [isExpand, setIsExpand] = useState(false);
	
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

	const setBringWindowToFront = () => {
		bringWindowToFront(id)
	};

	const setCloseWindow = () => {
		closeWindow(id)
	};

	const expandWindow = () => {
		if(!isExpand){
			setWindowSize({ width: '100%', height: '98%' })
			setPosition({ x: 0, y: 38})
			setIsExpand(!isExpand)
		} else {
			setWindowSize({ width: '90rem', height: '70rem' })
			setIsExpand(!isExpand)
		}
		
	}

	const handleDrag = (e, data) => {
		setPosition({ x: data.x, y: data.y });
	  };

	return (
		<Draggable key={id} 
			defaultPosition={{ x: 200, y: 50 }} 
			position={isMobile ? {x: 0, y: 0} : position} 
			onDrag={handleDrag}
			handle='.window-header'
			bounds={{ top: 38 }}
			>
			<div className='window-container' 
				style={{ 
					display: `${display ? "flex" : "none"}`,
					width: `${isMobile ? '100%' : windowSize.width}`,
					height: `${isMobile ? '97%' : windowSize.height}`,
					}}>
				<div id={id} className='window-header'>
					<h4 onMouseDown={setBringWindowToFront}>{title}</h4>
					<div className='window-btns'>
						<img className='maximize-icon' src={isExpand ? minimizeIcon : expandIcon} onClick={expandWindow} alt='icon'></img>
						<img className='close-icon' src={closeIcon} onClick={setCloseWindow} alt='icon'></img>
					</div>
				</div>
				<div className='window-content' onClick={setBringWindowToFront}>
					<Content />
				</div>
			</div>
		</Draggable>
	)
}

export default Window