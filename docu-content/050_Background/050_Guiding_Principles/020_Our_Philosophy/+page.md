# Our Philosophy

The design philosophy that we follow in Freon can best be described by the following quote from
the well-known graphical user interface designer Alan Kay.

> _Simple things should be simple, complex things should be possible._
> (<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)

## The Pareto Principle

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

Furthermore, we intend to use **bootstrapping** in one of the next versions of Freon
to create editors for every one of the definition languages. If you are interested, you can
check out our [wish list](/Intro/Future_Developments) of features to be developed in the future.

## Name-Based References

In [Support for Expressions](/Intro/Projectional_Editing#expressions) we explain
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
an instance of the class `PiElementReference`, which holds:

- the name or path (i.e. a list of names) of the referred element
- the meta-type of the referred element
- a cache of the element itself

This means that the AST is truly a tree, not a graph. One advantage is that we are not obliged
to have the complete model in memory. Our use of
multi-file models is explained in [Models and Model Units](/Intro/Models_and_Model_Units).
