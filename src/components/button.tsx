import styled from "styled-components";
import { GRAY, LIGHTER_GRAY, WHITE } from "../styles/colors";

const PRIMARY = "PRIMARY" as const;
const PRIMARY_INVERTED = "PRIMARY_INVERTED" as const;
const SECONDARY = "SECONDARY" as const;
const SECONDARY_INVERTED = "SECONDARY_INVERTED" as const;

export const ButtonKind = {
    PRIMARY,
    PRIMARY_INVERTED,
    SECONDARY,
    SECONDARY_INVERTED,
};

type Props = {
    kind: keyof typeof ButtonKind;
    size?: "s" | "m" | "l";
    disabled?: boolean;
};

export const Button = styled.button<Props>`
    font-family: monospace;
    font-weight: 600;
    background: ${WHITE};
    color: ${GRAY};
    font-size: 0.75rem;
    padding: 0.5em 1em;
    border: 2px solid ${GRAY};
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
    transition: ease 0.1s;

    &:hover {
        background: ${LIGHTER_GRAY};
    }
`;
