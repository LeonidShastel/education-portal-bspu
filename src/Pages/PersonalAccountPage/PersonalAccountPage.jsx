import React from 'react';
import {Avatar, Box, Clock, Heading} from "grommet";
import {Code} from "grommet-icons";

const PersonalAccountPage = ({user}) => {
    return (
        <Box pad={"medium"} justify={"start"} fill>
            <Box direction={"row"} gap={"medium"} align={"center"} justify={"around"}>
                <Box gap={"medium"} direction={"row"} align={"center"}>
                    <Avatar background="dark-1" size={"large"}>
                        <Code size={"large"}/>
                    </Avatar>
                    <Heading level="1">{user.name}</Heading>
                </Box>
                <Clock type={"digital"} size={"large"}/>
            </Box>
        </Box>
    );
};

export default PersonalAccountPage;