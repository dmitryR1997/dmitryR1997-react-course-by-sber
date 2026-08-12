import { analyzeMetafile, build, context } from 'esbuild'

const isDev = process.argv.includes('--dev')
const isAnalyze = process.argv.includes('--analyze')

const options = {
  entryPoints: ['app/index.ts'],
  outdir: 'dist',
  entryNames: 'app',
  chunkNames: 'chunks/[name]-[hash]',
  bundle: true,
  splitting: true,
  format: 'esm' as const,
  minify: !isDev,
  sourcemap: !isDev,
  metafile: isAnalyze,
}

if (isDev) {
  const ctx = await context(options)

  await ctx.watch()
} else {
  const result = await build(options)

  if (result.metafile) {
    console.log(await analyzeMetafile(result.metafile, { verbose: true }))
  }
}
