import * as React from "react"
import { SVGProps } from "react"

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={9}
        height={9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect width={9} height={9} rx={0.409} fill={props?.fill} />
        <rect
            x={1.636}
            y={1.636}
            width={3}
            height={1.25}
            rx={0.205}
            fill="#fff"
        />
        <rect
            x={1.636}
            y={4.091}
            width={4.5}
            height={1.25}
            rx={0.205}
            fill="#fff"
        />
        <rect
            x={1.636}
            y={6.545}
            width={6}
            height={1.25}
            rx={0.205}
            fill="#fff"
        />
    </svg>
)

export default SvgCopy
