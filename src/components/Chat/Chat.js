import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Chat.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";
import { useState } from "react";
import SidebarUsers from "../Users/SidebarUsers";
import ChatHeader from "./ChatHeader";
import { randomPropertyValue } from "../../Utils";
import Messages from "./Messages";
import { addMessage } from "../../api/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: var(--background-primary);
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 80vh;
  overflow-y: scroll;
`;
const InputContainer = styled.div`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  background-color: var(--background-primary);
  z-index: 1;
  @media screen and (max-height: 600px) {
    padding-bottom: 4rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: var(--background-textarea);
  padding: 11px 0;
  padding-right: 1rem;
  border-radius: 0.5rem;
`;

const ButtonMedia = styled.button`
  background: transparent;
  border: none;
  padding: 0 1rem;
  cursor: pointer;
  svg {
    fill: var(--media-text);
  }
  &:hover {
    svg {
      fill: var(--text);
    }
  }
`;

const EmojiPickerButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  .emoji-mart-emoji > span {
    position: absolute;
    right: 0.5rem;
    bottom: 0;
    transform: scale(1);
    filter: grayscale(100);
    transition: all 0.1s linear;
  }
  &:hover .emoji-mart-emoji > span {
    transform: scale(1.1);
    filter: grayscale(0);
  }
`;

const EmojiPicker = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 4rem;
`;

export default function ({ username, channelName, serverId, channelId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebarUsers, setShowSidebarUsers] = useState(false);
  const [randomEmoji, setRandomEmoji] = useState(
    randomPropertyValue(data.categories[0].emojis)
  );

  init({ data });
  function onKeyDown(e) {
    if ((e.charCode || e.keyCode) === 13) {
      e.preventDefault();
      addMessage(e, serverId, channelId, setMessages, message, username);
      setMessage("");
    }
  }

  return (
    <Container>
      <ChatHeader
        channelName={channelName}
        setShowSidebarUsers={setShowSidebarUsers}
        showSidebarUsers={showSidebarUsers}
      />
      <Wrapper>
        <Chat>
          <MessagesWrapper>
            <Messages
              messages={messages}
              setMessages={setMessages}
              serverId={serverId}
              channelId={channelId}
            />
          </MessagesWrapper>
          <InputContainer>
            <InputWrapper>
              <ButtonMedia>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path>
                </svg>
              </ButtonMedia>
              <TextareaAutosize
                maxRows={15}
                className={styles.textArea}
                placeholder="Message #general"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onKeyDown}
              />

              <EmojiPickerButton
                onClick={() => setShowEmoji(!showEmoji)}
                onMouseOver={() =>
                  setRandomEmoji(randomPropertyValue(data.categories[0].emojis))
                }
              >
                <em-emoji id={randomEmoji} size="1.8em"></em-emoji>
              </EmojiPickerButton>
              {showEmoji && (
                <EmojiPicker>
                  <Picker
                    data={data}
                    categories="people"
                    onEmojiSelect={(emoji) =>
                      setMessage(message + emoji.native)
                    }
                    perLine={7}
                  />
                </EmojiPicker>
              )}
            </InputWrapper>
          </InputContainer>
        </Chat>
        {showSidebarUsers && <SidebarUsers />}
      </Wrapper>
    </Container>
  );
}
