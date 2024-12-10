<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Validating the model

In the previous lesson we learned how to add typings to the model, but there was not yet a way to show them.
In this lesson we will use the typings to validate the model, and produce type errors.

## Adding type checking

Freon generates a validator for your DSL that has a number of built-in checks. For instance, the validator checks
whether all references have a correct value. It also checks whether everything that has the type identifier in the metamodel,
has a value that is correct according to the rules of TypeScript.

However, for the typings there are no built-in checks. We have to define them ourselves. So, what is it that needs to be
defined? Let's take the `AndExpression` concept. It has a left, and a right hand side, and the types on both sides should 
be Boolean. It will be no surprise that we can define the rules for `OrExpression`s in the same way. 
Thus, we add another file, called `edu.valid`, and add the following definitions to it.

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

Now what about instances of `LessOrEqualsExpression`, and the other
comparison expressions? They also have a left, and a right hand side, but for them, it
 is important that the types on both sides are the same. We define that as follows.

```txt
// Education/lesson9-defs/edu.valid#L13-L31

LessOrEqualsExpression {
    typecheck equalsType( self.left, self.right );
}

GreaterOrEqualsExpression {
    typecheck equalsType( self.left, self.right );
}

LessThenExpression {
    typecheck equalsType( self.left, self.right );
}

GreaterThenExpression {
    typecheck equalsType( self.left, self.right );
}

EqualsExpression {
    typecheck equalsType( self.left, self.right );
}
```

## The result

The result should be some error message in the editor. Unfortunately, validation is not done
immediately. That is something we like to add in a next version of Freon. In the current version 
you must select `Validate` from the Edit menu to activate the validator. But then it shows you...

<Figure
imageName={'tutorial/Tutorial-lesson9-screenshot1.png'}
caption={'Validation error in grading expression'}
figureNumber={1}
/>
