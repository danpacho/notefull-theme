# Lib 📦

## remark

-   Markdown preprocessing utility function using `unified` package
-   Running on build time means serverside excute, not clientside

-   `findMarkdownElement`
    1. find `md` element in `md` string
    2. return `md AST` object
-   `remarkImageSizeByAlt`
    1. local image size extraction
    2. store image size in **alt, `(alt:width:height)`**, use it in `Image` component.
-   `getTableOfContents`
    1. extract `h1` and `h2`
    2. return processed `toc` object
