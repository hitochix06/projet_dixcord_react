import styled from "styled-components";
import background from "../../images/background.png";
export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url(${background});
    background-size: contain;
`;
