import '../styles/Icon.css'

const Icon = ({ icon, IconImg, openWindow, bringWindowToFront }) => {

	const setBringWindowToFront = () => {
		bringWindowToFront(icon.id)
	};

	const setOpenWindow = () => {
		openWindow(icon.id)
	};

	const handleMultipleFunction = () => {
		setOpenWindow();
		setBringWindowToFront();
	};

	const handleDragStart = (event) => {
		event.dataTransfer.setData('text/plain', event.target.id);
	};

	return (
			<div
				id={icon.id}
				style={{top: `${icon.position.y}px`, left: `${icon.position.x}px` }}
				onClick={handleMultipleFunction}
				className='icon-container'
				onDragStart={handleDragStart}
				draggable
			>
				<IconImg size={30} />
				<h5>{icon.title}</h5>
			</div>
	)
}

export default Icon