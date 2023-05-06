import styled from "styled-components";
import Avatar from "./Avatar";
const User = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0.5rem;
  border-radius: 2rem;
  gap: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Name = styled.span``;

export default function ({ user }) {
  return (
    <User>
      <Avatar user={user} />
      <Name>{user}</Name>
    </User>
  );
}
