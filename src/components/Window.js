import '../styles/Window.css'
import { FaRegWindowClose } from "react-icons/fa";
import Draggable from 'react-draggable';

const Window = ({ id, title, bringWindowToFront, closeWindow, display }) => {

	const setBringWindowToFront = () => {
		bringWindowToFront(id)
	};

	const setCloseWindow = () => {
		closeWindow(id)
	};

	return (
		<Draggable key={id}>
			<div className='window-container'
				style={{
					display: `${display ? "flex" : "none"}`
				}}
			>
				<div id={id} className='window-header'>
					<h4 onMouseDown={setBringWindowToFront}>{title}</h4>
					<FaRegWindowClose onClick={setCloseWindow}/>
				</div>
				<div className='window-content' onClick={setBringWindowToFront}>
				</div>
			</div>
		</Draggable>
	)
}

export default Window