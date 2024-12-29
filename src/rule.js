//用户编译的规则在前
// let rule_1 = () => {};

// window.data = "";

// let rule_1 = () => {};

// window.rules = [{name:"xxx",obj:rule_1}];

const data = window.data || '';

const rules = window.rules || [];

for (const rule of rules) {
  let result = null;
  try {
    result = rule.obj.get(data);
    if (
      result !== undefined && result !== null &&
      result.money !== null &&
      parseFloat(result.money) > 0
    ) {
      result.ruleName = rule.name;
      print(JSON.stringify(result));
      break;
    }
  } catch (e) {
    print(e.message);
  }
}
