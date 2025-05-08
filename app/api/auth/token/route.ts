import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { firebaseToken } = await request.json()

    if (!firebaseToken) {
      return NextResponse.json({ error: "Firebase token is required" }, { status: 400 })
    }

    // In a real application, you would verify the Firebase token here
    // using the Firebase Admin SDK

    // Create a JWT token
    const token = sign(
      {
        // Add any claims you want in the token
        sub: "user_id_from_firebase", // You would extract this from the verified Firebase token
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      },
      process.env.JWT_SECRET || "fallback_secret",
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Token generation error:", error)
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
