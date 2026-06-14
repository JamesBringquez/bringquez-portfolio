import { createPortal } from "react-dom"
import { motion } from "framer-motion"

export type FlyItem = {
  key: string
  image: string
  name: string
  from: DOMRect
  to: DOMRect
}

type ArkeFlyToBagProps = {
  items: FlyItem[]
  onComplete: (key: string) => void
}

const FLY_SIZE = 56

export default function ArkeFlyToBag({ items, onComplete }: ArkeFlyToBagProps) {
  if (items.length === 0) return null

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {items.map((item) => {
        const startX = item.from.left + item.from.width / 2 - FLY_SIZE / 2
        const startY = item.from.top + item.from.height / 2 - FLY_SIZE / 2
        const endX = item.to.left + item.to.width / 2 - FLY_SIZE / 2
        const endY = item.to.top + item.to.height / 2 - FLY_SIZE / 2
        const deltaX = endX - startX
        const deltaY = endY - startY

        return (
          <motion.div
            key={item.key}
            className="absolute overflow-hidden border-2 border-black bg-white shadow-lg"
            style={{ width: FLY_SIZE, height: FLY_SIZE, left: startX, top: startY }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: [0, deltaX * 0.45, deltaX],
              y: [0, deltaY * 0.45 - 72, deltaY],
              scale: [1, 0.85, 0.35],
              opacity: [1, 1, 0.2],
            }}
            transition={{ duration: 0.65, ease: [0.32, 0.08, 0.24, 1], times: [0, 0.55, 1] }}
            onAnimationComplete={() => onComplete(item.key)}
          >
            <img src={item.image} alt="" className="h-full w-full object-cover object-top" />
          </motion.div>
        )
      })}
    </div>,
    document.body,
  )
}
