---
title: Customization of the Scoper
description: Learn how to replace Freon’s generated scoper with your own implementation and configure the environment to use it.
tags: scoper, customization, Freon, scope provider, environment, DSL development
---

# Customization of the Scoper

The scoper cannot yet be customized **per concept**.  
Instead, you can replace the entire scoper with your own implementation.  
Your custom scoper must implement the standard `PiScoper` interface.

## Adjusting the Environment

To make Freon use your custom scoper instead of the generated one, modify the initialization line in the class  
`YourLanguageNameEnvironment` (found in `~/freon/environment/`).  
Replace `YourLanguageName` with the name of your DSL.

Suppose your improved scoper is implemented in the class `YourScoper`.  
Then the relevant line in the environment class should look like this:

```ts
export class EntityEnvironment implements PiEnvironment {
    ...
    scoper: PiScoper = new YourScoper();
    ...
}
```

[//]: # (TODO: update this code example once the version from Jos is available)

