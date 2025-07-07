import { getAllStores } from "@/app/db";

export async function GET() {
  const stores = await getAllStores();
  return Response.json(stores);
}
