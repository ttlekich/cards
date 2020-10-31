import styled from "styled-components";
import { GREEN, WHITE } from "../styles/colors";

type Props = {
    primary: boolean;
};

export const Button = styled.button<Props>`
    background: ${(props) => (props.primary ? GREEN : WHITE)};
    color: ${(props) => (props.primary ? WHITE : GREEN)};
    font-size: 0.75em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid GREEN;
    border-radius: 3px;
    cursor: pointer;
`;
