<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# More scoping

In this lesson your will learn more about scoping. But first, we need to add the metamodel,
and the projections for the fourth model unit, the _Tests_.

## The _Test_ model unit metamodel

In the requirements of our DSL in the [introduction](/Tutorial/Overview) of the tutorial, one line says: 
"... our client company want a means to test the page flow before the actual webpages are produced."
The _Test_ Model unit is the start to fulfill this requirement. 

In a Test, the teacher can add a number of scenarios, where each
scenario describes a series of page flows. For instance, the teacher may want to test that from the start page 'Theory101', a pupil that
answers all questions correct, will next be directed to page 'InDepth101'. If the pupil again is able to answer all in depth questions correctly,
the next page to show should be 'Theory102'.

In the test we want to be able to give specific answers to the questions on the current page, and we need to express the follow-up page.
So we add the following to the file 'edu-tests.ast'. All should be familiar by now.

```txt
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
    steps: Step[]; /* Note that the order is of importance */
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

We also build the projections, and again, nothing should be strange for you at the moment.

```txt
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

Now we come to the interesting bit. If you try to build a test flow, you will notice that in the series of answers the user can again
access/see names of questions that are not part of the page where the flow starts. To see an example, go ahead, and generate a new editor.
Then open yet another model called 'lesson6'. (We changed the metamodel, and therefore we use an adapted model.)
If you go the side panel and open 'TestB', you will see the following. (Todo; check this, maybe create two models for this lesson)

<Figure
imageName={'Tutorial-lesson7-screenshot1.png'}
caption={'No scoping in the Test model unit'}
figureNumber={1}
/>

The questions named 'pie' and 'pie2' are part pf page 'Theory101', but the questions 'difficult1', and 'further' are not. How
to avoid these kind of errors?

The answer is another scope rule. We need to draw a line around each `Step` instance, a line where names may not 
cross. Thus, we make `Step` a namespace. The problem is that this namespace does not have any names in it. No names are directly owned
by any `Step` object. The names that we need, namely the names of the question on the page, are in the property `fromPage`. To
let Freon know that these are the names to be used in a `Step` instance, we use the notion of **namespace addition**.

A namespace addition adds names to a namespace as long as these names can be directly reached from the namespace object. For instance, in this example we can use
the `fromPage` property, but here is no way to refer to other scenarios.

```txt
// Education/lesson7-defs/edu.scope

scoper EducationScoper for language Education

isnamespace { Page, Step }

Step {
    namespace_addition = self.fromPage;
}

```

Now regenerate and have a look. You will see that the question names that are available in the answer series are only those of the `fromPage`.
Yes, scoping can be this easy!

In the next lesson you will learn more sophisticated stuff. We will introduce the Freon typing system to help your user to create solid models.

<PrevNextSection {prevLink} {nextLink} />
