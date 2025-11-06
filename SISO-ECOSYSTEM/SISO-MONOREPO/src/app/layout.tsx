import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SISO Platform",
  description: "Unified platform for client-base and partnerships",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
