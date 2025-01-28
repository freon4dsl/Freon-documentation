# A bit of Background

It took a few years to create Freon, but more importantly it took a lot of experience: experience with building software 
in general, experience with creating languages like UML and OCL, experience with creating a large number of DSLs,
experience with the tools available for building DSLs. In short, Freon is the result of a lifetime of experience,
and with that, the lessons learned.

A few of these lessons are explained below to give you an insight in the motives and guiding principles behind Freon.

## Design Philosophy

The design philosophy that we follow in Freon can best be described by the following quote from
the well-known graphical user interface designer Alan Kay.

> _Simple things should be simple, complex things should be possible._
> (<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)

## A Minimal Viable Product

Freon is a minimal viable product which supports the
language engineer in creating a work environment for a mini-language. A key principle
is the <a href="https://en.wikipedia.org/wiki/Pareto*principle" target="_blank">Pareto principle</a>
(or 80%-20% rule),
which states that for many events, roughly 80% of the effects come from 20% of the causes.
For example, it is an axiom of business management that "80% of sales come from 20% of clients".

In software development the Pareto principle translates to “_80% of the development
effort is spent on 20% of the application_”, this 20% being the more complex parts.
Still, the other 80% of the application needs to be created as well.

Freon aims to
make the latter **as simple as possible**, while keeping the generated code **open** for the
language engineer to code the more complex parts by hand. One of our use cases is the
creation of a prototype language in a day or in a couple of days at most. 

Let's get the 20% down to say about 1% to 5%. That either leaves you with 15% extra 
free time to spend on your hobbies (fun!),
or with extra time to tackle the difficult bits of your application (fulfilling!).


## Name-Based References

In [Support for Expressions](/Background/Projectional_Editing#expressions) we explain
that editing expressions is a known challenge for projectional editors. A second challenge
is posed by _references_, which is stated in <a href="https://www.voelter.de/data/pub/fse2016-projEditing.pdf" target="_blank">
Efficiency of Projectional Editing: A Controlled Experiment</a> as follows.

---

> **References.**
> References are based on pointers to the targetnode’s ID. Despite some advantages (e.g., robust
> refactorings) of this approach, we observe problems with the tradeoff that the reference target
> has to exist at the time the reference is created. A more robust and intuitive handling of
> references is desirable. While some problems can be solved by language developers (e.g.,
> quick fixes to create reference targets), there should be a better way to support references
> by the IDE itself.
>
> [Markus Voelter a.o., Efficiency of Projectional Editing]

---

This is the reason that in Freon we allow only name-based references, which are resolved
on a need-to basis. Every reference is
an instance of the class `FreNodeReference`, which holds:

- the name or path (i.e. a list of names) of the referred element
- the meta-type of the referred element
- a cache of the element itself

This means that the AST is truly a tree, not a graph. One advantage is that we are not obliged
to have the complete model in memory. Our use of multi-file models is explained in the next section.


## Model Units or Partitions

Contrary to what is common in the world of <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>
we believe that a model
is often too large to handle. When dealing with source code, the times have long gone that a complete
application was written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization.
It is our strong conviction that this approach should also be taken when dealing with models.

Similar to how the source code for a single application is split into classes and/or modules, every model in Freon is split
into **model units**. Each model may contain units of multiple types, either an array of units, or a single unit. The next example
shows how to define model units. Here,
an _InsuranceModel_ consists of a list of _Parts_ and a list of _Products_.

```proto
// Insurance/src/defs/language-main.ast#L7-L20

model InsuranceModel {
    parts: Part[];              // units that hold partial definitions of insurance products
    products: Product[];        // units that hold sellable insurance products
}

modelunit Part {
    part: BaseProduct;          // one collection of partial insurance products
    file-extension = "base";    // the file extension used by the parser
}

modelunit Product {
    product: InsuranceProduct;  // one collection of sellable insurance products
    file-extension = "prod";    // the file extension used by the parser
}
```

The notion of model units has been around for some time. Actually, we have
published a number of papers on the topic.

- At _Eclipse Summit 2008 Modeling Symposium_ model units were introduced in _Big Models
  an Alternative Approach_.
- Earlier, model units were described under the term 'Partial Models' at the ECMDA-FA 2007 conference
  in a paper called _Building a Flexible Software Factory Using Partial Domain Specific Models_.
- More recently model units have been used within the
  <a href="https://www.mendix.com/"target="_blank">Mendix</a> meta-model to allow for working with large models
  in their web based modeling tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.


## Other Guidelines

Other guidelines have been **ease of use**, and **flexibility**. Freon may not (yet <img src="/icons/smile.png" alt="OOPS" width="20" height="20">) do
everything you need, but what it does, should be very easy to get into. Furthermore,
Freon is designed to be **extendable**, and **easy to integrate with other tooling**.
In practise this means that:

- Every part of the work environment that is generated, can be _exchanged_ for one
  that suits the language engineer better, provided the right interface is implemented.
- Every part of the work environment is made by its own generator, so you can adjust which
  parts you want to generate and which parts you _omit_.
- The different parts of the work environment can be run on either the server or the client.
  Thus creating _multiple deployment options_.

With these principles in mind, we have started of small and simple. Every definition language,
from the language structure to the validation rules, is kept **minimal**. Over time, in an **agile**
fashion, these will be extended whenever the need arises.
