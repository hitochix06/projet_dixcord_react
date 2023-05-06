import styled from "styled-components";
import UsersStatus from "../Users/UsersStatus";

const SidebarUsers = styled.aside`
    width: 240px;
    flex: 0 0 auto;
    background: var(--background-secondary);
    padding: 24px 1rem;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export default function () {
    return (
        <SidebarUsers>
            <UsersStatus />
        </SidebarUsers>
    );
}
