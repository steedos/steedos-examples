This is a [Steedos](https://www.steedos.com/) project bootstrapped with [`create-steedos-app`](https://github.com/steedos/steedos-platform/tree/master/packages/create-steedos-app).

## Getting Started

### Start keyclak

```bash
cd keycloak
docker-compose up
```

### Create Keycloak ClientID

- Login into keycloak at `127.0.0.1:8080/admin`
- Clients - Create Client ID: steedos-oidc-dev

### Start mongodb & redis service

```bash
docker-compose up
```

### Start steedos service

```bash
yarn
yarn start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

### Running in Gitpod

```bash
echo "ROOT_URL=$(gp url 5000)" >> .env.local
echo "STEEDOS_IDENTITY_OIDC_CONFIG_URL=$(gp url 8080)/realms/master/.well-known/openid-configuration" >> .env.local
```

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
