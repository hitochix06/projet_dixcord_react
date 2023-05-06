import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DiscordLogo } from "../../images/discord.svg";
import { ReactComponent as PlusLogo } from "../../images/plus.svg";
import ServerListItem from "./ServersListItem.js";

const Separator = styled.span`
    display: block;
    margin: auto;
    width: 32px;
    height: 2px;
    border-radius: 1px;
    background-color: var(--separator-color);
`;

export default function ({ setServerId, setServerName }) {
    const [servers, setServers] = useState([]);
    useEffect(() => {
        getDocs(collection(db, "servers")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setServers(newData);
        });
    }, []);
    return (
        <nav>
            <Link to="">
                <ServerListItem
                    onClick={() => {
                        setServerId(null);
                        setServerName(null);
                    }}
                >
                    <span></span>
                    <DiscordLogo />
                </ServerListItem>
            </Link>
            <Separator />
            {servers.map((server) => (
                <Link key={server.id} to={server.name}>
                    <ServerListItem
                        onClick={() => {
                            setServerId(server.id);
                            setServerName(server.name);
                        }}
                    >
                        <span></span>
                        {server.name.substring(0, 1)}
                    </ServerListItem>
                </Link>
            ))}

            <ServerListItem className="add">
                <PlusLogo />
            </ServerListItem>
        </nav>
    );
}
