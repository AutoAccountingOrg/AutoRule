<p align="center">
<img src="https://socialify.git.ci/Auto-Accounting/AutoRule/image?description=1&descriptionEditable=%E8%87%AA%E5%8A%A8%E8%AE%B0%E8%B4%A6%E8%A7%84%E5%88%99%E6%9E%84%E5%BB%BA%E6%A1%86%E6%9E%B6&forks=1&issues=1&logo=https%3A%2F%2Fpic.dreamn.cn%2Fruler-svgrepo-com.svg&name=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light" alt="AutoRule" width="640" height="320" />
</p>


## 注意

本仓库不受理任何自动记账规则有误的Issue，Issue请提交到[AutoAccountingOrg/AutoAccounting](https://github.com/AutoAccountingOrg/AutoAccounting/issues)仓库。
## 更新日志

[![](https://img.shields.io/github/v/release/AutoAccountingOrg/AutoRule.svg)](https://cloud.ankio.net/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/%E8%87%AA%E5%8A%A8%E8%AE%B0%E8%B4%A6/%E8%A7%84%E5%88%99%E6%9B%B4%E6%96%B0)

## 简介
该工具是自动记账App的衍生工具，用于构建自动记账的自动分类规则和自动识别规则。

## 更新频率

- 如果有用户`激励`，当天（限工作日 10:00 - 17:00）即可收到更新（用户激励的那条数据），非工作日顺延至下一个工作日。
- 如果没有用户`激励`，每月一次全量更新。

## 激励说明

- **非强制**：只是为了有更新动力，天天打白工，地主也扛不住。
- **金额**：1￥起步，上不封顶，金额越高，效率越高。
- **方式**：可以通过数据页面的`激励`按钮进行`激励`（自动记账Beta11以上版本）。

## 构建

- 基础环境：`NodeJS` 
- 包管理器：`yarn`
- 构建工具：`webpack`
- 代码风格: `eslint`
- 代码格式化: `prettier`
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

## 使用
- 自动记账的规则会进行周期性更新，自动记账用户跟随App更新提醒进行周期性更新即可。

## 参与贡献

[参考贡献指南](CONTRIBUTING.md)

## 赞助支持

|                             微信                             |                            支付宝                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Wechat QRcode](https://pic.dreamn.cn/uPic/2023_04_23_00_41_49_1682181709_1682181709722_KGWAI6.jpg) | ![Alipay QRcode](https://pic.dreamn.cn/uPic/2023_04_23_00_42_02_1682181722_1682181722820_82xpxH.jpg) |

## 协议

[GPL 3.0](LICENSE)
