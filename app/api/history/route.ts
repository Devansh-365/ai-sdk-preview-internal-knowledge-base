// Authentication disabled - commenting out auth import and checks
//
import { getChatsByStore, getChatsByUser } from "@/app/db";

export async function GET() {
  const chats = await getChatsByStore({ storeSlug: "" });
  return Response.json(chats);
}
