// Authentication disabled - commenting out auth import and checks
//
import { getChatsByUser } from "@/app/db";

export async function GET() {
  // let session = await auth();

  // if (!session || !session.user) {
  //   return Response.json("Unauthorized!", { status: 401 });
  // }

  // Authentication disabled - returning empty array since we don't have user context
  // const chats = await getChatsByUser({ email: session.user.email! });
  return Response.json([]);
}
