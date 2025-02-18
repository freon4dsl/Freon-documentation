import {setCustomComponents} from "@freon4dsl/core-svelte";
import DatePicker from "./DatePicker.svelte";
import ShowAnimatedGif from "./ShowAnimatedGif.svelte";
import SMUI_Accordion from "./SMUI_Accordion.svelte";
import SMUI_Card_Component from "./SMUI_Card_Component.svelte";
import SMUI_Dialog from "./SMUI_Dialog.svelte";

/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
    setCustomComponents([
        { component: ShowAnimatedGif, knownAs: "AnimatedGif" },
        { component: SMUI_Card_Component, knownAs: "SMUI_Card" },
        { component: SMUI_Accordion, knownAs: "SMUI_Accordion" },
        { component: SMUI_Dialog, knownAs: "SMUI_Dialog" },
        { component: DatePicker, knownAs: "DatePicker" }
    ]);

}

