import '../styles/Desktop.css'
import Window from "./Window"
import Icon from './Icon';
import Header from './Header';
import NavButtons from './NavButtons';

import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

import ProjectsContent from './ProjectsContent';
import AboutContent from './AboutContent';
import ContactContent from './ContactContent';

import floppy from '../assets/floppy-disk.png'
import contact from '../assets/chat.png'
import about from '../assets/contact.png'

const Desktop = () => {

	const [windows, setWindows] = useState([
		{ id: "project-window", title: "Projects", display: false, content: ProjectsContent },
		{ id: "about-window", title: "About", display: false, content: AboutContent },
		{ id: "contact-window", title: "Contact", display: false, content: ContactContent },
	]);

	const [icons, setIcons] = useState([
		{ id: "project-icon", title: "Projects", position: { x: 50, y: 100 }, iconImg: floppy},
		{ id: "about-icon", title: "About", position: { x: 50, y: 200 }, iconImg: about},
		{ id: "contact-icon", title: "Contact", position: { x: 50, y: 300 }, iconImg: contact},
	]);

	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

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
			<Header />
			{windows.map((win) => (
				<Window
					key={win.id}
					id={win.id}
					title={win.title}
					bringWindowToFront={bringWindowToFront}
					display={win.display}
					closeWindow={closeWindow}
					Content={win.content}
				/>
			))}
				{icons.map((icon) => (
					<Icon
						key={icon.id}
						icon={icon}
						iconImg={icon.iconImg}
						openWindow={openWindow}
						bringWindowToFront={bringWindowToFront}
					/>
				))}
			{isMobile ? <NavButtons /> : isMobile}
		</div>
	)
}

export default Desktop