<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-21 15:57:56
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-21 17:33:03
 * @Description: 
-->

## 入门

### 启动 mongodb 和 redis 

```bash
docker-compose up
```

### 启动 steedos

```bash
yarn
yarn start
```

- 使用浏览器打开 [http://localhost:5500](http://localhost:5500).

- 在 设置/应用程序/软件包 页面手动安装软件包 @steedos-labs/workflow

- 在 设置/审批王/流程 页面新建流程

- 在 设置/审批王/流程触发器 页面新建流程触发器， 配置URL为 `http://127.0.0.1:5500/api/test/webhooks`

- 在 审批中心 新建申请单并提交后，查看服务器日志
