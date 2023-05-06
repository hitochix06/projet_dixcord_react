import styled from "styled-components";
const Header = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    min-height: 48px;
    padding: 0 0.5rem;
    background-color: var(--background-primary);
    color: var(--text);
    &::after {
        content: "";
        position: absolute;
        display: block;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        -webkit-box-shadow: var(--elevation-low);
        box-shadow: var(--elevation-low);
        z-index: 1;
        pointer-events: none;
    }
`;

const Logo = styled.div``;
const Settings = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
        > svg path {
            opacity: 1;
        }
    }
    > svg path {
        fill: white;
        opacity: ${(props) => (props.showSidebarUsers ? 1 : 0.5)};
        transition: all 0.2s linear;
    }
`;

export default function ({
    channelName,
    showSidebarUsers,
    setShowSidebarUsers,
}) {
    return (
        <Header>
            <Logo>#{channelName}</Logo>
            <Settings
                showSidebarUsers={showSidebarUsers}
                onClick={() => {
                    setShowSidebarUsers(!showSidebarUsers);
                }}
            >
                <svg
                    x="0"
                    y="0"
                    className="icon-2xnN2Y"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
                    ></path>
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
                    ></path>
                    <path
                        fill="currentColor"
                        d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"
                    ></path>
                    <path
                        fill="currentColor"
                        d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"
                    ></path>
                </svg>
            </Settings>
        </Header>
    );
}
