# Contributing to the Community-driven CDK Construct Library Initiative

The project governance of the new community-driven CDK construct library initiative by the Open Construct
Foundation is designed to ensure the quality, reliability, and security of the constructs provided to the AWS
community.

The governance process involves thorough reviews and stringent security checks for all constructs included in
the library. This ensures the constructs that are marked as stable by the maintainers meet the highest
standards and are reliable for AWS infrastructure development.

Under the careful stewardship of the Open Construct Foundation, the project will leverage the collective
expertise of experienced CDK users, who will contribute to the development and maintenance of the library. This
community-driven approach ensures that the constructs offered cover a wide range of L2 and L3 functionalities,
extending the core library provided by AWS.

By following this governance model, the Open Construct Foundation aims to provide top-quality constructs that
enhance the AWS infrastructure development experience and meet the needs of the AWS community.

## Contributor roles

The contributor roles for the new CDK construct library initiative are designed to provide clear guidance on responsibilities and ways to contribute.

**Contributors** can contribute in various ways, such as reporting bugs, suggesting improvements,  providing feedback on existing constructs, and writing new constructs. There are no formal requirements to become a contributor, though contributions will have a higher chance of being accepted if they are well prepared and show good understanding of the CDK construct library specifically and CDK in general.

**Reviewers** take on responsibilities such as maintaining existing constructs, leading discussions, and reviewing pull requests. Reviewers are chosen among those who have already contributed to AWS CDK, the CDK construct library, or who have published constructs on their own.

**Maintainers** are responsible for overseeing the entire project. They make important decisions, coordinate efforts, and ensure the overall quality and direction of the library. Maintainers are chosen among reviewers that have shown a good grasp around the overall direction of the project.

Outside of these contributor roles, there are additional roles of involvement within the Open Construct Foundation. These roles include board members and officers who oversee the organization and its initiatives. Board members provide strategic guidance and uphold the Foundation's mission. Officers decide on the direction of the foundation based on the advise from the board members and are responsible for specific functional areas like finance, operations, or community engagement.

## Construct Design

Construct design in this library has two primary goals:

1. Maintain a high level of consistency across constructs to make them easy to use and understand.
2. Ensure that little to no changes are required to merge constructs into the core AWS CDK library.

To achieve these goals, the following design principles are followed:

