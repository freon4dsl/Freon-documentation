<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
    import Figure from '$lib/figures/Figure.svelte';

    let prevLink = '/Examples/Overview';
    let nextLink = '/Examples/Example2';
</script>

<PrevNextSection {prevLink} {nextLink} />

# Feedback from an Interpreter

"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum."

================ this is how to include a figure
<Figure
imageName={'Tutorial-lesson10-screenshot1.png'}
caption={'Validation error in grading expression'}
figureNumber={1}
/>
================

================ this is how to include source code
```txt
// Education/lesson9-defs/edu.valid#L1-L11

validator EduValidator for language Education

AndExpression {
    typecheck equalsType( self.left, PrimitiveType:Boolean );
    typecheck equalsType( self.right, PrimitiveType:Boolean );
}

OrExpression {
    typecheck equalsType( self.left, PrimitiveType:Boolean );
    typecheck equalsType( self.right, PrimitiveType:Boolean );
}
```
================

<PrevNextSection {prevLink} {nextLink} />
