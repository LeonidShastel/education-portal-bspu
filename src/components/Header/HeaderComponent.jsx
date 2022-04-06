import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {Header, Heading, Menu} from "grommet";

const HeaderComponent = ({user, setUser}) => {
    const history = useHistory();

    const [menuItems, setMenuItems] = [user.name ? [
        {
            label: "Личный кабинет",
            onClick: ()=>history.push(`/${user.login}`)
        },
        {
            label: "Выход",
            onClick: ()=>setUser({})
        }] :
        [{
            label: "Вход в личный кабинет",
            onClick: (()=>history.push("/login"))
        }]
    ]

    return (
        <Header background={"brand"}>
            <Link to={"/"} style={{textDecoration: "none", color: "white"}}>
                <Heading margin={"medium"} level={"3"}>
                    Education portal of BSPU
                </Heading>
            </Link>
            <Menu label={user.name ? user.name : "Меню"} items={menuItems}/>
        </Header>
    );
};

export default HeaderComponent;