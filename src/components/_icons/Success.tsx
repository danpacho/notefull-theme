import * as React from "react"
import { SVGProps } from "react"

const SvgSuccess = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={9}
        height={9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect width={9} height={9} rx={0.41} fill={props?.fill} />
        <path
            d="m2 4.5 1 1 1 1L7 2"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="square"
        />
    </svg>
)

export default SvgSuccess
