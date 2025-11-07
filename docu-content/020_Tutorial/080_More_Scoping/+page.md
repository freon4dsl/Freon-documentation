---
title: More Scoping
description: Extend Freon’s scoping system by introducing namespace additions. Learn how to define the Test model unit and restrict visible question names within each Step to those belonging to the referenced Page.
tags: Freon, scoping, namespaces, namespace addition, Step, Page, Test, Scenario, Answer, Flow, questions, DSL, Education language, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# More Scoping

In this lesson, you’ll learn more about scoping. But first, we’ll add the metamodel
and the projections for the fourth model unit — the **Tests**.

## The _Test_ model unit metamodel

In the requirements of our DSL in the [introduction](/Tutorial/Overview), we stated that  
“... our client company wants a means to test the page flow before the actual webpages are produced.”  
The **Test** model unit is the starting point for fulfilling that requirement.

In a Test, a teacher can add multiple scenarios, each describing a series of page flows.  
For instance, the teacher might want to test that from the start page `Theory101`, a pupil who answers all questions correctly is directed to `InDepth101`,  
and after succeeding there, proceeds to `Theory102`.

Within a test, we need to specify both the answers given to questions on the current page and the expected follow-up page.  
Add the following to the file `edu-tests.ast`:

```proto
// Education/lesson7-defs/edu-tests.ast

language Education

modelunit Test {
    name: identifier;
    scenarios: Scenario[];
    reference main: SiteGroup;
    reference flow: Flow;
}

concept Scenario {
    description: string;
    testFlow: TestFlow[];
}

concept TestFlow {
    steps: Step[]; /* Note that the order is of importance */
}

concept Step {
    reference fromPage: Page;
    answerSeries: Answer[];
}

concept LastStep base Step {
}

concept Answer {
    reference question: Question;
    value: NumberConcept;
}
```

## The _Test_ model unit projections

We’ll also define projections for these concepts. By now, none of this should look unfamiliar:

```proto
// Education/lesson7-defs/edu-tests.edit

editor default

Test {[
    Test ${self.name}
    Regarding MainTopic: ${self.main}, and flow: ${self.flow}

    ${self.scenarios}
]}

Scenario {[
    ------------------------------------
    ${self.description}

        ${self.testFlow vertical}
]}

TestFlow {[
    ${self.steps horizontal separator[===>]}
]}

Step {[
    ${self.fromPage} => ${self.answerSeries table rows}
]}

LastStep {[
    ${self.fromPage}
]}

Answer { table [
    ${self.question} | ${self.value}
]}
```

## Namespace Addition

Now comes the interesting part.  
If you try to build a test flow, you’ll notice that when adding answers, the user can still access question names from other pages.  
Generate the editor, open the model `lesson6`, and in the side panel select `TestB` to see something like this:

<Figure
imageName={'tutorial/Tutorial-lesson7-screenshot1.png'}
caption={'No scoping in the Test model unit'}
figureNumber={1}
/>

Here, the questions `pie` and `pie2` belong to the page `Theory101`, but `difficult1` and `further` do not.  
How can we prevent such mistakes?

The answer lies in **another scope rule**.  
We need to draw a boundary around each `Step` instance — a namespace that only includes the relevant names.  
So, we’ll make `Step` a namespace. However, this namespace itself has no direct names; the question names we want belong to the `fromPage` property.  
To tell Freon to include those, we use a **namespace addition**.

A namespace addition imports names into a namespace, as long as those names can be directly reached from the namespace object.  
In our case, `Step` can use names from its `fromPage`, but not from other scenarios.

```proto
// Education/lesson7-defs/edu.scope

scoper for language Education

isNamespace { Page, Step }

Step {
    imports {
        self.fromPage;
    } 
}
```

Now regenerate and take another look.  
You’ll see that the available question names in each answer series are **only** those from the corresponding `fromPage`.

Yes — scoping really can be this easy!

In the next lesson, we’ll take things a step further by introducing Freon’s **typing system** to help users build even more reliable models.
