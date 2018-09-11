import React from 'react';
import { Fragment } from 'react';
import '../styles/App.css';
import { formatDate, formatTime } from '../_index'; 

import ForecastDetails from './ForecastDetails';

export default class DataDetails extends React.Component {
	render() {
		const {city, country, results} = this.props;

		return (
			<Fragment>
				<h2>{city}, {country}</h2>

				{
					results.map((result, i) => {
						return (
							<div className="date" key={i}>
								<h3>{formatDate(result.name)}</h3>
								
								{/*  forecasts data set into 2 rows*/}
								<ul className="row"> 
									{
										result.weathers.slice(0,4) // first 4
											.map((weatherItem, i) => 
												<ForecastDetails key={i}
													date={formatTime(weatherItem.dt_txt.split(' ')[1])}
													icon={weatherItem.weather[0].icon}
													main={weatherItem.weather[0].main}
													description={weatherItem.weather[0].description}
													max={Math.round(weatherItem.main.temp_max)}
													min={Math.round(weatherItem.main.temp_min)} />)
									}
								</ul>

								<ul className="row">
									{
										result.weathers.slice(4) // remaining
											.map((weatherItem, i) => 
												<ForecastDetails key={i}
													date={formatTime(weatherItem.dt_txt.split(' ')[1])}
													icon={weatherItem.weather[0].icon}
													main={weatherItem.weather[0].main}
													description={weatherItem.weather[0].description}
													max={Math.round(weatherItem.main.temp_max)}
													min={Math.round(weatherItem.main.temp_min)} />)
									}
								</ul>
							</div>	
						)
					})
				}
			</Fragment>
		);
	}
}