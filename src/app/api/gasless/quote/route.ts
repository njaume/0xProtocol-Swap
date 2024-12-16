import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const res = await fetch(
            `http://api.0x.org/gasless/quote?${searchParams}`,
            {
                headers: {
                    "0x-api-key": process.env
                        .NEXT_PUBLIC_ZEROEX_API_KEY as string,
                    "0x-version": "v2",
                },
            }
        );
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
