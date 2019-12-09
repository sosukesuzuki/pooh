let remark: any = null;

export function compileMarkdown(value: string): Promise<string> {
    if (!remark) {
        return Promise.resolve(value);
    }
    return new Promise((resolve, reject) => {
        remark.process(value, (err: Error, file: any) => {
            if (err) {
                reject(err);
            }
            resolve(file.toString());
        });
    });
}

console.time('worker:load-remark');
(async function(): Promise<void> {
    const [r, ...plugins] = await Promise.all([
        import(/* webpackChunkName: "remark" */ 'remark'),
        import(/* webpackChunkName: "remark" */ 'remark-breaks'),
        import(/* webpackChunkName: "remark" */ 'remark-emoji'),
        import(/* webpackChunkName: "remark" */ 'remark-html'),
    ]);
    remark = r
        .default()
        .use(plugins[0])
        .use(plugins[1])
        .use(plugins[2]);
    console.timeEnd('worker:load-remark');
})();
