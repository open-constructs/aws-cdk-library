# ADR-03-Merge-Tooling

| Status |  | decided |
| --- | --- | --- |
| Date |  | 2024-04-14 |
| Decider |  | @maintainers |

## Context

To accept contributions from other people, these PRs need to be merged.

There are different ways to handle automatic merging.

## Options

### GH Merge Trains

The merging process for this project will be done using Github merge trains. Github merge trains are a feature of Github's pull request workflow that helps manage and organize the merging of pull requests. Instead of merging pull requests individually, merge trains allow multiple pull requests to be merged sequentially.

When a pull request is ready to be merged, it joins the merge train and waits for its turn. The pull requests are merged one after another in the order they join the merge train. This ensures that the changes are integrated in a controlled and orderly manner, reducing conflicts and maintaining a stable codebase.

GitHub merge trains also provide additional features like auto-merging, where pull requests that pass all checks and do not have conflicts can be automatically merged without manual intervention. This helps streamline the merging process and reduce manual effort.

Using Github merge trains for merging pull requests in this project will help ensure a smooth and efficient merging process, minimize conflicts, and maintain the stability of the codebase.

### Mergify

Mergify is an alternative solution for managing the merging of pull requests in a project. It is a GitHub app that automates the merging process based on a set of predefined rules and conditions. Mergify allows you to define custom workflows and actions to handle the merging of pull requests.

With Mergify, you can set up rules that specify when and how pull requests should be merged. For example, you can define rules to automatically merge pull requests that pass all checks and have no conflicts or rules to require a certain number of approved reviews before merging.

One of Mergify's key features is its ability to handle complex merging scenarios. It supports various merging strategies, such as rebase, squash, and merge commits, allowing you to choose the best strategy for your project. Mergify also provides advanced conflict resolution options, making it easier to handle conflicts when merging pull requests.

Mergify provides a web-based interface where you can configure and manage the merging rules for your project. It offers various customization options, allowing you to tailor the merging process to fit your project's specific needs.

## Decision

We decided to use GitHub MergeTrains/MergeQueue.