* Focus on only accepting L2 constructs to start. L3 constructs will come later as the library matures.
* Follow [the AWS CDK contributing guides](https://github.com/aws/aws-cdk/blob/main/CONTRIBUTING.md)
* Use the AWS CDK library as a reference for [design patterns](https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md).

Additionally, constructs [SHOULD](https://datatracker.ietf.org/doc/html/rfc2119#section-3):

* Follow the standard CDK pattern of having all options on the third construct parameter (props).
* Each option in the props passed to the construct should be readonly.

```typescript
/**
 * Properties for MyConstruct.
 */
export interface MyConstructProps {
  /**
   * My property.
   */
  readonly myProperty: string;
}
```

* Be named after the AWS resource they create.
* Acronyms used in the construct name should not be entirely captialized. For example, `Vpc` instead of `VPC`.
* The primary L1 (Cfn*) construct should have an 'id' of `Resource`.
* Appropriate .grant*() methods should be implemented for IAM permissions.
* If the resource must reside in a VPC, then the construct must require a VPC as a parameter.
  * Additionally, the construct should have a `connections` property that allows for the addition of security groups and subnets.
* All properties and methods should be properly documented with TypeScript docs.
* Default values, overridden properties, and supplied resources should be properly test in Fine-Grained Assertion test.
  * For example, if a resource requires an IAM Role, tests should exist that a default Role is created and that a Role can be provided and used appropriately.
* Unit test coverage should be at least 100% for all constructs. Any inability to reach this goal should be clearly stated in the Pull Request.
* Integration tests should be written, at least one for each construct but more is appreciated.
  * Integration tests should be designed to be quick to execute. If this can't be achieved because it requires creating
    a resource that takes a long time to create, then the integration test can be skipped.
* L1 constructs should be created in protected methods to allow for easy extension of the construct. For example:

```typescript
export class MyConstruct extends Construct {
  protected something: CfnSomething;
  constructor(scope: Construct, id: string, private props: MyConstructProps) {
    super(scope, id);

    this.something = this.createResource();
  }
  
  protected createResource(): CfnSomething {
    // Create the resource here
    return new CfnSomething(this, 'Resource', {
      something: this.props.something,
    });
  }
}
```

* The props argument to the constructor should be marked as private so that it is accessible elsewhere in the construct but not from outside the construct.
* Eslint should be executed and pass with no errors or warnings.
* A static import method from attributes (e.g. `.fromSomethingAttributes()`) should be written.
  * Other import methods normally require access to the context API which is beyond the scope of these constructs. We'd like to address this in the future.
* Constructs should implement an interface so that the import methods (e.g. `.fromSomethingAttributes()`) can return the interface type.

## Testing

Tests are fundamental to building good constructs. The following testing guidelines should be followed:

* All tests should be stored in the `test/<something>` subdirectory. For example, if you are creating
a construct for the AppStream service, then the module name would be `aws-appstream` and tests would go in the
`/test/aws-appstream` directory. The 'aws' prefix should only be used when building L2 constructs for
specific AWS services. If you are building L3 constructs that span multiple services, then you shouldn't use
a prefix.
* Fine-grained tests should be implemented for all constructs with a goal of 100% coverage. For example,
if you were creating an Application construct in the AppSteam module, your tests should be in the `test/aws-appstream/application.test.ts` file.
* Integration tests should be written for all constructs. For example, if you are creating an integration test
for the Application construct in the AppStream module, your tests should be in the `test/aws-appstream/application.integ.ts` file.

### Fine-grained assertion tests

Unit tests should be created that cover all pathways of code in your construct, including the testing of any
default value or conditionals. Test reports will report code coverage.

For example, if your construct has a property that can be overridden, you should have a test that ensures the
property is overridden correctly and that creates a default value when not overridden.
An example of this can be found [here](./test/aws-examplemodule/example.test.ts).

> [!NOTE]  
> The specific code in these tests are not a prescription for how to write tests, but rather an example of how to structure them.
> Testing that a role is correct could be done multiple ways and this is just one.

* In the test 'Uses provided Role for Lambda Function' the Lambda Function is referenced via the `.node.defaultChild` property and then the role is compared to the one provided.
* In the test 'Creates a role when none provided' fine-grained assertions are used to verify a role was created with the correct 'AssumeRolePolicyDocument' property.
* A `describe` is used to group together similar tests.

All tests for a construct should be contained in a single file.

### Snapshot tests

While snapshots tests are useful when developing AWS CDK applications, they should not be used when creating
constructs as they do not provide enough clarity on the intent of the construct.

### Integration tests

Integration tests should be created to cover a basic deployment of the most common use case for a construct.
You do not need to create integration tests for every possible use case, but you should cover the most common.

An example of an integration test can be found [here](./test/aws-examplemodule/example.integ.ts).

To create a new test:

1. Create a new file called 'integ.something.ts' alongside the other tests for your module. E.g. `test/aws-examplemodule/integ.example.ts`.
2. Run `npx projen integ:update test/aws-examplemodule/integ.example.ts`. This will update the snapshot for the test. You will need to have AWS credentials in your environment.
3. Run `npx projen integ test/aws-examplemodule/integ.example.ts` to verify your current code against the snapshot.  
4. If the test fails, you can update the snapshot by running `npx projen integ:update test/aws-examplemodule/integ.example.ts` again.

Snapshots are created and stored in the `integ.example.ts.snapshot` directory and should be committed along with
the rest of your code.

## Windows Environment Setup

Currently `projen` does not support Windows very well.
Since this project makes use of `projen`, you will need to setup [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about) to contribute as a Windows user.

This section guides you through setting up your Windows machine.

### Installation

Install WSL if you do not have it installed yet:  

* [WSL Install](https://learn.microsoft.com/en-us/windows/wsl/install)  

Now you have access to an Ubuntu terminal powered by WSL.

> [!IMPORTANT]  
> From here on it is assumed you are using the WSL terminal to run all commands.\
> You can use [Windows Terminal (Recommended)](https://apps.microsoft.com/detail/9n0dx20hk701?rtc=1&hl=en-za&gl=ZA), or you can run the `wsl` command in CMD or PowerShell.

You can now setup Node.js in your WSL:  

* [Node.js Install](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)  

### Setup `aws-cdk-library` on WSL

Now that WSL is setup, you can clone this project onto your WSL machine in a preferred directory.

> [!NOTE]
> It is recommended to store all WSL specific projects in the WSL file system instead of the "mounted" Windows `C:\` drive, e.g., `~/< your_project_directory >/aws-cdk-library`.
> This will keep everything consistent in the Linux machine.

To contribute, fork the repository to your own GitHub account, and then clone it onto your machine:  

* `git clone https://github.com/<your_username_here>/aws-cdk-library.git`

Open the project and confirm that your setup is working by running the following commands:

* `npm install`  
* `npm run build`  

If it runs successfully, your environment is setup correctly.

## Pull Request

When submitting a pull request, please ensure that you have followed the guidelines outlined in this document.

### Pull Request Title

* Pull request title must adhere to [conventional commits](https://www.conventionalcommits.org):
  * `feat`: Indicates a new feature has been added to the project.
  * `fix`: Indicates a bug fix that corrects an issue in the project.
  * `chore`: Describes other changes.
  * `ci`: Changes to our CI configuration files and scripts.
  * `docs`: Documentation updates or additions, including both docstrings and Markdown files.
  * `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
  * `refactor`: A code change that neither fixes a bug nor adds a feature, primarily aimed at improving code readability or structure.
  * `test`: Adding missing tests or correcting existing tests.
  * `revert`: Used to indicate a reversal of a previous commit.
* Titles for `feat` and `fix` PRs end up in the change log. Think about what makes most sense for users reading the changelog while writing them.
  * `feat`: Describe the feature (not the action of creating the commit or PR, for example, avoid words like "added" or "changed")
  * `fix`: Describe the bug (not the solution)
* Formatting guidelines for titles:
  * Title should be lowercase (except for the special use of `Revert`).
  * Do not end the title with a period.
