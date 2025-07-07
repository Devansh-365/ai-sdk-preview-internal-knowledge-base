import { Chat } from "@/components/chat";
import { generateId } from "ai";

export default function StorePage({ params }: { params: { storeId: string } }) {
  const chatId = generateId();

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
