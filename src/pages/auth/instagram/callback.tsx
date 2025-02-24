import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function InstagramCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")

      if (code) {
        try {
          // Exchange the code for an access token
          const response = await fetch("/api/auth/instagram/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          })

          if (!response.ok) {
            throw new Error("Failed to authenticate with Instagram")
          }

          const data = await response.json()
          
          // Store the access token securely
          // You might want to use a state management solution like Redux or Context
          localStorage.setItem("instagram_access_token", data.access_token)
          
          // Redirect to the dashboard or home page
          navigate("/dashboard", { replace: true })
        } catch (error) {
          console.error("Instagram authentication error:", error)
          navigate("/error", { 
            replace: true,
            state: { error: "Failed to connect Instagram account" }
          })
        }
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Connecting Instagram Account</h2>
        <p className="text-gray-600">Please wait while we complete the connection...</p>
      </div>
    </div>
  )
} 