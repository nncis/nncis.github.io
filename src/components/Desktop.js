import '../styles/Desktop.css'
import Window from "./Window"
import Icon from './Icon';
import { useState } from "react";

import { TbDevicesPc } from "react-icons/tb";
import { GrDocumentText } from "react-icons/gr";
import { IoMdPerson } from "react-icons/io";

const Desktop = () => {

	const [windows, setWindows] = useState([
		{ id: "project-window", title: "My Projects", display: false },
		{ id: "about-window", title: "About me", display: false },
		{ id: "contact-window", title: "Contact Me", display: false },
	]);

	const [icons, setIcons] = useState([
		{ id: "project-icon", title: "My Projects", img: TbDevicesPc, position: { x: 100, y: 100 } },
		{ id: "about-icon", title: "About me", img: GrDocumentText, position: { x: 100, y: 150 } },
		{ id: "contact-icon", title: "Contact me", img: IoMdPerson, position: { x: 100, y: 200 } },
	]);


	const bringWindowToFront = (id) => {
		const idModified = id.replace("-icon", "-window");
		setWindows((prevWindows) => {
			const windowToFront = prevWindows.find((win) => win.id === idModified);
			const otherWindows = prevWindows.filter((win) => win.id !== idModified);
			return [...otherWindows, windowToFront];
		})
	}

	const openWindow = (id) => {
		const idModified = id.replace("-icon", "-window");
		setWindows((prevWindows) =>
			prevWindows.map(win =>
				win.id === idModified ? { ...win, display: true } : win
			)
		)
	}

	const closeWindow = (id) => {
		setWindows((prevWindows) =>
			prevWindows.map(win =>
				win.id === id ? { ...win, display: false } : win
			)
		)
	}

	const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain')
    const x = event.clientX 
    const y = event.clientY 

    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === data
          ? { ...icon, position: {x: x - 45, y: y - 37}} 
          : icon
      )
    );
  };

	return (
		<div 
		className="desktop" 
		onDragOver={handleDragOver}
		onDrop={handleDrop}
		>
			{windows.map((win) => (
				<Window
					key={win.id}
					id={win.id}
					title={win.title}
					bringWindowToFront={bringWindowToFront}
					display={win.display}
					closeWindow={closeWindow}
				/>
			))}
				{icons.map((icon) => (
					<Icon
						icon={icon}
						IconImg={icon.img}
						openWindow={openWindow}
						bringWindowToFront={bringWindowToFront}
					/>
				))}
		</div>
	)
}

export default Desktop