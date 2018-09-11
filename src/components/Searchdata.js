import React from 'react';
import { Fragment } from 'react';
import Results from './Results';
import Button from './Button';

const API_KEY = "1c9f14bf5d95836472ad4ab45290091c";

export default class Searchdata extends React.Component {
	constructor() {
		super();

		this.state = {
			showSearch: true,
			enableBtn: false,
			showWhat: "",
			name: "",
			country: "",
			list: [],
			categorizedList: [],
		}

		this.inputSearch = React.createRef();
	}

	validateInput = () => {
		const value = this.inputSearch.current.value.trim();

		value ? this.setState({enableBtn: true}) : this.setState({enableBtn: false}); // enable button if input field is not empty
	}

	search = () => {
		const city = this.inputSearch.current.value.trim();

		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`, 
			{ method: 'GET'})
			.then(response => response.json())
			.then(json => {
				// show results only if response is 200 
				if(json.cod === "200") {
					const city = json.city;

					this.setState(prevState => {
						return {
							showSearch: false,
							showWhat: "results",
							city: city.name,
							country: city.country,
							list: json.list,
							categorizedList: this.categorizeResults(json.list)
						}
					});
				}

				// if not found
				if(json.cod === "404") {
					this.setState({
						showSearch: false,
						showWhat: "notFound"
					});
				}

				return false;
			})
			.catch(error => {
				console.log('error', error);
			});
	}

	categorizeResults = (list) => {
		// get an array of all the dates
		// use values of that array to filter out the results
		const dates = list
			.map((item, i) => {
				return item.dt_txt.split(" ")[0];
			})
			.filter((item, i, currArr) => {
				return currArr.indexOf(item) === i;
			});
		// create a new object with those dates as keys
		let sortedResults = [];
		for(let theDate of dates) {
			sortedResults.push({
				name: theDate,
				weathers: []
			});
		}
		for(let item of list) {
			let itemDate = item.dt_txt.split(" ")[0]; // get the date in string form

			//if sortedResults.name = itemDate then push that item into that sortedResult's weathers array
			for(let result of sortedResults) {
				if(result.name === itemDate) {
					result.weathers.push(item);
				}
			}
		}
		return sortedResults;
	}

	handleClear = () => {
		this.setState({
			showSearch: true,
			enableBtn: false,
			showWhat: ""
		});
	}

	render() {
		return (
			<Fragment>
				{
					(this.state.showSearch)	?
						<div className="search-container">
							<label>Search by city Name:</label>
							<input type="text" 
								placeholder="CITY"
								ref={this.inputSearch}
								onKeyUp={this.validateInput} />
									
							<Button 
								isDisabled={!this.state.enableBtn}
								clickHandler={this.search}
								btnCopy="Click for Forecast-Report" />
						</div>
						: ""
				}

				{
					(this.state.showWhat) ? 
						<Results 
							showWhat={this.state.showWhat}
							city={this.state.city}
							country={this.state.country}
							results={this.state.categorizedList}
							handleClear={this.handleClear} />
						: ""		
				}

			</Fragment>
		);
	}
}