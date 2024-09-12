import '../styles/Window.css'
import { FaRegWindowClose } from "react-icons/fa";
import Draggable from 'react-draggable';

const Window = ({ id, title, bringWindowToFront, openWindow, display }) => {

	const setBringWindowToFront = () => {
		bringWindowToFront(id)
	}

	const setOpenWindow = () => {
		openWindow(id)
	}

	return (
		<Draggable key={id}>
		<div
			className='window-container'
			style={{
				display: `${display ? "flex" : "none"}`
			}}
		>
			<div
				id={id}
				className='window-header'
			>
				<h4
					onMouseDown={setBringWindowToFront}
				>{title}</h4>
				<FaRegWindowClose onClick={setOpenWindow} />
			</div>
			
			<div
				className='window-content'
				onClick={setBringWindowToFront}
				>

			</div>
		</div>
		</Draggable>
	)
}

export default Window