This is a [Steedos](https://www.steedos.com/) project bootstrapped with [`create-steedos-app`](https://github.com/steedos/steedos-platform/tree/master/packages/create-steedos-app).

This is a example about how to use [postgresql] (https://www.postgresql.org/) as a third party datasource of Steedos

Learn [Documentation for this example](https://www.steedos.com/docs/admin/datasource) for more.

## Getting Started

The command bellow will install the dependencies.

```bash
yarn
```

The command bellow will start mongodb, redis service, postgres and pgadmin4 service on [Docker](https://www.docker.com), and then it will start the steedos service auto.

You can down all of service just by type `CTRL + c` and restart it by the command bellow again.

```bash
yarn start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result for steedos service.

Open [http://localhost:82](http://localhost:82) with your browser to see the result for pgadmin4 service which can connect to postgres.

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
