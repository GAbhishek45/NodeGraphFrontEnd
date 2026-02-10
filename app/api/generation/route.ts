import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

// Point this to your Express Backend URL
// Example: http://localhost:5000/api/generation/single
// const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}generate/single`; 
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");  

export async function POST(req: Request) {
  try {
    // 1. GET COOKIE FROM NEXT.JS REQUEST
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt"); // Look for the 'jwt' cookie

    console.log("Cookies",cookieStore)
    if (!jwtToken) {
      return NextResponse.json({ error: "Unauthorized: No cookie found" }, { status: 401 });
    }

    // 2. Parse File
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", imageFile);

    console.log("🚀 Forwarding request with Cookie...");

    // 3. Call Express Backend AND ATTACH THE COOKIE
    const response = await axios.post(BACKEND_URL, backendFormData, {
      headers: {
        "Content-Type": "multipart/form-data", 
        // ✅ MANUALLY SET THE COOKIE HEADER
        "Cookie": `jwt=${jwtToken.value}`, 
      },
      responseType: "arraybuffer", 
      validateStatus: (status) => status < 500, 
    });

    // ... (Rest of your error handling and success code is the same)
    
    // 4. Success
    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="NodeGraph-Project.zip"',
      },
    });

  } catch (error: any) {
    console.error("❌ Proxy Error:", error.message);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}