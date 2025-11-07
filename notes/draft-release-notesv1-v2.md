## What's Changed
* Release 1.0.0 by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/428
### Major changes
* Scoper has been completely rewritten.
  * Scoper tryout by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/459
  * Fix scoper bugs by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/461
  * scoper-redone by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/471
  * Added validation on uniqueness of names of declared nodes of a namespace by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/496
  * Scoper example by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/505

* SMUI webapp has been replaced by a Flowbite wepapp
  * Flowbite webapp standalone by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/478

* Fewer restrictions on the names used for model units, almost any character is allowed.
  * Model server with no names restriction by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/477

* References are updated automatically when a name of the referred node is changed
  * Update references when a name is changed by @Ulyana-F1re in https://github.com/freon4dsl/Freon4dsl/pull/487

* Made everything even more stylable by CSS
  * Improve text component layout and placeholder formatting by @globallyunique in https://github.com/freon4dsl/Freon4dsl/pull/517
  * Make concept and fragment in editor fully stylable by @Ulyana-F1re in https://github.com/freon4dsl/Freon4dsl/pull/470

* Dropdown menus react to characters being typed in a case-insensitive manner
  * Make dropdown matching case-insensitive. by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/509

* A multi-line textbox has been added
  * Anneke/multi line text by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/528

* Aligned syntax in the definitions files
  * Syntax issues by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/465
  * Typer syntax for limited instance by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/460
  
* Renaming of boxes for external components
  * Renamed all boxes named External... to ...ReplacerBox by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/507

* Changed the optionality of primitive properties
  * Jos/optional primitives UI serializer by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/516
  * Anneke/optional primitives by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/519
  * Anneke/optional primitives in parser by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/521
  * Anneke/error optional identifier by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/527

### New Versions of External Tools
* Moved to Svelte version 5, AGL version 4.2.1-20-RC2, and other updates
  * Svelte5 extensions by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/432
  * Svelte 5 fix effects by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/443
  * Moving all changes concerning svelte v5 and flowbite app into one branch by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/451
  * Upgrade svelte5 by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/433
  * Update of version of AGL parser that is used in the meta package by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/455
  * Parser generation now depends on new version of AGL by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/444
  * Editor hand tests by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/469

### Bug fixes
* Multiline in optional projection becomes single line by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/430
* Merged changes from maintenance branch into development and updated a… by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/446
* Merge maintenance into development by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/450
* Update README.md by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/452
* Included all changes made in maintenance branch that improve performance timewise by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/453
* A number of bug fixes by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/456
* Test fixes by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/457
* Import "type" generation everywhere by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/458
* Changed the name FreElementReference to FreNodeReference in comments … by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/468
* Validator bug fixes by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/466
* Fixed bug in editor gen: add check for multiple identical fragment names by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/467
* Fix fragmentwrapper by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/497
* Replace all deprecated node fs.* calls. by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/492
* Anneke/expressions in meta by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/499
* Fixed bug: loop in Svelte effect by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/500
* When a reference is ambiguous, it is created using a node, not a name by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/501
* Undo / redo return the delta, to help setting the focus after undo/redo. by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/502
* Rename unit from editor seems to work ok, needs more testing. by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/503
* Anneke/update externals by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/504
* Made dialog react to click outside by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/506
* Remove dependency to test, cleanup code. by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/508
* Jos/arrow up down by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/510
* Anneke/x sbd loop1 by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/511
* Anneke/x sbd scrolling by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/512
* Anneke/copy paste by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/513
* Improved README.md by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/514
* Fix reference button for dropdown by @globallyunique in https://github.com/freon4dsl/Freon4dsl/pull/518
* Beta4 by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/515
* Jos/focus visibility by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/520
* Jos/fixes for 2.0.0. beta.5 by @joswarmer in https://github.com/freon4dsl/Freon4dsl/pull/529

### Miscellaneous
* Developer documentation by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/495
* Anneke/colors by @annekekleppe in https://github.com/freon4dsl/Freon4dsl/pull/532

## New Contributors
* @Ulyana-F1re made their first contribution in https://github.com/freon4dsl/Freon4dsl/pull/470
* @globallyunique made their first contribution in https://github.com/freon4dsl/Freon4dsl/pull/517

**Full Changelog**: https://github.com/freon4dsl/Freon4dsl/compare/v1.0.0...v2.0.0
