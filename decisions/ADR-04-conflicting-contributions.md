# ADR-04-Conflicting-contributions

| Status |  | decided |
| --- | --- | --- |
| Date |  | 2024-05-02 |
| Decider |  | @maintainers |

## Context

Sometimes, new functionality for this library is suggested that is already covered by other open source projects. Multiple of those projects might try to get incorporated into this one.

## Options

### Forgo adding existing solutions

We could forgo adding existing solutions to our codebase. This would get around any kind of related conflict and the solutions would still be available.

On the other hand, one of the goals of this library is to provide thoroughly tested solutions to make it easier for enterprise users to consume just one approved library.

### Combine learnings from multiple solutions

We could research alternatives and try to combine what we learn from those that are willing to contribute to create an improved solution.

### Decide for a competing solution

We could also decide on one of the competing solutions where the maintainer is interested in contributing it to this library. This would be less work than combining multiple solutions, but it could lead to sub-par results.

## Decision

We research alternative solutions before accepting a contribution and reach out to their maintainers, so that we can discuss together the advantages and disadvantages of different solutions. We aim not to pit maintainers against each other, but instead to push for collaboration to combine the learnings from all solutions.
