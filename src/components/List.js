import React from 'react';

class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			launches: this.props.settings.launches,
			filteredLaunches: this.props.settings.launches,
			years: [],
			filteredYear: this.props.settings.filteredYear,
			filterOpen: this.props.settings.filterOpen,
			ascending: this.props.settings.ascending,
			isLoading: this.props.settings.isLoading,
			error: this.props.settings.error,
			reload: false
		}			

		this.handleASCToggle = this.handleASCToggle.bind(this);
		this.handleFilterToggle = this.handleFilterToggle.bind(this);
		this.handleYearSelect = this.handleYearSelect.bind(this);
		this.handleYearReset = this.handleYearReset.bind(this);
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
		// desired format - 24th Mar 2006
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

		// now build up format to return
		return day + this.nth(day) + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	handleASCToggle(e) {
		e.preventDefault();

		this.setState(state => ({
	    	ascending: !state.ascending,
	    	filteredLaunches: state.filteredLaunches.reverse()
	    }));
	}

	handleFilterToggle(e) {
		e.preventDefault();

		this.setState(state => ({
			filterOpen: !state.filterOpen
		}));
	}

	handleYearSelect(year, e) {
		this.setState(state => ({
			filteredYear: year,
			filterOpen: !state.filterOpen,
			filteredLaunches: state.launches.filter(launch => launch.launch_year === year)
		}));
	}

	handleYearReset() {
		this.setState(state => ({
			filteredYear: '',
			filterOpen: !state.filterOpen,
			filteredLaunches: state.launches
		}));
	}

	static getDerivedStateFromProps(props, state) {
		// trigger a reset if reload is called or new launches doesn't equal current list
		if (props.settings.reload || props.settings.launches.length !== state.launches.length) {
			return {
			    launches: props.settings.launches,
			    filteredLaunches: props.settings.launches,
			    years: Array.from(new Set(props.settings.launches.map(launch => launch.launch_year))), // get all the unique years,
                filteredYear: '',
                filterOpen: false,
                ascending: true
			};
		}
		
		return null;
	}

	render() {
		const { isLoading, error, years, filteredLaunches, filteredYear, filterOpen, ascending } = this.state;

		return (
			<div>
				<form>
					<div data-filter-year>
						<button onClick={this.handleFilterToggle} className={filterOpen ? 'open' : ''}>
							{filteredYear ? filteredYear : 'Filter by Year'}
						</button>
						<div data-filter-dropdown>
							<div data-filter-option onClick={this.handleYearReset}>Reset Filter</div>
							{years.map((year) => (
								<div data-filter-option key={year} onClick={(e) => this.handleYearSelect(year)}>{year}</div>
							))}
						</div>
					</div>
					<button data-sort onClick={this.handleASCToggle}>Sort {ascending ? 'Descending' : 'Ascending'}</button>
				</form>
				<div className="launches">
				{isLoading &&
					<p>Loading...</p>
				}

				{error &&
					<p>There was an error, please try again.</p>
				}

				{filteredLaunches.map((launch) => (
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