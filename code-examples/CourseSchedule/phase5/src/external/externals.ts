import {setCustomComponents} from "@freon4dsl/core-svelte";
import PersonIcon from "./PersonIcon.svelte";
import PhoneButton from "./PhoneButton.svelte";
import Schedule from "./Schedule.svelte";
import StaffAccordion from "./StaffAccordion.svelte";

/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
    setCustomComponents([
        { component: PersonIcon, knownAs: "PersonIcon" },
        { component: Schedule, knownAs: "Schedule" },
        { component: PhoneButton, knownAs: "PhoneButton" },
        { component: StaffAccordion, knownAs: "StaffAccordion" }
    ]);

}

