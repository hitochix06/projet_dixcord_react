import { useState } from "react";
import styled from "styled-components";
import ChannelsList from "./ChannelsList";
import { UserContainer } from "../Users/UserContainer";
import { ReactComponent as PlusLogo } from "../../images/plus.svg";
import { addChannel } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { signOut } from "@firebase/auth";

const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    width: 240px;
    flex: 0 0 auto;
    background: var(--background-secondary);
    padding: 0;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 48px;
    max-height: 48px;
    font-weight: 500;
    margin: 0;
    padding: 0 16px;
    transition: background-color 0.1s linear;
    box-shadow: var(--elevation-low);
    cursor: pointer;
    > h2 {
        color: var(--primary);
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        flex: 1;
        margin: 0;
    }
    > svg {
        height: 18px;
        width: 18px;
        path {
            fill: white;
        }
    }
    &:hover {
        background-color: var(--hover-color);
    }
`;

const BottomSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    font-size: 14px;
    font-weight: 500;
    padding: 0 8px;
    margin-bottom: 1px;
    background: var(--background-darker);
`;

const BottomButton = styled.button`
    outline: none;
    border: none;
    background: none;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    > svg path {
        fill: white;
    }
    &:hover {
        background-color: var(--hover-color);
        border-radius: 0.25rem;
        opacity: 1;
    }
`;

export default function ({
    serverId,
    serverName,
    username,
    setChannelId,
    setChannelName,
}) {
    const navigate = useNavigate();
    function handleLogout(){
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <Sidebar>
            <nav>
                <Header>
                    <h2>{serverName}</h2>
                    <PlusLogo />
                </Header>
                <ChannelsList
                    serverId={serverId}
                    setChannelId={setChannelId}
                    setChannelName={setChannelName}
                />
            </nav>
            <BottomSection>
                <UserContainer>{username}</UserContainer>
                    <BottomButton onClick={handleLogout}>
                        <svg
                            aria-hidden="true"
                            role="img"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M18 2H7C5.897 2 5 2.898 5 4V11H12.59L10.293 8.708L11.706 7.292L16.414 11.991L11.708 16.706L10.292 15.294L12.582 13H5V20C5 21.103 5.897 22 7 22H18C19.103 22 20 21.103 20 20V4C20 2.898 19.103 2 18 2Z"
                            ></path>
                        </svg>
                    </BottomButton>
            </BottomSection>
        </Sidebar>
    );
}
