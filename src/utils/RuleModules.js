const ruleModules = {};

// 使用 require.context 自动导入所有规则模块
const ruleContext = require.context('../rule', true, /main\.js$/);
ruleContext.keys().forEach(key => {
    const moduleName = key.replace(/\.\/(.+)\.js$/, '$1').replace("main","");
    ruleModules[moduleName] = ruleContext(key);
});

export default ruleModules;
