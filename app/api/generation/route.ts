import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1. Get Token
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt") || cookieStore.get("token"); // Check both names

    if (!jwtToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Incoming File
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 3. Construct Backend URL
    // Ensure we hit the specific endpoint: /generation/single
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); 
    const targetUrl = `${baseUrl}/generate/single`; 

    console.log(`🚀 Proxying to: ${targetUrl}`);

    // 4. Prepare FormData for Axios
    const backendFormData = new FormData();
    // ⚠️ IMPORTANT: Pass the filename as the 3rd argument, or Multer might ignore it
    backendFormData.append("image", imageFile, imageFile.name);

    // 5. Call Express Backend
    const response = await axios.post(targetUrl, backendFormData, {
      headers: {
        // ⚠️ CRITICAL FIX: Do NOT set 'Content-Type': 'multipart/form-data' manually!
        // Axios/FormData will automatically generate the correct boundary header.
        // We ONLY set the Cookie.
        "Cookie": `jwt=${jwtToken.value}`, 
      },
      responseType: "arraybuffer", // We need binary data for the ZIP
      validateStatus: (status) => status < 500, // Handle 400s manually
    });

    // 6. Handle Backend Errors (e.g., "Insufficient Credits")
    if (response.status !== 200) {
      // Convert the binary error back to JSON to show the user
      const errorText = Buffer.from(response.data).toString('utf-8');
      let errorJson;
      try {
         errorJson = JSON.parse(errorText);
      } catch (e) {
         errorJson = { error: errorText || "Unknown backend error" };
      }
      return NextResponse.json(errorJson, { status: response.status });
    }

    // 7. Success - Return the ZIP
    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="NodeGraph-${Date.now()}.zip"`,
      },
    });

  } catch (error: any) {
    console.error("❌ Proxy Error:", error.message);
    return NextResponse.json(
        { error: error.message || "Proxy generation failed" }, 
        { status: 500 }
    );
  }
}