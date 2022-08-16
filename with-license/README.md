<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-08-16 16:41:48
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-16 19:23:58
 * @Description: 
-->

# 调用平台与软件包授权服务，验证许可证

## 功能说明

- 在自定义的软件包package.service.js的beforeStart中验证许可证：

```js
const { isPlatformEnterPrise } = require('@steedos/license')
const objectql = require('@steedos/objectql')
module.exports = {
	/**
	 * Methods
	 */
	methods: {
		beforeStart: async function () {
			const spaceDoc = (await objectql.getObject('spaces').find({}))[0]
			if (spaceDoc) {
				const allow = await isPlatformEnterPrise(spaceDoc._id)
				if (!allow) {
					throw new Error(`请购买企业版许可证，以使用此功能。`);
				}
			}
		}
	},
};
```

## 使用向导

### 启动 mongodb 和 redis 

```bash
docker-compose up
```

### 启动 steedos

```bash
yarn
yarn start
```

- 使用浏览器打开 [http://localhost:5500](http://localhost:5500)
- 注册管理员账户、创建企业。
- 重启服务

