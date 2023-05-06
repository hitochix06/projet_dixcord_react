import styled from "styled-components";

const ServersSidebar = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 0;
    width: 72px;
    flex: 0 0 auto;
    background: var(--background-sidebar-server);
    padding: 0;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

export default ServersSidebar;
