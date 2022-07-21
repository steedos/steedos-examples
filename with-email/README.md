<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-20 09:20:11
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-21 11:12:39
 * @Description: 
-->
This is a [Steedos](https://www.steedos.com/) project bootstrapped with [`create-steedos-app`](https://github.com/steedos/steedos-platform/tree/master/packages/create-steedos-app).

## Getting Started

### Start MailDev service

```bash
docker-compose -f maildev/docker-compose.yml up
```

MailDev webapp running at http://0.0.0.0:4000
MailDev SMTP Server running at 0.0.0.0:4025

### Set environment variables

`STEEDOS_EMAIL_FROM` and `STEEDOS_EMAIL_URL` in .env (configured by default).

### Start mongodb & redis service

```bash
docker-compose up
```

### Start steedos service

```bash
yarn
yarn start
```

Open [http://localhost:5500](http://localhost:5500) with your browser to see the result.

### Register with Email

- Register your account with email.
- See emails in [http://0.0.0.0:4000](http://0.0.0.0:4000) with your browser.

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.
- [Steedos Examples](https://github.com/steedos/steedos-examples) - Enjoy our selection of steedos examples to learn from or incorporate into your project.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
