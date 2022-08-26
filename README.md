<div align="center">

# Bloapi 🐧

> **API battery kit for _`nextjs`_ blog**

</div>

- [Bloapi 🐧](#bloapi-)
- [The Problem](#the-problem)
- [Let's Play Practical](#lets-play-practical)
- [Perfect Fit for](#perfect-fit-for)
- [Kind of meta](#kind-of-meta)
  - [required](#required)
  - [optional](#optional)
- [Kind of data](#kind-of-data)
- [Features](#features)
  - [Essential 📦](#essential-)
  - [More 🚀](#more-)
- [Get started](#get-started)
- [LICENSE](#license)

# The Problem

1. To start `nextjs` blog, making own cms api is essential. But that's pretty **annoying process**.
2. Blog templates can solve this problem, but templates often contain too much **unnecessary stuff**.

# Let's Play Practical

start with just what we need.

> **`Api 🚀`** + **`Essential feature 📦`**

# Perfect Fit for

-   Focus only on making UI
-   Choose tech stack oneself
-   Minimal, Customizable, Solid blog

# Kind of meta

> 🚀 **`bloapi`** supports rich post meta option

## required

```yaml
---
title: post title
preview: post preview
author: post author
update: 2022/08/15 # < YYYY/MM/DD >
color: "#A68A68" # < "{ HEX | rgba | rgb }" >
tags: tag1, tag2 # split by comma
---
```

## optional

```yaml
---
series: javascript-1 # < {seriesTitle}-{order} >
bannerUrl: /category/post # nextjs static image location
reference: ref1, ref2 # split by comma
postpone: true # if true, post will not published
---
```

# Kind of data

Let's look at the `data` we receive on **each page** by `core` api

1. **main: `pages/index.tsx`**

> **Link to** 🔭: https://{deploy-url}/

```ts
interface MainPageProps {
    latestPost: MetaType[]
    // ✅ main-page latest post
    // 💡 types/post/meta.ts

    mainCategory: CategoryInfoType[]
    // ✅ main-page displaying category
    // 💡 types/category/index.ts
}
```

2. **category: `pages/category.tsx`**

> **Link to** 🔭: https://{deploy-url}/category

```ts
interface AllCategoryPageProps {
    allCategoryInfo: CategoryInfoType[]
    // ✅ all category of blog
    // 💡 types/category/index.ts
}
```

3. **profile: `pages/profile.tsx`**

> **Link to** 🔭: https://{deploy-url}/profile

```ts
interface ProfilePageProps {
    profileSource: string
    // ✅ extracted source of {blog-dir}/profile/description.mdx
}
```

4. **{category}: `pages/[category].tsx`**

> **Link to** 🔭: https://{deploy-url}/{category}

```ts
interface CategoryPageProps extends CategoryInfoType {
    // ✅ specific category info
    // 💡 types/category/index.ts

    latestPost: MetaType[]
    // ✅ latest-post of specific category
    // 💡 types/post/meta.ts

    latestTag: string[]
    // ✅ latest-post-tag of specific category

    allSeries: SeriesType[]
    // ✅ series of specific category
    // 💡 types/post/series.ts
}
```

5. **{category}/{page}: `pages/[category]/[page]/index.tsx`**

> **Link to** 🔭: https://{deploy-url}/{category}/{page}/

```ts
interface PaginatedCategoryPageProps extends CategoryInfoType {
    allPost: MetaType[]
    // ✅ paginated-post of specific category
    // 💡 types/post/meta.ts

    allTag: string[]
    // ✅ paginated-post-tag of specific category

    page: number
    // ✅ current page number

    isLastPage: boolean
}
```

6. **{category}/{page}/{postTitle}: `pages/[category]/[page]/[postTitle].tsx`**

> **Link to** 🔭: https://{deploy-url}/{category}/{page}/{postTitle}

```ts
interface PostPageProps extends PostWithControllerType {
    // ✅ specific post + controller [prev, next post]
    // 💡 types/post/index.ts

    seriesInfo: SeriesType | null
    // ✅ specific post's seriesInfo. nullable
    // 💡 types/post/series.ts
}
```

# Features

## Essential 📦

1. **MDX** full support with **[mdx-bundler](https://github.com/kentcdodds/mdx-bundler)**
2. **[CLI posting](https://github.com/danpacho/blog-post-generator)** support
3. **`SEO` optimized** with [next-seo](https://github.com/garmeeh/next-seo)
4. **`RSS`/`SITEMAP` generation** in `scripts`

## More 🚀

1. **First Load Js ⚡️ `44.5kb` ⚡️**, **preact** on production build
2. **`Toc` object** generation on server-side
3. **Image optimized** with `next/image` and support **automatic-sizing**
4. **Google-analytics** full support in **[party-town-thread](https://github.com/BuilderIO/partytown#readme)**
5. **Code highlight** with [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus#readme)
6. **Math expression** _optional_ support with `katex`
7. Kind error message
8. Kind `tsdoc`. Read doc with `cmd`+`mouse hover` shortcut in vscode

# Get started

Click `🐧 Use This Template` or `🐧 git clone`

# LICENSE

MIT
