import React from "react";
import {
	Box,
	Image,
	Flex,
	Badge,
	Text,
	Button,
	StarIcon,
	Icon,
} from "@chakra-ui/core";

const Card = ({ username, profile }) => {
	// let rating = 3;
	// let count = 42;
	return (
		<Box
			maxW="sm"
			mb={4}
			mt={4}
			borderWidth="1px"
			rounded="lg"
			overflow="hidden"
			p="4"
			m="4"
		>
			<h1 style={{ fontSize: "2rem" }}>{username}:</h1>
			<p style={{ fontSize: "1rem" }}>👴🏻: {profile.age}</p>
			<p style={{ fontSize: "1rem" }}>😱 --> {profile.failure}</p>
			<p style={{ fontSize: "1rem" }}>🗣 --> {profile.com}</p>
			<p style={{ fontSize: "1rem" }}>🧠 --> {profile.know}</p>
			<p style={{ fontSize: "1rem" }}>🤥 --> {profile.int}</p>
		</Box>
	);
};

export default Card;
