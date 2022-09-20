<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-08-01 16:58:45
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-03 10:21:17
 * @Description: 
-->
# 服务启动后自动导入初始数据

## 功能说明

提供importData函数支持导入.data.json、.data.csv、.flow.json数据

- 比如在自定义的软件包package.service.js中监听系统初始化事件或者服务启动时调用importData导入软件包中的数据：

```js
const { importData } = require('@steedos/data-import')
const path = require('path')
module.exports = {
    /**
     * Events
     */
    events: {
        // 系统通过环境变量初始化成功
        'service-cloud-init.succeeded': async function (ctx) {
            await importData(path.join(__dirname, 'main', 'default', 'data'));
        },
        // 系统通过注册用户初始化成功
        "space.initialized": {
            async handler() {
                await importData(path.join(__dirname, 'main', 'default', 'data'));
            }
        }
    },
    /**
     * Service started lifecycle event handler
     */
    async started() {
        await importData(path.join(__dirname, 'main', 'default', 'data'));
    },
};
```

- importData 函数参数说明
```js
/**
 * 
 * @param {*} filePath 要导入数据的文件夹路径
 * @param {*} onlyInsert 仅导入，在导入数据之前先检查，如果存在任意一条记录，则不执行导入，默认true，如果是false, 则如果存在则执行更新操作。
 */
export async function importData(filePath: string, onlyInsert: boolean = true) {
    // 函数体
}
```

## 使用mongodb cli 导出演示数据
- json: 使用命令导出。例如: `mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps"  --jsonArray --collection=contract_types  --out=contract_types.data.json`
- csv: 使用命令导出。例如: `mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps"  --collection=contract_types --type=csv --fields=name,code --out=contract_types.data.csv`

## 编码要求
json、csv中文件请使用`utf-8`编码

## 示例，导出合同模块数据， 进入`main\default\data`文件夹后执行以下命令
```
mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps"  --collection=contract_types --type=csv --fields=name,code --out=contract_types.data.csv

mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps" --jsonArray --collection=contracts  --out=contracts.data.json

mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps" --jsonArray --collection=accounts  --out=accounts.data.json

mongoexport --uri="mongodb://192.168.3.31:27017/steedos-apps" --jsonArray --collection=currency  --out=currency.data.json
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
- 查看 主数据应用中的 计量单位、货币

