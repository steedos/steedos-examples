<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-20 09:20:11
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-20 09:51:40
 * @Description: 
-->
This is a [Steedos](https://www.steedos.com/) project bootstrapped with [`create-steedos-app`](https://github.com/steedos/steedos-platform/tree/master/packages/create-steedos-app).

## Getting Started

### Generate STEEDOS_CSFLE_MASTER_KEY

```bash
node ./createMasterKey.js
```

Copy the string in `master-key.txt` to STEEDOS_CSFLE_MASTER_KEY in .env


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

### Configure encrypted fields

When the administrator selects the field type as text/password in the Settings-Object Details page, the Encryption check box will appear. After checking, the content of the encrypted field in the newly added object record will be encrypted and saved to the database

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.
- [Steedos Examples](https://github.com/steedos/steedos-examples) - Enjoy our selection of steedos examples to learn from or incorporate into your project.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
