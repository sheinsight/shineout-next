# 技术选择

# 包管理
使用pnpm 进行多包管理
- 安装所有依赖
pnpm install

- 安装某个包的依赖
pnpm -F @demo/utils add lodash

- A 包 使用 B包
pnpm -F @demo/components add @demo/utils@*

# 代码规范
eslint
typescript

# 文档和打包
umi
father


