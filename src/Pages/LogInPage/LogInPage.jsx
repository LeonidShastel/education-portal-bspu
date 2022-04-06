import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    TextInput,
    Text, Spinner
} from "grommet";
import {useHistory} from "react-router-dom";
import axios from "axios";

const LogInPage = ({setUser}) => {
    const history = useHistory();
    const [logInError, setLogInError] = useState({
        status: false,
        message: ""
    });
    const [waitResponse, setWaitResponse] = useState(false);

    const [inputData, setInputData] = useState({
        login: "",
        password: ""
    });

    const LogIn = () => {
        setWaitResponse(true);
        setLogInError({
            status: false,
            message: ""
        })
        axios.get(`http://localhost/users?login=${inputData.login}&password=${inputData.password}`)
            .then(({data}) => {
                if (data.data.length) {
                    setUser({
                        id: data.data[0].id,
                        login: data.data[0].login,
                        name: `${data.data[0]["first_name"]} ${data.data[0]["last_name"]}`,
                        permissions: data.data[0].permissions
                    });
                    history.push("/");
                } else {
                    setLogInError({
                        status: true,
                        message: "Неверный логин или пароль"
                    });
                }
            })
            .catch(() => {
                setLogInError({
                    status: true,
                    message: "Ошибка ответа сервера"
                })
            })
            .finally(() => {
                setWaitResponse(false);
            });
    }

    const HandleKeyPress = (e) => {
        if (e.key === "Enter")
            LogIn();
    };

    return (
        <Box align={"center"}>
            <Card width={"medium"} pad={"medium"} justify={"between"} background={"light-1"}>
                <CardHeader pad={{vertical: "medium"}} justify={"center"}>
                    <Heading size={"small"}>Окно авторизации</Heading>
                </CardHeader>
                <CardBody onKeyPress={HandleKeyPress}>
                    <TextInput style={{marginBottom: "10px"}} placeholder={"Логин"} value={inputData.login}
                               onChange={e => setInputData({...inputData, login: e.target.value})}/>
                    <TextInput placeholder={"Пароль"} value={inputData.password}
                               onChange={e => setInputData({...inputData, password: e.target.value})}
                               type={"password"}/>
                </CardBody>
                <CardFooter pad={{vertical: "medium"}} justify={"center"} direction={"column"}>

                    {logInError.status ? <Text color={"status-error"}>{logInError.message}</Text> : null}
                    {waitResponse ? <Spinner size={"small"}/> : null}
                    <Button hoverIndicator label={"Ввойти"} onClick={LogIn}/>
                </CardFooter>
            </Card>

        </Box>
    );
};

export default LogInPage;