export async function GET(request: any, params: any) {
    console.log(request, params)
    return Response.json({ test: 'lol' });
}