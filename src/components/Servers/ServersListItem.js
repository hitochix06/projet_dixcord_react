import styled from "styled-components";
const ServerListItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    background-color: var(--background-primary);
    border-radius: 100%;
    margin: 0.8rem 0;
    transition: all 0.1s linear;
    cursor: pointer;
    opacity: 0.8;
    color: white;
    text-transform: uppercase;

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
        height: 20px;
        width: 8px;
        margin-left: -100%;
        border-radius: 0 4px 4px 0;
        background-color: var(--primary);
        transition: all 0.2s linear;
    }
    > svg path {
        fill: white;
    }
`;
export default ServerListItem;
