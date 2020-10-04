import { OnInitialize } from "overmind";

export const onInitialize: OnInitialize = async ({ effects }) => {
    effects.api.initialize();
};
