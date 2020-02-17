import React from 'react';
import logo from '../assets/spacex-logo.png';

class Header extends React.Component {
	render() {
		return (
			<header>
				<div className="container">
		            <a 
		                href="/"
		                title="Spacex Launches Homepage"
		                className="logo"
		            >
		                <img src={logo} alt="Spacex"/> <span>Launches</span>
		            </a>
		            <button onClick={this.props.action}>Reload Data</button>
	            </div>
	        </header>
	    )
	}
}

export default Header;