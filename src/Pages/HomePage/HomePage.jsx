import React from 'react';
import {Box, Button, Heading, Main, Paragraph} from "grommet";
import {useHistory} from "react-router-dom";

const HomePage = ({user}) => {
    const history = useHistory();

    return (
        <Box align={"center"} >
            <Heading margin={{vertical: "medium"}}>Добро пожаловать</Heading>
            {
                user.name ? <Box direction={"row"} gap={"medium"} >
                    <Button label={"Перейти к обучению"} primary/>
                    <Button label={"Личный кабинет"} onClick={()=>history.push(`/${user.login}`)}/>
                </Box> : <Button label={"Авторизоваться"} onClick={()=>history.push("/login")}/>
            }
        </Box>
    );
};

export default HomePage;