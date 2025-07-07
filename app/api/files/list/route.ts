// Authentication disabled - commenting out auth import and checks
//
import { list } from "@vercel/blob";

export async function GET() {
  // let session = await auth();

  // if (!session) {
  //   return Response.redirect("/login");
  // }

  // const { user } = session;

  // if (!user) {
  //   return Response.redirect("/login");
  // }

  // Authentication disabled - returning all blobs without user filtering
  const { blobs } = await list();

  return Response.json(
    blobs.map((blob) => ({
      ...blob,
      pathname: blob.pathname,
    })),
  );
}
