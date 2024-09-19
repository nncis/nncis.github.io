import Project from "./Project-components/Project"
import './Project-components/Project.css'


const ProjectsContent = () => {

	const content = [
		{id: "tribute-page" ,title: "Tribute Page", link: "https://codepen.io/Nahuel-Cisneros/full/vYMXqbY", img: "https://i.postimg.cc/fLQv4zy1/tribute-page.png"},
		{id: "Random-quote" ,title: "Random Quote Machine", link: "https://i.postimg.cc/J4BHQ4DV/Random-quote-machine.jpg", img: "https://i.postimg.cc/J4BHQ4DV/Random-quote-machine.jpg"},
		{id: "heat-map", title: "Heat Map", link: "https://codepen.io/Nahuel-Cisneros/pen/oNmJpaE", img: "https://i.postimg.cc/bNfWxGDF/Heat-Map.jpg"},
		{id:"drum-machine", title: "Drum Machine", link: "https://codepen.io/Nahuel-Cisneros/pen/gOQdmww?editors=0010", img: "https://i.postimg.cc/ydBK5KTN/drum-machine.png"},
		{id: "scatterplot-graph",title: "Scatterplot Graph", link: "https://codepen.io/Nahuel-Cisneros/pen/oNmJpaE", img: "https://i.postimg.cc/TYwxs9ZP/Scatterplot-Graph.jpg"},
		{id: "choropleth-map",title: "Choropleth Map", link: "https://codepen.io/Nahuel-Cisneros/pen/qBggWjy", img: "https://i.postimg.cc/nr9spRYT/Choropleth-Map.jpg"},
	]

	return (
		<>
		<div className="project-section-header">
			<h2 className="project-section-title">Some of my freecodecamp projects</h2>
		</div>
		<div className="projects-grid">
			{content.map(content => (
				<Project 
					key={content.id}
					title={content.title}
					link={content.link}
					img={content.img}
				/>
			))}
		</div>
		</>
	)
}

export default ProjectsContent