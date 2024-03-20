# ADR-02-Using-Projen

| Status |  | decided |
| --- | --- | --- |
| Date |  | 2024-03-20 |
| Decider |  | @maintainers |


## projen

The project will be set up using the `projen` tool. `projen` is a development tool that helps create and maintain modern project configurations.
It automates the setup of common project files, dependencies, and build configurations. For this project, the project type will be `jsiiProject`.
`jsii` stands for "JavaScript Interoperability Interface" and is a framework for building and publishing JavaScript libraries in multiple languages.

`projen` will generate the initial project structure and configuration files based on the `jsiiProject` type, including the necessary build scripts, package configuration, and CI/CD setup.

### GitHub Actions

The project will be hosted on GitHub, and CI/CD will be implemented using GitHub Actions.
GitHub Actions is a powerful workflow automation tool that allows you to build, test, and deploy your code directly from your GitHub repository.
It provides pre-built actions and allows for custom actions, making it a convenient choice for CI/CD pipelines.
With GitHub Actions, you can have confidence in the reliability and efficiency of your project's CI/CD process.

The following workflows will be implemented using GitHub Actions for the development of a library:

- Build and Test Workflow: This workflow will build the library and run tests to ensure code quality and functionality.
- Code Quality Workflow: This workflow will run code quality checks, such as linting and static analysis, to maintain code standards.
- Documentation Workflow: This workflow will generate documentation for the library, ensuring up-to-date and comprehensive documentation.
- Release Workflow: This workflow will automate the release process, including versioning, generating release notes, and publishing artifacts.
- Pull Request Workflow: This workflow will automate the process of reviewing and merging pull requests. These workflows need to be green to be able to merge

This workflow will help ensure code quality and streamline the pull request process for efficient collaboration and integration of new features or bug fixes.

These workflows will help automate and streamline the development, testing, and documentation processes, ensuring a smooth and efficient library development workflow.
