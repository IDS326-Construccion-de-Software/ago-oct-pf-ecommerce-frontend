import React from "react"

export function Separator({ className }) {
  return (
    <hr
      className={`my-3 border-t border-gray-200 ${className || ""}`}
    />
  )
}
