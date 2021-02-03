import { useState } from "react";
import Cookies from "js-cookie";
import type { Decoder } from "io-ts";
import * as E from "fp-ts/lib/Either";

export const useCookie = (key: string) => {
    const [item, setItem] = useState(() => Cookies.get(key) || null);

    const setCookie = (item: string) => {
        setItem(item);
        Cookies.set(key, item);
    };

    return [item, setCookie];
};
