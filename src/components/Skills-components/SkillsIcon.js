// import '../Skills-components/Skills.css';

const SkillIcons = ({ img, name, certificate }) => {

	return (
		<div className="skill-icon">
      <a  href={certificate} target="_blank" rel="noreferrer">
        <img src={img} alt="icon"></img>
				<p className="skill-name">{name}</p>
      </a>
		</div>
	)
}

export default SkillIcons