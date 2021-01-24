import { useState } from "react";
import Cookies from "js-cookie";

export const useCookie = (key: string, initialValue: string) => {
    const [item, setItem] = useState(() => {
        return Cookies.get(key) || initialValue;
    });

    const setCookie = (value: string) => {
        setItem(value);
        Cookies.set(key, value);
    };

    return [item, setCookie];
};
