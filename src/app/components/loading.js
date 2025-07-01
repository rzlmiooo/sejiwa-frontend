import { useTransition, useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usePathname } from 'next/navigation'

export default function LoadingIndicator() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    let timer = setTimeout(() => NProgress.start(), 200) // kasih delay
    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname])

  return null
}
