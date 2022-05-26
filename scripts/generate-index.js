import path from 'path';
import fs from 'fs';
import fg from 'fast-glob';

async function generateExports() {
  const packages = fg.stream('src/**/*.{ts,tsx}');
  const index = path.resolve('src/index.ts');

  const stream = fs.createWriteStream(index);
  stream.write(`/**\n * This file is generated at compile-time.\n */\n\n`);

  for await (const pkg of packages) {
    if (pkg === 'src/index.ts') continue;

    const localPath = pkg
      .replace(/^src/, '.')
      .replace(/.tsx?$/, '');

    const pkgName = localPath.split('/').slice(-1).join()

    stream.write(`export { ${pkgName} } from '${localPath}'\n`);

  }

  return new Promise((resolve) => {
    stream.on('finish', () => {
      resolve(true)
    })
  })
}

generateExports();
