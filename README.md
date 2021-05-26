# 从零到一 高仿知乎专栏

## 前言

### 一个复杂的 SPA 项目都要包括哪些知识点？

- 第一，要有数据的展示，这个是所有网站共有的特性，而且最好是有多级复杂数据的展示

- 第二，要有数据的创建，这就是表单的作用，有展示自然要有创建。在创建中，我们会发散很多问题，比如数据的验证怎样做，文件的上传如何处理，创建和编辑怎样共享单个页面等等。

- 第三，要有组件的抽象，vue 是组件的世界，组件是最重要的一环，编写组件是最基本的能力，对于一些常用的功能，我们需要高可用性和可定制性的组件，也就是说我们在整个项目中一般不会用到第三方组件，比如 element，都是从零开始，而且会循序渐进，不断抽象。甚至行成自己的一套小组件库。

- 第四，整体状态数据结构的设计和实现，SPA 一般使用状态工具管理整理状态，并且给多个路由使用，在 vue 中，我们使用 vuex，一个项目的整体数据结构的复杂程度就代表了这个能力的高低，最好是要有多层次的数据结构，相互依赖的关系，还要将数据的获取，结构设计，缓存进行一系列的考量。

- 第五，权限管理和控制，一个项目需要有用户权限的实现，不仅仅是后端，前端作为一个整体的 SPA 的项目，权限控制也尤为重要，我们需要有权限的获取，权限的持久化，权限的更新，那个路由可访问，哪个需要权限才可以访问。发送异步请求的全局 token 注入，全局拦截，全局信息提示等等和权限相关的内容。

- 第六，真实的后端API，和后端的交互是整个项目的最重要一环。一些同学在开发项目的时候会使用 mock server，但是由于后端的数据结构常常和最初的文档设计背道而驰，造成最后项目需要再次回炉修改。

## 项目部分页面预览

![页面预览](https://github.com/liuyunhe/zheye-app/blob/master/src/assets/5.png)

## 使用 Typescript + Vue3 开发

- Vue3 + Typescript：Vue3 配合 Typescript ，使用新版Vuex 和 Vue-Router 全家桶完成前后端分离复杂项目
- 组件库为脉络：实现一系列由易到难的通用组件开发，可谓学会一个基本的组件库的开发。
- 提供真实后端API：告别 mock 数据，并提供swagger 在线调试查询。

### 项目演示与服务

- Github：[传送门](https://github.com/liuyunhe/zheye-app)
- 项目演示站点：[传送门](http://zhihu.vikingship.xyz/)
- 在线后端API 查询和使用站点：[传送门](http://api.vikingship.xyz/)
- 项目在线文档：[传送门](http://docs.vikingship.xyz/)
- 完成的组件库展示：[传送门](http://showcase.vikingship.xyz/)
- 页面所有原型图地址：[传送门](https://whimsical.com/Djb2TcWsLTPeapFdM3NaX)

### 技术要点

#### Typescript

- 简单类型
- 复杂类型
- 接口-Interface
- 类 - Class
- 泛型 - Generics
- 声明文件

#### Vue3

- Ref 和 Reactive
- watch 和 computed
- 生命周期
- 自定义函数 Hooks
- Teleport 和 Suspense
- 全局 API 修改
- 复杂组件设计和实现

#### Vue-Router

- 动态路由匹配
- 导航守卫
- 路由元信息

#### Vuex

- State
- Getter
- Mutation
- Action
- 中大型Store 结构设计与实现

#### 前后端结合

- Axios 基础和用法
- swagger 在线调试异步请求
- JSON web token 实现权限验证
- axios 拦截器实现全局处理
- 前端缓存设计与实现
- 文件上传原理和组件实现

### 项目结构

![项目结构](https://github.com/liuyunhe/zheye-app/blob/master/src/assets/1.png)

### 路由结构

路由使用了vue-router，对应添加了路由守卫，结构如下图所示

![路由结构](https://github.com/liuyunhe/zheye-app/blob/master/src/assets/2.png)

### 文章数据结构

![文章数据结构](https://github.com/liuyunhe/zheye-app/blob/master/src/assets/3.png)

文章数据结构是这个应用的核心，涉及到几乎所有功能

```ts
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string
}
export interface ColumnProps {
  _id: string;          //  专栏识别标识
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;         //  文章识别标识
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | Userprops;
  isHTML?: boolean;
}
```

### 组件一览

应用中用到的各种组件，上文已附带组件库文档

![组件一览](https://github.com/liuyunhe/zheye-app/blob/master/src/assets/4.png)

### 项目启动

```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
