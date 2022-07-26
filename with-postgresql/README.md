PostgreSQL 数据源
===

本示例以 keycloak 数据库为例，演示如何使用华炎魔方配置外部数据源，连接第三方业务系统。

This is a example about how to use [postgresql] (https://www.postgresql.org/) as a third party datasource of Steedos

Learn [Documentation for this example](https://www.steedos.com/docs/admin/datasource) for more.

### Start keyclak

```bash
cd keycloak
docker-compose up
```

Now you can login into keycloak at `127.0.0.1:8080/admin`

### Start mongodb & redis service

```bash
docker-compose up
```

### Start steedos service

```bash
yarn
yarn start
```

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
