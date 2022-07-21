This is a [Steedos](https://www.steedos.com/) project bootstrapped with [`Docker`](https://www.steedos.com/docs/deploy/deploy-docker).

## Getting Started

### Start mongodb & redis service & steedos service

```bash
docker-compose up -d
```

### Logs for steedos service

```bash
docker-compose ps
```

Copy the `CONTAINER ID` of `steedos/steedos-community`.

```bash
docker logs -tf d08f0b323ee8
```

`d08f0b323ee8` is the `CONTAINER ID` copied above.

### Open With Browser

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
