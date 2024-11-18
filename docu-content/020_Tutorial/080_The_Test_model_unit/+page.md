<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
    import Figure from '$lib/figures/Figure.svelte';

    let prevLink = '/Tutorial/In_Need_of_Scoping';
    let nextLink = '/Tutorial/What_about_Types';
</script>

<PrevNextSection {prevLink} {nextLink} />

# The _Test_ model unit

In this lesson your will learn more about scoping. But first, we need to add the metamodel,
and the projections for the fourth model unit, the _Tests_.

## The Metamodel

In the requirements of our DSL in the [introduction](/Tutorial/Intro) of the tutorial, one line says: 
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
    reference expectedPage: Page;
    answerSeries: Answer[];
}

concept StartStep base Step {
    reference fromPage: Page;
    reference expectedPage: Page;
    answerSeries: Answer[];
}

concept Answer {
    reference question: Question;
    value: NumberConcept;
}

```

## The Projections

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
    ${self.steps horizontal}
]}

Step {[
    => ${self.answerSeries table rows} => ${self.expectedPage}
]}

StartStep {[
    ${self.fromPage} => ${self.answerSeries table rows} => ${self.expectedPage}
]}

Answer { table [
    ${self.question} | ${self.value}
]}

```

## More Scoping

Now we come to the interesting bit. If you try to build a test flow, you will notice that here again the user can
access/see names of questions that are not part of the page where the flow starts. For instance, go ahead and generate a new editor.
Then open yet another model called 'lesson6'. (We changed the metamodel, and therefore we use an adapted model.)
If you go the side panel and open 'TestA', you will see the following.

<Figure
imageName={'Tutorial-lesson7-screenshot1.png'}
caption={'Editor for the Test model unit'}
figureNumber={1}
/>

The questions named 'pie' and 'pie2' are part pf page 'Theory101', but the questions 'difficult1', and 'further' are not. How
to avoid these kind of errors?

The answer is another scope rule. 

In the next lesson you will learn how the typing system in Freon can help your user to create solid models.

<PrevNextSection {prevLink} {nextLink} />
