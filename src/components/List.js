import React from 'react';
import logo from '../assets/spacex-logo.png';

class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			launches: [],
			filteredYear: '',
			ascending: true
		}

		this.handleToggle = this.handleToggle.bind(this);
	}

	getLaunches() {
		fetch('https://api.spacexdata.com/v3/launches')
		.then(res => res.json())
		.then((data) => {
			this.setState({ launches: data })
			console.log(this.state.launches)
		})
		.catch(console.log)
	}

	componentDidMount() {
		// get list here from API
		this.getLaunches();
	}

	nth(d) {
		if (d > 3 && d < 21) return 'th';
			switch (d % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
	}

	formatDate(date) {
		// 24th Mar 2006
		const monthNames = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];
		const newDate = new Date(date);
		const day = newDate.getDate();
		var monthIndex = newDate.getMonth();
		var year = newDate.getFullYear();

		return day + this.nth(day) + ' ' + monthNames[monthIndex] + ' ' + year;
		
		//return newDate;
	}

	handleToggle() {
		this.setState(state => ({
	    	ascending: !state.ascending
	    }));
	}

	render() {
		return (
			<div>
				<form>
					<div data-filter-year>
						<button>{this.state.filteredYear ? this.state.filteredYear : 'Filter by Year'}</button>
					</div>
					<button data-sort onClick={this.handleToggle}>Sort {this.state.ascending ? 'Descending' : 'Ascending'}</button>
				</form>
				<div className="launches">
				{this.state.launches.map((launch, index) => (
					<div className="launch" key={launch.flight_number}>
						<span className="number">#{launch.flight_number}</span>
						<span className="name">{launch.mission_name}</span>
						<div className="details">
							<span className="date">{this.formatDate(launch.launch_date_utc)}</span><span className="rocket">{launch.rocket.rocket_name}</span>
						</div>
					</div>
				))}
				</div>
			</div>
	    )
	}
}

export default List;