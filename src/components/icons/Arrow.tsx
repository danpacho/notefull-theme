import * as React from "react"
import { SVGProps } from "react"

const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={8}
        height={8}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.25 3.567a.5.5 0 0 1 0 .866l-6 3.464a.5.5 0 0 1-.75-.433V.536a.5.5 0 0 1 .75-.433l6 3.464Z"
            fill={props?.fill}
        />
    </svg>
)

export default SvgArrow
