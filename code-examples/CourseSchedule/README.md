# Howto Install Phases

This folder contains subfolders, one for each phase in the example on the Freon documentation site..

To install a phase:

- Remove all files in the `defs` folder (non-recursive!)
- Copy the files from the phase folder you want to the `src/defs` folder.
- Do the same for all folders in `src`.
- - copy `icons8-person-94.png` from `src/external` to the `public` folder.
- Run `npm run build`.

And you can run the editor based on the phase.
