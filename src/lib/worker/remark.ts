let remark: any = null;

export function compileMarkdown(value: string): string {
  if (!remark) {
    return value;
  }
  return remark.processSync(value).toString();
}

console.time('worker:load-remark');
(async function(): Promise<void> {
  const [r1, r2, r3, r4, r5] = await Promise.all([
    import(/* webpackChunkName: "remark" */ 'remark'),
    import(/* webpackChunkName: "remark" */ 'remark-breaks'),
    import(/* webpackChunkName: "remark" */ 'remark-emoji'),
    import(/* webpackChunkName: "remark" */ 'remark-html'),
    import(/* webpackChunkName: "remark" */ 'remark-highlight.js'),
  ]);
  remark = r1
    .default()
    .use(r2.default)
    .use(r3.default)
    .use(r4.default)
    .use(r5.default);
  console.timeEnd('worker:load-remark');
})();
