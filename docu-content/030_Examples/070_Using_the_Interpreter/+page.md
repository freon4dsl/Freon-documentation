<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

[//]: # (todo write section on interpreter)

# Feedback from an Interpreter

"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum."

================ this is how to include a figure
<Figure
imageName={'examples/Tutorial-lesson10-screenshot1.png'}
caption={'Validation error in grading expression'}
figureNumber={1}
/>
================

================ this is how to include source code
```freon
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
