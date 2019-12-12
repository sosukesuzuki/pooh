let prettier: any = null;
let markdown: any = null;

export function format(value: string) {
    if (!prettier || !markdown) {
        return value;
    }
    return prettier.format(value, { plugins: [markdown], parser: 'markdown' });
}

console.time('worker:load-prettier');
(async function(): Promise<void> {
    const [p, m] = await Promise.all([
        import(/* webpackChunkName: "prettier" */ 'prettier/standalone'),
        import(/* webpackChunkName: "prettier" */ 'prettier/parser-markdown'),
    ]);
    prettier = p.default || p;
    markdown = m.default || m;
    console.timeEnd('worker:load-remark');
})();
