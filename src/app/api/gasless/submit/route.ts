import { type NextRequest } from "next/server";
// import qs from "qs";

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body
        const payload = await request.json();
        const res = await fetch(`https://api.0x.org/gasless/submit`, {
            method: "POST",
            headers: {
                "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY as string,
                "0x-chain-id": payload.chainId,
                "Content-Type": "application/json",
                "0x-version": "v2",
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
            return new Response(JSON.stringify(data), { status: res.status });
        }
        return Response.json(data);
    } catch (error: any) {
        console.log(error);
        return new Response(error.message, { status: 500 });
    }
}
