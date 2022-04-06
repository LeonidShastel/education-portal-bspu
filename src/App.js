import './App.css';
import {Anchor, Box, Footer, Grommet, Header, Heading, Layer, Main, Text} from "grommet";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import HeaderComponent from "./components/Header/HeaderComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import LogInPage from "./Pages/LogInPage/LogInPage";
import {useState} from "react";
import PersonalAccountPage from "./Pages/PersonalAccountPage/PersonalAccountPage";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";

const theme = {
    global: {
        font: {
            family: 'Rubik',
            size: '18px',
            height: '20px',
        },
    }
};


function App() {
    const [user, setUser] = useState({})

    return (
        <BrowserRouter>
            <Grommet theme={theme} full>
                <Box fill justify={"between"}>
                    <HeaderComponent user={user} setUser={setUser}/>
                    <Box fill justify={"center"}>
                        <Switch>
                            <Route path={"/login"}>
                                <LogInPage setUser={setUser}/>
                            </Route>
                            {user.login ? <Route path={`/${user.login}`}><PersonalAccountPage user={user}/></Route> : null}
                            <Route path={"/"}>
                                {user.login ? <CoursesPage user={user}/> : <HomePage user={user}/>}
                            </Route>
                        </Switch>
                    </Box>
                    <FooterComponent/>
                </Box>
            </Grommet>
        </BrowserRouter>
    );
}

export default App;
