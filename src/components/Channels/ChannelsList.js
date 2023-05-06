import styled from "styled-components";
import livechannel from "../../data/channels.json";
import { Link } from "react-router-dom";
import { ReactComponent as TextChannelLogo } from "../../images/hash.svg";
import { ReactComponent as VoiceChannelLogo } from "../../images/voice.svg";
import { ReactComponent as CaretDown } from "../../images/caret-down.svg";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";

const Channelcategories = styled.ul`
    align-items: center;
    padding-top: 1rem;
    color: var(--channels-default);
    cursor: pointer;
    &:hover {
        color: rgb(224, 225, 229);
    }
    h3 {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    > svg {
        width: 12px;
        height: 12px;
    }
`;
const ChannelGroup = styled.li`
    display: flex;
    align-items: center;
    padding-top: 1rem;
    color: var(--channels-default);
    cursor: pointer;
    &:hover {
        color: rgb(224, 225, 229);
    }
    h3 {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    > svg {
        width: 12px;
        height: 12px;
    }
`;
const AllChannels = styled.div`
    flex: 1 1 auto;
    list-style-type: none;
    padding: 0 0.5rem;
    z-index: 1;
    > ul {
        padding: 0;
        list-style: none;
    }
`;
const ChannelName = styled.li`
    display: flex;
    align-items: center;
    padding: 6px 1rem;
    color: var(--channels-default);
    cursor: pointer;
    &:hover {
        color: rgb(224, 225, 229);
        background-color: var(--hover-color);
    }
    h3 {
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    > svg {
        width: 20px;
        height: 20px;
    }
`;
export default function ChannelsList({ serverId,setChannelId, setChannelName }) {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        getDocs(collection(db, "servers", serverId, "channels")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setChannels(newData);
        });
    }, []);
    return (
        <AllChannels>
            <Channelcategories>
                <ChannelGroup>
                    <CaretDown />
                    <h3>Text channels</h3>
                </ChannelGroup>

                {channels
                    .filter((livechannel) => livechannel.type === "text")
                    .map((livechannel) => (
                        <Link
                            key={livechannel.id}
                            to={"text/" + livechannel.id}
                        >
                            <ChannelName
                                onClick={() => {
                                    setChannelId(livechannel.id);
                                    setChannelName(livechannel.name);
                                }}
                            >
                                <TextChannelLogo />
                                <h3>{livechannel.name}</h3>
                            </ChannelName>
                        </Link>
                    ))}
            </Channelcategories>

            <Channelcategories>
                <ChannelGroup>
                    <CaretDown />
                    <h3>Voice channels</h3>
                </ChannelGroup>
                {livechannel
                    .filter((livechannel) => livechannel.type === "voice")
                    .map((livechannel) => (
                        <Link
                            key={livechannel.id}
                            to={"voice/" + livechannel.id}
                        >
                            <ChannelName
                                onClick={() => {
                                    setChannelId(livechannel.id);
                                    setChannelName(livechannel.name);
                                }}
                            >
                                <VoiceChannelLogo />
                                <h3>{livechannel.name}</h3>
                            </ChannelName>
                        </Link>
                    ))}
            </Channelcategories>
        </AllChannels>
    );
}
