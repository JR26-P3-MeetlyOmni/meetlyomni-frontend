# 📁 项目结构说明（Next.js + App Router + 模块化 + i18n + SSR-ready）

public/
├── favicon.ico
├── logo.png
├── robots.txt
└── images/
    └── hero.jpg
src/
├── app/
│   ├── layout.tsx                          # 全局 HTML 模板结构
│   ├── page.tsx                            # 默认空白页或重定向
│   ├── api/                                # App Router API 路由（不需 locale）
│   │   ├── auth/
│   │   │   ├── login/route.ts              # 登录 API
│   │   │   └── signup/route.ts             # 注册 API
│   │   └── contact/route.ts                # Contact 表单提交接口
│   ├── [locale]/                           # 国际化 URL segment (如 /en, /zh)
│   │   ├── layout.tsx                      # 注入 next-intl provider 的入口布局
│   │   ├── (main)/                         # Group Route: 营销类页面 (landing page)
│   │   │   ├── layout.tsx                  # 含 Footer 的布局
│   │   │   ├── page.tsx                    # Landing 主页面
│   │   │   └── components/                 # 营销页面组件
│   │   │       ├── HeroSection/
│   │   │       ├── FeatureList/
│   │   │       ├── Testimonials/
│   │   │       ├── FaqSection/
│   │   │       └── Footer/
│   │   ├── contact-us/
│   │   │   └── components/                 # 联系我们面组件
│   │   │   └── page.tsx                    # 联系我们页面

│   │   ├── user_profile/
│   │   │   └── page.tsx                    # contactus页面
│   │   │   └── components/                 # contactus组件
│   │   │       ├── ContactUsForm.tsx
│   │   ├── (auth)/                         # 用户认证页面
│   │   │   ├── login/page.tsx              # 登录页
│   │   │   └── signup/page.tsx             # 注册页
├── components/                             # Global/shared UI components (used anywhere)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.style.ts
│   │   ├── Button.types.ts
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.style.ts
│   │   ├── Input.types.ts
│   │   ├── Input.test.tsx
│   │   ├── Input.stories.tsx
│   │   └── index.ts
│   └── ... (other shared UI)
├── features/
│   └── auth/
│       ├── components/                     # Feature-specific components (used only by auth)
│       │   ├── LoginForm/
│       │   │   ├── LoginForm.tsx
│       │   │   ├── LoginForm.style.ts
│       │   │   ├── LoginForm.types.ts
│       │   │   ├── LoginForm.test.tsx
│       │   │   ├── LoginForm.stories.tsx
│       │   │   └── index.ts
│       │   ├── SignupForm/
│       │   │   ├── SignupForm.tsx
│       │   │   ├── SignupForm.style.ts
│       │   │   ├── SignupForm.types.ts
│       │   │   ├── SignupForm.test.tsx
│       │   │   ├── SignupForm.stories.tsx
│       │   │   └── index.ts
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── redux/
│       │   ├── authSlice.ts
│       │   ├── authSelectors.ts
│       │   └── authThunks.ts
│       ├── types.ts
│       ├── api.ts
│       └── utils.ts
├── messages/                               # next-intl 国际化 JSON 语言文件
│   ├── en.json
│   ├── zh.json
│   └── ...
├── store/                                  # 全局状态管理（Redux/Zustand）
│   ├── index.ts
│   └── slices/
├── stories/                                # Storybook 组件测试文件
│   ├── Button.stories.tsx
│   └── ...
└── types/                                  # 全局类型定义
    ├── global.d.ts
    └── next.d.ts
