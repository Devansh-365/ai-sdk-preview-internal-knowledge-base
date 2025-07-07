// Authentication disabled - commenting out auth import and checks
//
import { getChatsByUser } from "@/app/db";

export async function GET() {
  // let session = await auth();

  // if (!session || !session.user) {
  //   return Response.json("Unauthorized!", { status: 401 });
  // }

  const chats = await getChatsByUser({ email: "anonymous@example.com" });
  return Response.json(chats);
}
