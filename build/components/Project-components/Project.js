
const Project = ({ title, link, img}) => {
	return (
		<>
			<a className="project-tile" href={link} target="_blank" rel="noreferrer">
				<img className="project-img" src={img} alt=""></img>
				<p className="project-title">{title}</p>
			</a>
		</>
	)
}

export default Project