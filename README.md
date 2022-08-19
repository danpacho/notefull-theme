<div align="center">

# Bloapi

> **Api starter battery🔋 for _`nextjs`_ blog**

</div>

-   [The Problem](#the-problem)
-   [Play Practical](#play-practical)
-   [Who should use it?](#who-should-use-it-)
-   [Kind of data](#kind-of-data)
-   [What's included](#what-s-included)
    -   [1. Essential 📦](#1-essential)
    -   [2. More 🔥](#2-more)
-   [Get started](#get-started)

# The Problem

1. To start `nextjs` blog, making own cms api is essential, but that's pretty **annoying process**.
2. Blog templates can solve this problem, but templates often contain too much **unnecessary stuff**.

# Play Practical

Let's start with just what we need.

> `Api💬` & `Essential feature📦`

# Who should use it?

wants to

-   💯 Focus only on making UI
-   💯 Choose tech stack oneself
-   💯 Minimal, Customizable, Solid base
-   💯 Start with minimal boilerplate

# Kind of data

Let's look at the `data` we receive on each page by `core` api

1. **main: `pages/index.tsx`**

> 🟢 Link to: https://{deploy-url}/

```ts
interface MainPageProps {
    latestPost: MetaType[]
    // ✅ main-page latest post
    // ⚪️ types/post/meta.ts
    mainCategory: CategoryInfoType[]
    // ✅ main-page displaying category
    // ⚪️ types/category/index.ts
}
```

2. **category: `pages/category.tsx`**

> 🟢 Link to: https://{deploy-url}/category

```ts
interface AllCategoryPageProps {
    allCategoryInfo: CategoryInfoType[]
    // ✅ all category of blog
    // ⚪️ types/category/index.ts
}
```

3. **profile: `pages/profile.tsx`**

> 🟢 Link to: https://{deploy-url}/profile

```ts
interface ProfilePageProps {
    profileSource: string
    // ✅ extracted source of {blog-dir}/profile/description.mdx
}
```

4. **{category}: `pages/[category].tsx`**

> 🟢 Link to: https://{deploy-url}/{category}

```ts
interface CategoryPageProps extends CategoryInfoType {
    // ✅ specific category info
    // ⚪️ types/category/index.ts
    latestPost: MetaType[]
    // ✅ latest-post of specific category
    // ⚪️ types/post/meta.ts
    allSeries: SeriesType[]
    // ✅ series of specific category
    // ⚪️ types/post/series.ts
}
```

5. **{category}/{page}: `pages/[category]/[page]/index.tsx`**

> 🟢 Link to: https://{deploy-url}/{category}/{page}/

```ts
interface PaginatedCategoryPageProps extends CategoryInfoType {
    allPost: MetaType[]
    // ✅ paginated-post of specific category
    // ⚪️ types/post/meta.ts
    page: number
    // ✅ current page number
    isLastPage: boolean
}
```

6. **{category}/{page}/{postTitle}: `pages/[category]/[page]/[postTitle].tsx`**

> 🟢 Link to: https://{deploy-url}/{category}/{page}/{postTitle}

```ts
interface PostPageProps extends PostWithControllerType {
    // ✅ specific post + controller [prev, next post]
    // ⚪️ types/post/index.ts
    seriesInfo: SeriesType | null
    // ✅ specific post's seriesInfo. nullable
    // ⚪️ types/post/series.ts
}
```

# What's included

## 1. Essential 📦

1. **mdx** full support with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
2. **[cli posting](https://github.com/danpacho/blog-post-generator)** support
3. **rich post [meta](https://github.com/jonschlinkert/gray-matter)** support

```yaml
---
# ✅ REQUIRED ✅
title: post title
preview: post preview
author: post author
update: YYYY/MM/DD format
color: HEX or rgba, use it for styling
tags: tag1, tag2

# ❎ OPTIONAL ❎
series: seriesTitle-1
bannerUrl: /category/post
reference: ref1, ref2
postpone: false
---
```

5. **`seo` optimized** with [next-seo](https://github.com/garmeeh/next-seo)
6. **`rss`/`sitemap` generation** in `scripts`
7. familiar url structure

## 2. More 🔥

1. intuitive post grouping with **`category`**, **`series`**
2. **First Load Js ⚡️ `44kb` ⚡️**, **preact** on production build
3. **`toc` object** generation on server-side
4. **image optimized**
5. static image **automatic sized**
6. **google-analytic** full support with [party-town](https://github.com/BuilderIO/partytown#readme)
7. **code highlight** with [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus#readme)
8. **math expression** _optional_ support with `katex`
9. kind error message
10. kind tsdoc, read doc with `cmd` + `mouse shover` in vscode

# Get started

1. github `Use This Template`
2. `git clone`
3. github `fork`
