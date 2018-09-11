import React from 'react';

export default class ForecastDetails extends React.Component {
	render() {
		return (
			<li>
				<span><strong>{this.props.date}</strong></span> 
				<img src={`https://openweathermap.org/img/w/${this.props.icon}.png`} alt={this.props.main}/>
				<span className="description">{this.props.description}</span>
				<p>
					<span className="high">MaxTemp: {this.props.max}</span><br></br>
					<span className="low">MinTemp: {this.props.min}</span>
				</p>
			</li>
		);
	}
}	