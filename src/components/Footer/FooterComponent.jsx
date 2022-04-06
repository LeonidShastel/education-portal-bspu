import React from 'react';
import {Anchor, Footer, Text} from "grommet";

const FooterComponent = () => {
    return (
        <Footer background={"brand"} pad={"medium"}>
            <Text>Copyright, 2022</Text>
            <Text>Leonid Shastell</Text>
        </Footer>
    );
};

export default FooterComponent;