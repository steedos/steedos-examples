## 启动项目

### 运行Docker

运行以下命令行即可，它包含redis 和 mongodb 服务。

```bash
docker-compose up
```

### 环境变量

如果是在远程开发环境是启动项目，需要新建.env.local文件并配置ROOT_URL为当前环境访问地址。

```
ROOT_URL=https://5000-steedos-steedosexamples-v0diys6e9mj.ws-us75.gitpod.io
```

## 示例效果

amis-dashboard项目提供示例Amis页面配置代码，配置效果如下：

- OA首页

![oa首页](./dashboard1.png)

- 数据看板

![数据看板](./dashboard2.png)

注意：项目启动后amis页面可能出现跨域问题，需要修改ROOT_URL地址为当前环境访问地址。