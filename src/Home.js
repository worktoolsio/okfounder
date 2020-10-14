import React from "react";
import Card from "./ui/Card";
import DataAccessDemo from "./features/DemoDataAccess";

const Home = ({ username, profile }) => {
	return <DataAccessDemo username={username} profile={profile} />;
};

export default Home;
