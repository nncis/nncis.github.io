import SkillIcon from './Skills-components/SkillsIcon';
import './Skills-components/Skills.css';

import css from './Skills-components/skill-assets/css8bit.png';
import html from './Skills-components/skill-assets/html8bit.png';
import js from './Skills-components/skill-assets/js8bit.png';
import react from './Skills-components/skill-assets/react8bit2.png';
import redux from './Skills-components/skill-assets/redux8bit.png';
import d3 from './Skills-components/skill-assets/d38bit.png';

import mongodb from './Skills-components/skill-assets/mongodb8bit.png';
import nodejs from './Skills-components/skill-assets/nodejs8bit.png';


const SkillsContent = () => {
	const responsiveWebDesignCertificate = 'https://www.freecodecamp.org/certification/fcc2f5bac6b-582c-40a5-baed-54fe5b67bac2/responsive-web-design';
	const frontEndDevelopmentLibraries = 'https://www.freecodecamp.org/certification/fcc2f5bac6b-582c-40a5-baed-54fe5b67bac2/front-end-development-libraries';
	
	const backEndDevelopmentandAPIsCertificate = 'https://www.freecodecamp.org/certification/fcc2f5bac6b-582c-40a5-baed-54fe5b67bac2/back-end-development-and-apis'

	const frontEndSkills = [
		{id: "html-skill", name: "HTML" , img: html, certificate: responsiveWebDesignCertificate},
		{id: "css-skill", name: "CSS" , img: css, certificate: responsiveWebDesignCertificate},
		{id: "js-skill", name: "Java Script" , img: js, certificate: responsiveWebDesignCertificate},
		{id: "react-skill", name: "React" , img: react, certificate: frontEndDevelopmentLibraries},
		{id: "redux-skill", name: "Redux" , img: redux, certificate: frontEndDevelopmentLibraries},
		{id: "d3-skill", name: "D3" , img: d3, certificate: frontEndDevelopmentLibraries}
	];
	const backEndSkills = [
		{id: "mongodb-skill", name: "MongoDB" , img: mongodb, certificate: backEndDevelopmentandAPIsCertificate},
		{id: "nodejs-skill", name: "NodeJs" , img: nodejs, certificate: backEndDevelopmentandAPIsCertificate}
	];
	
	return (
		<>
			<div className="section-header">
				<h2 className="section-title">Skills and certificates</h2>
			</div>

			<div className="skills-content">
				<h5>Front End Skills</h5>
				<div className='front-end-container'>
					{frontEndSkills.map(icon => 
						<SkillIcon img={icon.img} name={icon.name} key={icon.id} certificate={icon.certificate}/>
					)}
				</div>

				<h5>Back End Skills</h5>
				<div className='back-end-container'>
					{backEndSkills.map(icon => 
						<SkillIcon img={icon.img} name={icon.name} key={icon.id} certificate={icon.certificate} />
					)}
				</div>
			</div>
		</>
	)
}

export default SkillsContent