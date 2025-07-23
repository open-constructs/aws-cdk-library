import { readdirSync } from 'fs';
import path from 'path';
import { Component, SourceCode } from 'projen';
import type { TypeScriptProject } from 'projen/lib/typescript';

export class SubPathExports extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    const solutions = readdirSync(path.join(project.outdir, project.srcdir), {
      encoding: 'utf8',
      withFileTypes: true,
    })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b));

    const sourceCode = new SourceCode(project, path.join(project.srcdir, 'index.ts'));
    sourceCode.line('// ' + sourceCode.marker);

    const subPathExportPath = (...chunks: string[]) => './' + path.posix.join(project.libdir, ...chunks);

    const subPathExports: Record<string, string> = {
      '.': subPathExportPath('index.js'),
    };

    for (const solution of solutions) {
      const exportName = solution.split('-').join('_');

      sourceCode.line(`export * as ${exportName} from './${solution}';`);

      subPathExports[`./${solution}`] = subPathExportPath(solution, 'index.js');
    }

    project.package.addField('exports', subPathExports);
  }
}
