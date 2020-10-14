import React from "react";
import { Redirect } from "react-router-dom";

export default class LogoutPage extends React.Component {
	componentDidMount() {
		if (this.props.logout) {
			this.props.logout();
		}
	}

	render() {
		return <Redirect to="/" />;
	}
}
