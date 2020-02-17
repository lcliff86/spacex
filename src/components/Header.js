import React from 'react';
import logo from '../assets/spacex-logo.png';

class Header extends React.Component {
	render() {
		return (
			<header>
	            <a 
	                href="/"
	                title="Spacex Launches Homepage"
	                className="logo"
	            >
	                <img src={logo} alt="Spacex Launches"/>
	            </a>
	            <button>Reload Data</button>
	        </header>
	    )
	}
}

export default Header;