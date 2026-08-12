import { analyzeMetafile, build } from 'esbuild'

const isAnalyze = process.argv.includes('--analyze')

const entryPoints = ['lib/index.ts', 'lib/math.ts', 'lib/string.ts']
const external = ['react', 'lodash']

const esm = await build({
  entryPoints,
  outdir: 'dist/lib/esm',
  format: 'esm',
  bundle: true,
  external,
  metafile: isAnalyze,
})

const cjs = await build({
  entryPoints,
  outdir: 'dist/lib/cjs',
  format: 'cjs',
  bundle: true,
  external,
  outExtension: { '.js': '.cjs' },
  metafile: isAnalyze,
})

if (esm.metafile && cjs.metafile) {
  console.log(await analyzeMetafile(esm.metafile, { verbose: true }))
  console.log(await analyzeMetafile(cjs.metafile, { verbose: true }))
}
