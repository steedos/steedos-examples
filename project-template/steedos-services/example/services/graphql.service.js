module.exports = {
  name: "example-graphql",

  actions: {
    hello: {
      // 使用微服务方式定义 API 接口。
      // 访问地址： GET /service/api/example-graphql/hello/:name
      rest: { method: 'GET', path: '/hello/:name' },
      handler(ctx) {
        return {
          data: 'Welcome ' + ctx.params.name
        }
      }
    },
    me: {
      rest: { method: 'GET', path: '/me' },
      // 在微服务中获取当前登录的用户信息
      async handler(ctx) {
        return ctx.meta.user
      }
    },
    graphqlQuerySpaceUsers: {
      rest: { method: 'GET', path: '/graphql' },
      // 在微服务中查询数据库
      async handler(ctx) {
        return await this.broker.call('api.graphql', {
          query: `
            query {
              space_users {
                name
                organization__expand {
                  name
                }
              }
            }
          `},
          // 如果查询 GraphQL 需要带上当前用户的权限，需要传入 user 属性。
          {
            user: ctx.meta.user
          }
        )
      },
    },
  }
}