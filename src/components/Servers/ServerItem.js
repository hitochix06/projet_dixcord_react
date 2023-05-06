import styled from "styled-components";
export const ServerItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    background-color: ${(props) =>
        props.isSelected ? "var(--blue);" : "var(--background-primary);"};
    border-radius: ${(props) => (props.isSelected ? "1rem" : "100%")};
    margin-bottom: 0.8rem;
    transition: all 0.1s linear;
    cursor: pointer;
    opacity: ${(props) => (props.isSelected ? "1" : "0.8")};
    color: white;
    &.add {
        > svg path {
            fill: var(--user-status-online);
        }
        &:hover {
            background-color: var(--user-status-online);
            > svg path {
                fill: white;
            }
        }
    }
    &:hover {
        background-color: var(--blue);
        border-radius: 1rem;
        opacity: 1;
        > span {
            margin-left: -1rem;
        }
    }
    > span {
        position: absolute;
        left: 0;
        display: block;
        height: ${(props) => (props.isSelected ? "40px" : "20px")};
        width: 8px;
        margin-left: ${(props) => (props.isSelected ? "-1rem" : "-100%")};
        border-radius: 0 4px 4px 0;
        background-color: var(--primary);
        transition: all 0.2s linear;
    }
    > svg path {
        fill: white;
    }
`;
