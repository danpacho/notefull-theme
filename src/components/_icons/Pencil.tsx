import * as React from "react"
import { SVGProps } from "react"

const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={10}
        height={9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2.182 8.839h-.914a.5.5 0 0 1-.5-.5V5.51a.5.5 0 0 1 .146-.353l1.622-1.621 1.767-1.768a.5.5 0 0 1 .707 0L8.192 4.95 5.187.884l.53-.53a.5.5 0 0 1 .708 0l2.828 2.828a.5.5 0 0 1 0 .707l-.177.177a.5.5 0 0 1-.707 0L5.187.884 8.192 4.95 6.072 7.07 4.45 8.692a.5.5 0 0 1-.354.147H2.182Z"
            fill={props?.fill}
        />
    </svg>
)

export default SvgPencil
