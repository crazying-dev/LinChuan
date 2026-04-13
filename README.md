# Navifox Pages

本项目是一个基于 pnpm Workspace 的 Monorepo，内含多个子项目。

## 结构

### 技术栈

整个项目的技术栈是：

- TypeScript
- Tailwind CSS 4
- Vue 3，具体是 Vue 3.5
- Vite
- Rolldown

部分子项目所用的技术栈是：

- Vue Router

### 仓库结构

> Visual Studio Code 用户可以通过 `./navifox.code-workspace`
> 来呈现项目结构。当然，建议复制一份来用，以免干扰 git 变更。

- `navifox-pages`，项目本体（仓库整体），俗称“**大仓**”。
  - `apps`，存放负责具体业务的子项目。
    - `docs`，存放文档网站。
    - `refs`，存放一些 CheatSheet 的网站。
    - `www`，Navifox Pages 主页。
  - `packages`，存放可公开的共享子包。
  - `internal`，存放内部共享子包。
    - `constants`，存放全局常量。
    - `styles`，存放全局样式及字体。
    - `tsconfig`，存放共享 `tsconfig` 配置。
    - `types`，存放全局类型定义。
    - `ui`，存放共享UI，包括 shadcn 等组件。
    - `utils`，存放共享工具。
  - `scripts`，存放仓库级别的脚本。

约定所有子项目都只放在 `./apps/`、`./packages/` 或 `./internal/` 目录下。项目本身不大，这样平铺方便查找和日常管理。

### `package.json`

- 所有子项目的 `name` 约定以 `@navifox/<NAME>` 的格式来命名。
- 除了 `./packages/` 之外的所有子项目 `private` 字段值固定为 `true` 。

## 工作流

### 运行、构建、预览

对于负责具体业务的子项目，在仓库根目录执行，这里以 `www` 子项目为例：

```bash
pnpm run dev:www      # 运行子项目
pnpm run build:www    # 构建子项目
pnpm run preview:www  # 预览构建产物
```

其它子项目不能直接运行和预览的方法，也无须执行构建。

### 添加子项目

直接在 `./apps/`、`./packages/` 或 `./internal/`
下创建普通项目，并适当整理依赖即可。依赖安装完成后也是需要在根目录执行
`pnpm run migrate` 来迁移到 `pnpm-workspace.yaml`。

如果是负责具体业务的子项目，还需要在根目录下的 `package.json` 中添加相应的工作流脚本。

### 添加依赖

为大仓添加依赖是在根目录下执行：

```bash
pnpm add -w typescript     # 添加依赖并保存到 `dependencies`
pnpm add -Dw typescript    # 添加依赖并保存到 `devDependencies`
pnpm add -Ow typescript    # 添加依赖并保存到 `optionalDependencies`
pnpm remove -w typescript  # 移除依赖
```

对于子项目，有两种方法添加依赖，下面以 `www` 子项目举例。

一种是先移动到对应的子目录再来执行：

```bash
cd ./apps/www
pnpm add vue-router     # 添加依赖并保存到 `dependencies`
pnpm add -D vue-router  # 添加依赖并保存到 `devDependencies`
pnpm add -O vue-router  # 添加依赖并保存到 `optionalDependencies`
pnpm remove vue-router  # 移除依赖
```

另一种是直接在根目录下执行，但需要指定具体的子项目：

```bash
pnpm add --filter=@navifox/www vue-router     # 添加依赖并保存到 `dependencies`
pnpm add --filter=@navifox/www -D vue-router  # 添加依赖并保存到 `devDependencies`
pnpm add --filter=@navifox/www -O vue-router  # 添加依赖并保存到 `optionalDependencies`
pnpm remove --filter=@navifox/www vue-router  # 移除依赖
```

如果需要同时为多个子项目安装依赖，可以适当修改
`--filter` 的参数，可参见 [pnpm 过滤](https://pnpm.io/zh/filtering)。

### 重新安装依赖

如果要迁移子项目位置，或者依赖出现了难以解决而古怪的错误，可以在根目录下执行
`pnpm run reinstall` 来重新安装大仓以及子项目的所有依赖（包括第三方包和仓库内的子项目）。

### 迁移

只要是涉及到依赖的增删，除非是重新安装，那么不管是子项目的还是仓库整体的，在全部完成后，都需要在根目录执行
`pnpm run migrate` 来迁移到 `pnpm-workspace.yaml`。
