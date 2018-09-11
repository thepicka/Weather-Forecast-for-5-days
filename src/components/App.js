import React from 'react';
import { Fragment } from 'react';
import '../styles/App.css';
import Searchdata from './Searchdata'

export default class App extends React.Component {
	render() {
		return (
			<Fragment>
				<Searchdata />
			</Fragment>
		);
	}
}