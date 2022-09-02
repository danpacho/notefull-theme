import * as React from "react"
import { SVGProps } from "react"

const SvgBookmark = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0 1.248A.5.5 0 0 1 .862.903l3.776 3.956a.5.5 0 0 0 .724 0L9.138.903a.5.5 0 0 1 .862.345V9.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V1.248Z"
            fill={props?.fill}
        />
    </svg>
)

export default SvgBookmark
