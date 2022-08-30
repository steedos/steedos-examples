# 自定义Amis组件示例

本示例演示如何把开发好的React自定义组件集成到华炎魔方amis设计器中供使用。

## 配置资产包地址

把自定义资产包地址配置到环境变量STEEDOS_PUBLIC_PAGE_ASSETURLS中即可，示例中已经默认配置为可以直接使用的示例资产包地址了。

```bash
STEEDOS_PUBLIC_PAGE_ASSETURLS=https://unpkg.com/@steedos-widgets/example@0.0.4/dist/assets.json
```

资产包的地址只要可以访问即可，它可以是发布到npm的包(unpkg.com)地址，也可以是其他任何可以被当前服务访问的地址，比如在远程开发环境中公开的资产包地址。


## Getting Started

### Start mongodb & redis service

```bash
docker-compose up -d
```

### Set Root URL

如果是在 [远程开发环境](https://www.steedos.com/docs/deploy/getting-started#%E8%BF%9C%E7%A8%8B%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83) 中运行该示例项目，请在 `.env.local` 文件中配置ROOT_URL地址为当前访问地址，否则访问amis页面可能出现跨域问题。

```
ROOT_URL=https://5000-steedos-steedosexamples-k14zqmxpayd.ws-us63.gitpod.io
```

把地址配置为远程开发环境的地址加上 `5000-` 前缀即可。

### Start steedos service

```bash
yarn
yarn start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## 示例效果

运行该示例项目后注册账户并登录，即可在“协同办公”应用的首页看到一个 `Hello World` 自定义组件的渲染效果。

可以在设置应用的"用户界面->微页面"找到名为“自定义组件”的微页面，进入微页面详细页面点击右上角的“自定义”按钮后再点击“设计器”按钮即可在设计器中看到一个名为“哈喽”的自定义组件集成到设计器中了。

## 资产包开发

上述配置的资产包是在独立项目中单独开发后发布到npm仓库中的，其源码在 https://github.com/steedos/steedos-widgets/tree/master/packages/example 。

资产包中引用了开发好的自定义组件发布到npm仓库后的地址，即以下示例中的 `packages.urls`。

```json
{
    "packages": [
        {
            "package": "@steedos-widgets/example",
            "urls": [
                "https://unpkg.com/@steedos-widgets/example@0.0.6/dist/builder-example.umd.min.js",
                "https://unpkg.com/@steedos-widgets/example@0.0.6/dist/builder-example.umd.css"
            ],
            "library": "BuilderExample"
        }
    ],
    "components": [
        {
            "exportName": "BuilderExampleWidgetsMeta",
            "npm": {
                "package": "@steedos-widgets/example"
            },
            "url": "https://unpkg.com/@steedos-widgets/example@0.0.6/dist/meta.js",
            "urls": {
                "default": "https://unpkg.com/@steedos-widgets/example@0.0.6/dist/meta.js",
                "design": "https://unpkg.com/@steedos-widgets/example@0.0.6/dist/meta.js"
            }
        }
    ]
}
```

在资产包开发过程中，可以通过 `http-server` 把资产包公开为可访问的静态地址，然后在魔方项目中把环境变量 `STEEDOS_PUBLIC_PAGE_ASSETURLS` 配置为可访问的开发中的资产包地址，这样就可以在测试通过后再把资产包发布到npm仓库中。

```bash
STEEDOS_PUBLIC_PAGE_ASSETURLS=https://8080-steedos-steedoswidgets-afuc7kqudss.ws-us63.gitpod.io/example/dist/assets-dev.json
```

## Learn More

To learn more about Steedos Platform, take a look at the following resources:

- [Steedos Documentation](https://www.steedos.com/docs) - learn about Steedos features and API.

You can check out [the Steedos GitHub repository](https://github.com/steedos/steedos-platform/) - your feedback and contributions are welcome!

## Deploy your project

The easiest way to deploy your Steedos app is to use the [Docker Template](https://github.com/steedos/docker).

Check out our [Steedos deployment documentation](https://www.steedos.com/docs/deploy/getting-started) for more details.
