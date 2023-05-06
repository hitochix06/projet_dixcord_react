import styled from "styled-components";

const ModalContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 40vh;
    background-color: var(--background-secondary);
    z-index: 1;
`;

export default function ({ children }) {
    return <ModalContainer>{children}</ModalContainer>;
}
