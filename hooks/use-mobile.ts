import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // 首帧之后再同步初始值，避免在 effect 体内同步 setState 触发级联渲染
    const frame = requestAnimationFrame(onChange)
    return () => {
      mql.removeEventListener("change", onChange)
      cancelAnimationFrame(frame)
    }
  }, [])

  return !!isMobile
}
