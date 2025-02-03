import { useState, useEffect } from "react"

export function useIntersectionObserver(
  elementIds: string[],
  options: IntersectionObserverInit = { threshold: [0, 0.25, 0.5, 0.75, 1] },
) {
  const [visibleSections, setVisibleSections] = useState<{ id: string; ratio: number }[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => ({ id: entry.target.id, ratio: entry.intersectionRatio }))
      setVisibleSections(visible)
    }, options)

    const elements = elementIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [elementIds, options])

  return visibleSections
}

