
首先，感谢您抽出时间来贡献！

我们鼓励和重视各种类型的贡献。在贡献之前，请确保阅读相关部分。这将使我们这些维护者的工作变得更容易，也会让所有参与者的体验更加顺畅。社区期待您的贡献。

> 如果您喜欢这个项目，但没有时间贡献，那也没关系。还有其他简单的方式来支持该项目并表示您的赞赏，我们也会非常高兴：
> - 给项目点个Star
> - 在 社交媒体 上分享
> - 在您项目的 readme 中引用该项目
> - 推广该项目并告诉您的朋友/同事


## 行为准则

自动记账是一个纯粹的自动化记账插件，采用GPLV3授权使用，禁止涉及政治、侵权等行为。

## 我有一个问题

> 如果您想要提问，我们假设您已阅读了可用的[文档](https://auto.ankio.net)。

本仓库不受理任何规则问题，规则问题请在这里提问：[AutoAccountingOrg/AutoAccounting](https://github.com/AutoAccountingOrg/AutoAccounting/issues)

## 我想要贡献


### 您的第一个代码贡献

我们鼓励您为自动记账规则贡献代码。这可能是您的第一个开源贡献，这是一个很好的开始。这是一些可以帮助您的指导：

自动记账规则采用`javascript`编写，使用`rollup`构建。如果您不熟悉这些工具，我们建议您先阅读相关文档。

为了提高代码兼容性使用`jest`作为测试框架，使用`babel`进行代码转换。

#### 项目结构

```
├── package.json
├── src                                     项目主目录
│   ├── category
│   │   ├── main.js     自动分类的主要文件（更新该文件）
│   │   └── main.test.js       测试文件
│   ├── category.js                   自动分类调用入口
│   ├── rule                          规则列表
│   │   │   ├── com.eg.android.AlipayGphone 支付宝包名                App规则
│   │   │   │  ├── app                 App规则
│   │   │   │   ├── 支付宝消息盒子  规则名称文件夹
│   │   │   │   │   ├── test        测试数据文件夹
│   │   │   │   │   │   ├──支付宝消费1.txt      测试数据
│   │   │   │   │   ├── main.js     规则文件
│   │   │   │   │   └── main.test.cjs 测试文件
│   │   │   │  ├── helper              无障碍规则
│   │   │   │  ├── notify              通知规则
│   ├── rule.js                       自动记账识别规则调用入口
│   ├── test.cjs                       自动记账测试调用入口        
│   └── utils                         工具类
│       ├── BillType.js               账单类型
│       ├── Currency.js               币种
│       ├── DataType.js               数据类型（标记是App还是短信）
│       ├── Html.js                   Html工具类
│       ├── AliTool.js                支付宝公共处理函数
│       ├── RuleObject.js             规则对象
│       └── Time.js                   时间处理函数
└── yarn.lock

```

#### 代码规范

- 使用`eslint`进行代码检查
- 使用`jest`进行单元测试
- 使用`rollup`进行构建
- 使用`yarn`进行包管理
- 使用`git`进行版本控制

> [!IMPORTANT]
> 虽然自动记账使用的Rhino只支持ES5的语法规范，但是在写规则的时候可以使用ES6的语法规范，构建的时候会自动转换。
> Rhino对一些比较新的正则支持比较差，请避免使用如下正则：
> - 分组捕获 `(?<name>...)`

#### 测试规范

请务必保证所有的测试用例都通过，如果你新增了规则，请务必在`main.test.cjs`中编写测试用例，以保证规则的正确性。

测试用例编写规范：

```javascript

testAnkioInit(
    get, //导入main.js的get方法
    __dirname,//当前文件路径
    DataType.App,//这个规则类型
    "com.tencent.mm" //这个规则对应的包名
)
test(
    "收钱吧消费通知",//测试用例名称
    () => testAnkio('收钱吧消费通知'//测试用例数据名称
        ,[//数组，如果是多个测试用例请直接补充到数组结尾
    {
        type: 0,
        money: 2.00,
        shopName: '三津汤包雅雀湖店',
        shopItem: '门店收款',
        accountNameFrom: '',
        accountNameTo: '',
        fee: 0,
        currency: 'CNY',
        time: '',
        channel: '微信[收钱吧消费通知]'
    }
]))

```

测试用例数据的目录格式:

```angular2html
│   ├── test
│   │   ├── 收钱吧消费通知.txt
│   │   ├── 收钱吧消费通知2.txt
```

如果是多个测试数据，从第二个数据开始加上数字，数字从2开始，第一个不加。


#### 提交代码

> 我们推荐使用：[gitmoji](https://gitmoji.dev/)规范提交信息。
> 推荐使用[AI-Git-Commit](https://plugins.jetbrains.com/plugin/24851-ai-git-commit) 自动生成提交信息（区域：美国），自定义提示词请使用根目录下`commit-prompt.txt`文件内容。
> 如果无法使用AI-Git-Commit插件，也可以使用[gitmoji-intellij-plugin](https://github.com/AnkioTomas/gitmoji-intellij-plugin/releases/tag/v1.14.0)来减少Emoji记忆。

commit格式采用： :[emoji]: [更改内容] #关联issue

例如修复issue(#1)：

```shell
git commit -m ":bug: 修复xx问题 #1"
```

**注意：**
- emoji与提交文本之间需要有一个空格
- 每条commit信息只允许包含一个关联issue

可参考以下emoji列表：

- `:art:` : 改进代码结构/格式。
- `:zap:` : 提升性能。
- `:fire:` : 删除代码或文件。
- `:bug:` : 修复错误。
- `:ambulance:` : 关键热修复。
- `:sparkles:` : 引入新功能。
- `:memo:` : 添加或更新文档。
- `:rocket:` : 部署内容。
- `:lipstick:` : 添加或更新 UI 和样式文件。
- `:tada:` : 开始一个项目。
- `:white_check_mark:` : 添加、更新或通过测试。
- `:lock:` : 修复安全或隐私问题。
- `:closed_lock_with_key:` : 添加或更新秘密。
- `:bookmark:` : 发布/版本标签。
- `:rotating_light:` : 修复编译器/代码检查警告。
- `:construction:` : 进行中的工作。
- `:green_heart:` : 修复 CI 构建。
- `:arrow_down:` : 降级依赖。
- `:arrow_up:` : 升级依赖。
- `:pushpin:` : 将依赖固定到特定版本。
- `:construction_worker:` : 添加或更新 CI 构建系统。
- `:chart_with_upwards_trend:` : 添加或更新分析或跟踪代码。
- `:recycle:` : 重构代码。
- `:heavy_plus_sign:` : 添加依赖。
- `:heavy_minus_sign:` : 移除依赖。
- `:wrench:` : 添加或更新配置文件。
- `:hammer:` : 添加或更新开发脚本。
- `:globe_with_meridians:` : 国际化和本地化。
- `:pencil2:` : 修复拼写错误。
- `:poop:` : 编写需要改进的坏代码。
- `:rewind:` : 还原变更。
- `:twisted_rightwards_arrows:` : 合并分支。
- `:package:` : 添加或更新编译文件或包。
- `:alien:` : 更新因外部 API 变更的代码。
- `:truck:` : 移动或重命名资源（如文件、路径、路由）。
- `:page_facing_up:` : 添加或更新许可证。
- `:boom:` : 引入重大变更。
- `:bento:` : 添加或更新资产。
- `:wheelchair:` : 提升无障碍性。
- `:bulb:` : 在源代码中添加或更新注释。
- `:beers:` : 酒后编写代码。
- `:speech_balloon:` : 添加或更新文本和文字。
- `:card_file_box:` : 执行数据库相关更改。
- `:loud_sound:` : 添加或更新日志。
- `:mute:` : 移除日志。
- `:busts_in_silhouette:` : 添加或更新贡献者。
- `:children_crossing:` : 改善用户体验/可用性。
- `:building_construction:` : 进行架构变更。
- `:iphone:` : 从事响应式设计。
- `:clown_face:` : 模拟事物。
- `:egg:` : 添加或更新复活节彩蛋。
- `:see_no_evil:` : 添加或更新 .gitignore 文件。
- `:camera_flash:` : 添加或更新快照。
- `:alembic:` : 进行实验。
- `:mag:` : 提升 SEO。
- `:label:` : 添加或更新类型。
- `:seedling:` : 添加或更新种子文件。
- `:triangular_flag_on_post:` : 添加、更新或移除功能标志。
- `:goal_net:` : 捕获错误。
- `:dizzy:` : 添加或更新动画和过渡。
- `:wastebasket:` : 弃用需要清理的代码。
- `:passport_control:` : 处理与授权、角色和权限相关的代码。
- `:adhesive_bandage:` : 非关键问题的简单修复。
- `:monocle_face:` : 数据探索/检查。
- `:coffin:` : 删除无用代码。
- `:test_tube:` : 添加失败的测试。
- `:necktie:` : 添加或更新业务逻辑。
- `:stethoscope:` : 添加或更新健康检查。
- `:bricks:` : 基础设施相关变更。
- `:technologist:` : 改善开发者体验。
- `:money_with_wings:` : 添加赞助或资金相关的基础设施。
- `:thread:` : 添加或更新与多线程或并发相关的代码。
- `:safety_vest:` : 添加或更新验证相关的代码。

