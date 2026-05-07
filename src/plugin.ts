import streamDeck from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter());

// Finally, connect to the Stream Deck.
streamDeck.connect();
