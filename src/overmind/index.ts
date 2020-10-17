import { IConfig } from "overmind";
import {
    createHook,
    createStateHook,
    createActionsHook,
    createEffectsHook,
} from "overmind-react";
import { state } from "./state";
import { onInitialize } from "./on-initialize";
import * as actions from "./actions";
import * as effects from "./effects";

export const config = {
    onInitialize,
    state: state,
    actions: actions,
    effects: effects,
};

declare module "overmind" {
    interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
export const useState = createStateHook<typeof config>();
export const useActions = createActionsHook<typeof config>();
export const useEffects = createEffectsHook<typeof config>();
export const useReaction = createActionsHook<typeof config>();
