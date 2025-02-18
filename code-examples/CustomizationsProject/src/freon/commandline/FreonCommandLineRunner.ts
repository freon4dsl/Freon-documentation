// Generated by the Freon Language Generator.
// Run this as the main program.
import { EntityModelEnvironment } from "../config/gen/EntityModelEnvironment.js";
import { FreonCommandLine } from "./FreonCommandLine.js";
import { DummyAction } from "./DummyAction.js";

// ensure language is initialized
const tmp = EntityModelEnvironment.getInstance();

// Create the command line object
const cli: FreonCommandLine = new FreonCommandLine();

// Add specific actions to the command line tool
// REPLACE WITH YOUR OWN
cli.addAction(new DummyAction());

// Run it
cli.execute();
