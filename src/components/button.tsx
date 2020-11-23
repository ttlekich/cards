import styled from "styled-components";
import * as Colors from "../styles/colors";

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
};

const getColor = (props: Props) => {
    switch (props.kind) {
        case ButtonKind.PRIMARY:
            return {
                background: Colors.PRIMARY,
                color: Colors.LIGHT,
                border: Colors.PRIMARY,
            };
        case ButtonKind.PRIMARY_INVERTED:
            return {
                background: Colors.LIGHT,
                color: Colors.PRIMARY,
                border: Colors.PRIMARY,
            };
        case ButtonKind.SECONDARY:
            return {
                background: Colors.SECONDARY,
                color: Colors.LIGHT,
                border: Colors.SECONDARY,
            };
        case ButtonKind.SECONDARY_INVERTED:
            return {
                background: Colors.LIGHT,
                color: Colors.SECONDARY,
                border: Colors.SECONDARY,
            };
        default:
            return {
                background: Colors.PRIMARY,
                color: Colors.LIGHT,
                border: Colors.PRIMARY,
            };
    }
};

const propsBySize = (props: Props) => {
    switch (props.size) {
        case "l":
            return {
                "font-size": "1.25rem",
            };
        case "m":
            return {
                "font-size": "1rem",
            };
        case "s":
            return {
                "font-size": "0.75rem",
            };
        default:
            return {
                "font-size": "1rem",
            };
    }
};

export const Button = styled.button<Props>`
    background: ${(props) => getColor(props).background};
    color: ${(props) => getColor(props).color};
    font-size: ${(props) => propsBySize(props)["font-size"]};
    padding: 0.25em 1em;
    border: 2px solid ${(props) => getColor(props).border};
    border-radius: 3px;
    cursor: pointer;
`;
