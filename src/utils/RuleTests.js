const tests = {};

// 使用 require.context 自动导入所有规则模块
const ruleContext = require.context('../rule', true, /\.txt$/);
ruleContext.keys().forEach(key => {
    const moduleName = key.replace(/\.\/(.+)\.txt$/, '$1');
    tests[moduleName] = ruleContext(key);
});

export default tests;
