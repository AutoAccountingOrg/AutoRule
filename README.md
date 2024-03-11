<p align="center">
<img src="https://socialify.git.ci/Auto-Accounting/AutoRule/image?description=1&descriptionEditable=%E8%87%AA%E5%8A%A8%E8%AE%B0%E8%B4%A6%E8%A7%84%E5%88%99%E6%9E%84%E5%BB%BA%E6%A1%86%E6%9E%B6&forks=1&issues=1&logo=https%3A%2F%2Fpic.dreamn.cn%2Fruler-svgrepo-com.svg&name=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light" alt="AutoRule" width="640" height="320" />
</p>



## 简介
该工具是自动记账App的衍生工具，用于构建自动记账的自动分类规则和自动识别规则。

## 构建

- 基础环境：`NodeJS` 
- 包管理器：`yarn`
- 构建工具：`webpack`
- 测试工具: `jest`
- 依赖安装：`yarn install`

使用如下命令构建自动记账规则：
```shell
yarn build
```

使用如下命令构建并测试自动记账规则：
```shell
yarn test
```

## 目录结构说明
```
├── package.json
├── src                                     项目主目录
│   ├── category
│   │   ├── main.js     自动分类的主要文件（更新该文件）
│   │   └── main.test.js       测试文件
│   ├── category.js                   自动分类调用入口
│   ├── rule                          规则列表
│   │   ├── app                 App规则
│   │   │   ├── 支付宝消息盒子  规则名称文件夹
│   │   │   │   ├── main.js     规则文件
│   │   │   │   └── main.test.js 测试文件
│   │   ├── helper              无障碍规则
│   │   ├── notice              通知规则
│   │   └── sms                 短信规则
│   ├── rule.js                       自动记账识别规则调用入口
│   ├── test.js                       自动记账测试调用入口        
│   └── utils                         工具类
│       ├── BillType.js               账单类型
│       ├── Currency.js               币种
│       ├── DataType.js               数据类型（标记是App还是短信）
│       ├── RuleModules.js            
│       ├── RuleObject.js             规则对象
│       └── Time.js                   时间处理函数
├── webpack.config.js
└── yarn.lock

```

## 使用
- 自动记账的规则会进行周期性更新，自动记账用户跟随App更新提醒进行周期性更新即可。

## 参与贡献

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。

1. 克隆这个项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到你的分支 (`git push origin feature/AmazingFeature`)
5. 发起合并请求

> 关于Commit的一点小要求：

```
commit格式采用： [类型] : [更改内容]

feat: 新功能
fix: 修复问题
docs: 修改文档
style: 修改代码格式，不影响代码逻辑
refactor: 重构代码，理论上不影响现有功能
perf: 提升性能
test: 增加修改测试用例
chore: 修改工具相关（包括但不限于文档、代码生成等）
deps: 升级依赖
```
## 赞助支持

|                             微信                             |                            支付宝                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Wechat QRcode](https://pic.dreamn.cn/uPic/2023_04_23_00_41_49_1682181709_1682181709722_KGWAI6.jpg) | ![Alipay QRcode](https://pic.dreamn.cn/uPic/2023_04_23_00_42_02_1682181722_1682181722820_82xpxH.jpg) |

## 协议

GPL 3.0
