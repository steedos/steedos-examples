Login with Steedos ID
===

## Getting Started

### Set .env

```bash
STEEDOS_IDENTITY_OIDC_ENABLED=true
STEEDOS_IDENTITY_OIDC_CONFIG_URL=https://id.steedos.cn/realms/dev/.well-known/openid-configuration
STEEDOS_IDENTITY_OIDC_CLIENT_ID=steedos-oidc-public
STEEDOS_IDENTITY_OIDC_CLIENT_SECRET=
STEEDOS_IDENTITY_OIDC_NAME=Steedos ID
```

### Start mongodb & redis service

```bash
docker-compose up
```

### Start steedos enterprise service

```bash
yarn
yarn start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
