<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-21 15:57:56
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-27 17:01:55
 * @Description: 
-->

## 入门

### 功能说明

- 支持使用SQL语句查询mongodb数据库

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

### 安装 MongoDB Connector for BI

- [Install BI Connector on macOS](https://www.mongodb.com/docs/bi-connector/current/tutorial/install-bi-connector-macos/)

- 终端启动 Connector 服务
  
  ```
  mongosqld --schemaSource steedos --schemaMode custom
  ```
  > 输出 `waiting for connections at 127.0.0.1:3307` 表示启动成功
  
  > steedos 为 .env 中 MONGO_URL 指定的库名

### 连接 Connector

- 使用 navicat 新建 mysql 连接
  - 主机: localhost
  - 端口：3307
  - 默认用户名
  - 无密码
  
- 使用mysql语句查询mongodb数据
  - 新建查询，选择steedos库
    ```sql
    SHOW TABLES;
    SELECT * FROM spaces;
    ```