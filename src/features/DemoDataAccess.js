import React from "react";
import {
	Text,
	FormControl,
	Input,
	FormLabel,
	Button,
	Box,
} from "@chakra-ui/core";
import db from "../data/database";
import Card from "../ui/Card";

export default class DataAccessDemo extends React.Component {
	state = { users: null };
	inputRef = React.createRef();

	componentDidMount() {
		this.fetchUsers();
	}

	fetchUsers() {
		console.log(this.props);
		const users = db.queryAll("users", {
			query: {
				failure: this.props.profile.failure,
				com: this.props.profile.com,
				know: this.props.profile.know,
				int: this.props.profile.int,
			},
		});
		this.setState({ users });
	}

	renderFounders() {
		const { users } = this.state;
		if (!users) return <Text>No posts yet</Text>;
		return users.map((user, index) => (
			<Card username={user.username} profile={user} key={index}></Card>
		));
	}

	render() {
		return (
			<>
				<Box borderWidth="1px" rounded="lg" p={6} overflow="hidden">
					<h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
						Welcome to our platform!
					</h1>
					<p>Based on your answers this are the best co-founder matches: </p>
					<Box d="flex">{this.renderFounders()}</Box>
				</Box>
			</>
		);
	}
}
