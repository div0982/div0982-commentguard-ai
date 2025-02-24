import { Button } from "@/components/ui/button"
import { useState } from "react"

const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID
const REDIRECT_URI = `${window.location.origin}/auth/instagram/callback`

export function InstagramAuth() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleInstagramConnect = () => {
    setIsConnecting(true)
    
    // Facebook OAuth URL for Instagram
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?`
      + `client_id=${INSTAGRAM_CLIENT_ID}`
      + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
      + `&scope=instagram_basic,instagram_manage_comments,email,public_profile`
      + `&response_type=code`
      + `&state=${generateRandomState()}`
    
    // Open Facebook auth in a new window
    window.location.href = authUrl
  }

  // Generate a random state parameter for security
  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleInstagramConnect}
        disabled={isConnecting}
        className="flex items-center gap-2"
      >
        <InstagramIcon className="w-5 h-5" />
        {isConnecting ? "Connecting..." : "Connect Instagram Account"}
      </Button>
    </div>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
} 