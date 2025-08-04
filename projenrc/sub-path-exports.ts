import { readdirSync } from 'fs';
import path from 'path';
import { Component, SourceCode } from 'projen';
import type { TypeScriptProject } from 'projen/lib/typescript';

/**
 * Dynamically generate Node.js subpath exports and root barrel file.
 *
 * @see https://nodejs.org/api/packages.html#subpath-patterns
 */
export class SubPathExports extends Component {
  private readonly solutions: string[];

  constructor(public readonly project: TypeScriptProject) {
    super(project);

    /**
     * Gather all solution directories (e.g. `aws-codeartifact`, `aws-cur`).
     */
    this.solutions = readdirSync(path.join(project.outdir, project.srcdir), {
      encoding: 'utf8',
      withFileTypes: true,
    })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b));

    this.generateBarrel();
    this.generateSubPathExports();
  }

  private generateBarrel() {
    const sourceCode = new SourceCode(this.project, path.join(this.project.srcdir, 'index.ts'));

    sourceCode.line('// ' + sourceCode.marker);

    for (const solution of this.solutions) {
      const exportedName = solution.split('-').join('_');
      sourceCode.line(`export * as ${exportedName} from './${solution}';`);
    }
  }

  private generateSubPathExports() {
    const subPathExport = (...chunks: string[]) => './' + path.posix.join(this.project.libdir, ...chunks);

    const subPathExports: Record<string, string> = {
      '.': subPathExport('index.js'),
    };

    for (const solution of this.solutions) {
      subPathExports[`./${solution}`] = subPathExport(solution, 'index.js');
    }

    this.project.package.addField('exports', subPathExports);
  }
}
