import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: 33vw;
    padding: 2rem;
    background-color: var(--background-primary);
    box-shadow: var(--elevation-low);
    border-radius: 5px;
    text-align: center;
    color: var(--primary);
    @media screen and (max-width: 600px) {
      width: 100vw;
      height: 100vh;
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
    }

    h3 {
        font-size: 14px;
        font-weight: 400;
        color: var(--subtitle);
    }

    form {
        display: grid;
        gap: 20px;
        label {
            display: block;
            font-size: 12px;
            color: var(--subtitle);
            font-weight: 700;
            text-transform: uppercase;
            text-align: left;
            &[aria-required]::after {
                content: "*";
                color: red;
                margin-left: 0.5rem;
            }
        }
        input, button {
            color: var(--text)
            padding: 10px;
            padding: 10px;
            max-height: 40px;
            border-radius: 3px;
        }
        input {
            background-color: var(--background-sidebar-server);
        }
        button {
            background-color: var(--blue);
            cursor: pointer;
            transition: background-color 0.1s linear;
            font-size: 1rem;
            &:hover {
                background-color: var(--dark-blue)
            }
        }
    }
    a {
        color: var(--primary);
    }
`;
