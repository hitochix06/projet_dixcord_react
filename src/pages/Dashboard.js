import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import styled from "styled-components";
import Chat from "../components/Chat/Chat.js";
import Call from "../components/Chat/Call.js";
import DefaultChat from "../components/Chat/DefaultChat.js";
import ServersSidebar from "../components/Servers/ServersSidebar.js";
import ServersList from "../components/Servers/ServersList.js";
import ChannelsSidebar from "../components/Channels/ChannelsSidebar.js";
import Modal from "../components/Modal.js";

const Container = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    overflow: hidden;
`;

export default function ({ username }) {
    const [serverId, setServerId] = useState(null);
    const [serverName, setServerName] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [channelName, setChannelName] = useState(null);

    function ProtectedRoute({ children }) {
        if (!serverId) {
            return <Navigate to="/dashboard" replace />;
        }
        return children;
    }
    return (
        <Container>
            {/* <Modal></Modal> */}
            <Wrapper>
                <ServersSidebar>
                    <ServersList
                        setServerId={setServerId}
                        setServerName={setServerName}
                    />
                </ServersSidebar>
                <Routes>
                    <Route
                        path="/"
                        element={<DefaultChat username={username} />}
                    />

                    <Route
                        path="/:id/*"
                        element={
                            <ProtectedRoute>
                                <ChannelsSidebar
                                    serverId={serverId}
                                    serverName={serverName}
                                    setChannelId={setChannelId}
                                    setChannelName={setChannelName}
                                    channelName={channelName}
                                    username={username}
                                />
                                <Routes>
                                    <Route
                                        index
                                        element={
                                            <DefaultChat>
                                                Sélectionner un canal
                                            </DefaultChat>
                                        }
                                    />
                                    <Route
                                        path="/text/:id"
                                        element={
                                            <Chat
                                                serverId={serverId}
                                                channelId={channelId}
                                                channelName={channelName}
                                                username={username}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/voice/:id"
                                        element={<Call username={username} />}
                                    />
                                </Routes>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Wrapper>
        </Container>
    );
}
