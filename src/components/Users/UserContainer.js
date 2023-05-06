import styled from "styled-components";
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--channels-default);
  padding: 5px 0.5rem;
  cursor: pointer;
  opacity: ${(props) => (props.offline ? 0.3 : 1)};

  &:hover {
    background-color: var(--hover-color);
    border-radius: 0.25rem;
    opacity: 1;
  }
`;
