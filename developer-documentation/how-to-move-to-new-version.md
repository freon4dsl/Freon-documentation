# How to Move to New Version of Freon

Often the documentation is edited just before a major release of Freon. The branch 'development' of the
documentation repo is used during this period of editing. When the release is done this 'development' branch 
is copied/merged to 'main'. To start working on the texts for the next major release the following must be 
adjusted in this repo.

1. Make sure all previous changes are saved in a different branch than 'development'. Do all the rest of 
this guide in the 'development' branch, not in 'main'.
2. In scripts/src/InstallCodeExamples update the constant named 'branch' to the branch where the new 
examples are stored in the 'create-freon-languages' repo.
3. In ./package.json update the version number of "@freon4dsl/meta".
4. Update the `versionNumber` variable in './src/lib/Store.ts'.
4. Start editing the files in ./docu-content.
