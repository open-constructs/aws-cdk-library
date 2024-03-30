The project governance of the new community-driven CDK construct library initiative by the Open Construct Foundation is designed to ensure the quality, reliability, and security of the constructs provided to the AWS community.

The governance process involves thorough reviews and stringent security checks for all constructs included in the library. This ensures the constructs that are marked as stable by the maintainers meet the highest standards and are reliable for AWS infrastructure development.

Under the careful stewardship of the Open Construct Foundation, the project will leverage the collective expertise of experienced CDK users, who will contribute to the development and maintenance of the library. This community-driven approach ensures that the constructs offered cover a wide range of L2 and L3 functionalities, extending the core library provided by AWS.

By following this governance model, the Open Construct Foundation aims to provide top-quality constructs that enhance the AWS infrastructure development experience and meet the needs of the AWS community.

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
* Use the AWS CDK library as a reference for design patterns

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

    this.createResource();
  }
  
  protected createResource() {
    // Create the resource here
    this.something = new CfnSomething(this, 'Resource', {
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

