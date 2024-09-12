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
		{ id: "project-icon", title: "My Projects", img: TbDevicesPc, position: {initialX: 20, initialY: 20}},
		{ id: "about-icon", title: "About me", img: GrDocumentText, position: {initialX: 20, initialY: 20}},
		{ id: "contact-icon", title: "Contact me", img: IoMdPerson, position: {initialX: 20, initialY: 20}},
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
				win.id === idModified ? { ...win, display: !win.display } : win
			)
		)
	}

	return (
		<div className="desktop">
			{windows.map((win) => (
				<Window
					key={win.id}
					id={win.id}
					title={win.title}
					bringWindowToFront={bringWindowToFront}
					display={win.display}
					openWindow={openWindow}
				/>
			))}
			<div className='icons-area'>
				{icons.map((icon) => (
					<Icon
						key={icon.id}
						id={icon.id}
						title={icon.title}
						IconImg={icon.img}
						openWindow={openWindow}
						bringWindowToFront={bringWindowToFront}
						initialX={icon.initialX}
						initialY={icon.initialY}
					/>
				))}
			</div>
		</div>
	)
}

export default Desktop