export async function GET() {
    return new Response(
      JSON.stringify({ status: "OK", message: "API is healthy 🚀" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  