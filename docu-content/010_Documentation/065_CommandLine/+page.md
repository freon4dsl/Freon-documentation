# Command Line

Freon generates a command line application in the folder `commandline`.

The main command line class to run is the `FreonCommandLineRunner.ts`.
This initializes the language and then runs the given command.
As generated there is a `DummyAction`, which is just a sample of what a action class looks like.
Just replace this with your own action.

If you define multiple actions, make sure they are correctly initialized in the `FreonCommandLineRunner` class.
