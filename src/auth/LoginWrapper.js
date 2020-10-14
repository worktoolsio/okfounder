import React from "react";
import {
	Box,
	Flex,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/core";
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from "@chakra-ui/core";
import { Radio, RadioGroup } from "@chakra-ui/core";
import Header from "../ui/Header";

export default class LoginWrapper extends React.Component {
	state = {
		username: localStorage.getItem("username") || null,
		profile: JSON.parse(localStorage.getItem("profile")) || null,
	};

	login = (username, ageRef, failureRef, comRef, knowRef, intRef) => {
		const profile = {
			username: username,
			age: ageRef.current.value,
			failure: failureRef.current.lastChild.value,
			com: comRef.current.lastChild.value,
			know: knowRef.current.lastChild.value,
			int: intRef.current.lastChild.value,
		};
		localStorage.setItem("profile", JSON.stringify(profile));

		localStorage.setItem("username", username);
		this.setState({ username: username });
		this.setState({ profile: profile });
	};

	logout = () => {
		localStorage.removeItem("username");
		this.setState({ username: undefined });
	};

	handleChange = (e) => {
		console.log(e.lastChild);
		console.log(e);

		// this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let { username } = this.state;
		let { profile } = this.state;

		let nameRef = React.createRef();
		let ageRef = React.createRef();
		let failureRef = React.createRef();
		let comRef = React.createRef();
		let knowRef = React.createRef();
		let intRef = React.createRef();

		// If we are logged in, then pass the username to the children.
		if (username) {
			return this.props.children({
				username,
				profile: profile,
				logout: this.logout,
			});
		}

		//  Otherwise, show a login form.
		return (
			<Flex direction="column" align="center">
				<Box width={"100%"} maxWidth={"1000px"} pl={2} pr={2}>
					<Header />

					<Box
						maxW="700px"
						borderWidth="1px"
						rounded="lg"
						p={6}
						m={"auto"}
						overflow="hidden"
					>
						<h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
							Tell us about yourself:
						</h1>

						<FormControl>
							<FormLabel>Username</FormLabel>
							<Input ref={nameRef} onChange={(e) => this.handleChange(e)} />
							<FormHelperText>Your email, or literally anything</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Age:</FormLabel>
							<Input ref={ageRef} type="number" />
							<FormHelperText>Your physical age</FormHelperText>
						</FormControl>

						<br />
						<h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
							How comfortable are you with he following:
						</h1>

						<FormControl>
							<FormLabel>Afraid of failure 😱</FormLabel>
							<Slider
								defaultValue={0}
								ref={failureRef}
								// onChange={(e) => this.handleChange(e)}
								min={0}
								max={10}
								step={1}
							>
								<SliderTrack />
								<SliderFilledTrack />
								<SliderThumb />
							</Slider>
						</FormControl>
						<FormControl>
							<FormLabel>Communication 🗣</FormLabel>
							<Slider
								defaultValue={0}
								ref={comRef}
								// onChange={(e) => this.handleChange(e)}
								min={0}
								max={10}
								step={1}
							>
								<SliderTrack />
								<SliderFilledTrack />
								<SliderThumb />
							</Slider>
						</FormControl>
						<FormControl>
							<FormLabel>Knowledge/Learning 🧠</FormLabel>
							<Slider
								defaultValue={0}
								ref={knowRef}
								// onChange={(e) => this.handleChange(e)}
								min={0}
								max={10}
								step={1}
							>
								<SliderTrack />
								<SliderFilledTrack />
								<SliderThumb />
							</Slider>
						</FormControl>
						<FormControl>
							<FormLabel>Integrity/Honesty 🤥</FormLabel>
							<Slider
								defaultValue={0}
								ref={intRef}
								// onChange={(e) => this.handleChange(e)}
								min={0}
								max={10}
								step={1}
							>
								<SliderTrack />
								<SliderFilledTrack />
								<SliderThumb />
							</Slider>
						</FormControl>

						<br />
						<h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
							Your passions:
						</h1>

						<FormControl>
							<FormLabel>Favorite animal?</FormLabel>
							<RadioGroup defaultValue="1" spacing={5} isInline>
								<Radio value="1">🐈</Radio>
								<Radio value="2">🐕</Radio>
							</RadioGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Pizza on pineapple?</FormLabel>
							<RadioGroup defaultValue="1" spacing={5} isInline>
								<Radio value="1">👍</Radio>
								<Radio value="2">👎</Radio>
							</RadioGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Favorite food?</FormLabel>
							<RadioGroup defaultValue="1" spacing={5} isInline>
								<Radio value="1">🥩</Radio>
								<Radio value="2">🥦</Radio>
							</RadioGroup>
						</FormControl>

						<FormControl>
							<Button
								mt={4}
								onClick={() =>
									this.login(
										nameRef.current.value,
										ageRef,
										failureRef,
										comRef,
										knowRef,
										intRef
									)
								}
							>
								Login
							</Button>
						</FormControl>
					</Box>
				</Box>
			</Flex>
		);
	}
}
