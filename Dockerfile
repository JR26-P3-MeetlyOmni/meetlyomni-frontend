# 多阶段构建Dockerfile for Jenkins CI/CD
# 阶段1: 依赖安装和构建
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# Disable Husky for CI builds
ENV HUSKY=0

# 安装所有依赖（包括devDependencies，因为构建时需要）
RUN npm ci --ignore-scripts

# Build-time env for Next.js
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 阶段2: 生产环境运行
FROM node:18-alpine AS runner

# 设置工作目录
WORKDIR /app

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物（standalone模式）
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 设置正确的权限
RUN chown -R nextjs:nodejs /app

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# 启动应用
CMD ["node", "server.js"]


