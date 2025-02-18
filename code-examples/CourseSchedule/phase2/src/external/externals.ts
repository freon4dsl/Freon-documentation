import {setCustomComponents} from "@freon4dsl/core-svelte";
import PersonIcon from "./PersonIcon.svelte";

/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
    setCustomComponents([
        { component: PersonIcon, knownAs: "PersonIcon" },
    ]);
}
