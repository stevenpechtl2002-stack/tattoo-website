import { useEffect, useRef } from 'react'

export default function InkCursor() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const dotRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lerp follower dot
      dotRef.current.x += (mouseRef.current.x - dotRef.current.x) * 0.12
      dotRef.current.y += (mouseRef.current.y - dotRef.current.y) * 0.12

      // Push to trail
      trailRef.current.push({ ...dotRef.current, life: 1.0, r: 6 })
      if (trailRef.current.length > 28) trailRef.current.shift()

      // Draw trail
      trailRef.current.forEach((point, i) => {
        point.life *= 0.92
        point.r *= 0.97
        const alpha = point.life * 0.7
        const radius = Math.max(point.r, 0.5)

        // Ink blob
        const grad = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius * 2
        )
        grad.addColorStop(0, `rgba(201, 168, 76, ${alpha})`)
        grad.addColorStop(0.5, `rgba(26, 26, 46, ${alpha * 0.6})`)
        grad.addColorStop(1, `rgba(8, 8, 8, 0)`)

        ctx.beginPath()
        ctx.arc(point.x, point.y, radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // Main cursor dot
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#c9a84c'
      ctx.fill()

      // Outer ring
      ctx.beginPath()
      ctx.arc(dotRef.current.x, dotRef.current.y, 16, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.5)'
      ctx.lineWidth = 1
      ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
