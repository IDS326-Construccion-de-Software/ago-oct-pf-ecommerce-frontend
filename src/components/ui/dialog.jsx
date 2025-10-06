import React from "react"

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className }) {
  return <div className={`p-4 ${className || ""}`}>{children}</div>
}

export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold mb-2">{children}</h2>
}
