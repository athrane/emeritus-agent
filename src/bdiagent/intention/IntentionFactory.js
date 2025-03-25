import { Intention } from "../../internal.js";

export class IntentionFactory {

    /**
     * Creates a new null intention instance.
     */
    static createNullIntention() {
        return new Intention(
            "Null intention", // Name of the intention
            [
                (agent) => {
                    console.log("Doing nothing.");
                }
            ], // Actions to execute
            (agent) => true, // Preconditions (always true for a null intention)
            (agent) => {
                console.log("Null intention completed.");
            } // Effects
        );
    }
}