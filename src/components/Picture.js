import React from 'react';
import launchHome from '../assets/img/launch-home.png';
import launchHome2 from '../assets/img/launch-home@2x.png';
import launchHome3 from '../assets/img/launch-home@3x.png';

class Picture extends React.Component {
	render() {
		return (
			<picture>
				<source
					srcSet={launchHome2}
					media="(min-width: 480px)"
				/>
				<source
					srcSet={launchHome3}
					media="(min-width: 768px)"
				/>
				<img src={launchHome} alt="Spacex Launch"/>
			</picture>
	    )
	}
}

export default Picture;