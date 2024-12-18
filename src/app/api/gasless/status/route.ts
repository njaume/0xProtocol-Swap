import { type NextRequest } from "next/server";
// import qs from "qs";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tradeHash = searchParams.get("tradeHash");
        const res = await fetch(
            `https://api.0x.org/tx-relay/v1/swap/status/${tradeHash}`,
            {
                headers: {
                    "0x-api-key": process.env
                        .NEXT_PUBLIC_ZEROEX_API_KEY as string,
                    "0x-chain-id": searchParams.get("chainId") as string,
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
