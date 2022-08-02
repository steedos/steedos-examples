<!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-08-01 16:58:45
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-01 18:18:44
 * @Description: 
-->
# 服务启动后自动初始化系统数据

### 提供importData函数支持导入.data.json、.data.csv、.flow.json数据

- 比如在自定义的软件包package.service.js中监听系统初始化事件或者服务启动时调用importData导入软件包中的数据：

```js
const { importData } = require('@steedos/data-import')
const path = require('path')
module.exports = {
    /**
     * Events
     */
    events: {
        // 系统初始化成功
        'service-cloud-init.succeeded': async function (ctx) {
            await importData(path.join(__dirname, 'main', 'default', 'data'));
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
- 默认账户：admin、密码：123456
- 查看 主数据应用中的 计量单位、货币

