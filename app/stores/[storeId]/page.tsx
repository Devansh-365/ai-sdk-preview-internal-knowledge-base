import { Chat } from "@/components/chat";
import { Onboarding } from "@/components/onboarding";
import { generateId } from "ai";
import { getStoreBySlug } from "@/app/db";
import { notFound } from "next/navigation";

export default async function StorePage({ params }: { params: { storeId: string } }) {
  const chatId = generateId();
  const store = await getStoreBySlug(`https://${params.storeId}.myshopify.com`);
  if (!store) {
    notFound();
  }
  if (!store.isOnboarded) {
    return <Onboarding storeId={params.storeId} />;
  }

  return (
    <div className="h-screen">
      <div className="h-[calc(100vh-80px)]">
        <Chat
          id={chatId}
          initialMessages={[]}
          session={null}
        />
      </div>
    </div>
  );
}
