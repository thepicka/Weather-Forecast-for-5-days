import React from 'react';
import Button from './Button';
import DataDetails from './DataDetails';

export default class Results extends React.Component {
	view = () => {
		const {showWhat, city, country, results} = this.props;

		console.log('results.prop', this.props);

		let resultsView; 
		switch(showWhat) {
			case "notFound":
				resultsView = <h2>Sorry! We couldn't find that city.</h2>;
				break;
			case "results":
				resultsView = <DataDetails city={city} country={country} results={results}/>;
				break;
			default:
				break;
		}

		return resultsView;
	}

	render() {
		return (
			<div className="results">
				{
					(this.props.showWhat) ? 
						<Button clickHandler={this.props.handleClear} 
							btnCopy="Click to go back for different Forecast" />
						: ""
				}
			<div className="reports">	{this.view()} </div>
			</div>
		);
	}
}