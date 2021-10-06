import React from "react";
import { Wrapper, Content } from "./Newest.styles";

const Newest=({header,children})=>(
    <Wrapper>
        <h2>{header}</h2>
        <Content>
            {children}
        </Content>
    </Wrapper>
);
export default Newest