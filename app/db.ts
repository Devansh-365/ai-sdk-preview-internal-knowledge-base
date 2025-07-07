import { drizzle } from "drizzle-orm/postgres-js";
import { desc, eq, inArray } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { chat, chunk, user, store } from "@/schema";
import { generateId } from "ai";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

// User functions (keeping for backward compatibility)
export async function getUser(email: string) {
  return await db.select().from(user).where(eq(user.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(user).values({ email, password: hash });
}

// Store functions
export async function createStore({
  slug,
  storefrontAccessToken,
  adminAccessToken,
}: {
  slug: string;
  storefrontAccessToken?: string;
  adminAccessToken?: string;
}) {
  const id = generateId();
  const now = new Date();

  return await db.insert(store).values({
    id,
    slug,
    storefrontAccessToken,
    adminAccessToken,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getStoreBySlug(slug: string) {
  const [selectedStore] = await db.select().from(store).where(eq(store.slug, slug));
  return selectedStore;
}

export async function getStore(id: string) {
  const [selectedStore] = await db.select().from(store).where(eq(store.id, id));
  return selectedStore;
}

export async function updateStore({
  slug,
  updates,
}: {
  slug: string;
  updates: Partial<{
    storefrontAccessToken: string;
    adminAccessToken: string;
  }>;
}) {
  return await db
    .update(store)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(store.slug, slug));
}

export async function getAllStores() {
  return await db.select().from(store).orderBy(desc(store.createdAt));
}

export async function createMessage({
  id,
  messages,
  storeSlug,
}: {
  id: string;
  messages: any;
  storeSlug: string;
}) {
  // Ensure the store exists, create default if it doesn't
  const existingStore = await getStoreBySlug(storeSlug);
  if (!existingStore) {
    await createStore({
      slug: storeSlug,
    });
  }

  const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

  if (selectedChats.length > 0) {
    return await db
      .update(chat)
      .set({
        messages: JSON.stringify(messages),
      })
      .where(eq(chat.id, id));
  }

  return await db.insert(chat).values({
    id,
    createdAt: new Date(),
    messages: JSON.stringify(messages),
    storeSlug,
  });
}

export async function getChatsByStore({ storeSlug }: { storeSlug: string }) {
  return await db
    .select()
    .from(chat)
    .where(eq(chat.storeSlug, storeSlug))
    .orderBy(desc(chat.createdAt));
}

export async function getChatById({ id }: { id: string }) {
  const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
  return selectedChat;
}

export async function insertChunks({
  chunks,
  storeSlug
}: {
  chunks: any[];
  storeSlug?: string;
}) {
  const chunksWithStore = chunks.map(chunk => ({
    ...chunk,
    storeSlug: storeSlug || null,
  }));

  return await db.insert(chunk).values(chunksWithStore);
}

export async function getChunksByFilePaths({
  filePaths,
  storeSlug,
}: {
  filePaths: Array<string>;
  storeSlug?: string;
}) {
  let query = db.select().from(chunk).where(inArray(chunk.filePath, filePaths));

  if (storeSlug) {
    query = query.where(eq(chunk.storeSlug, storeSlug));
  }

  return await query;
}

export async function deleteChunksByFilePath({
  filePath,
  storeSlug,
}: {
  filePath: string;
  storeSlug?: string;
}) {
  let deleteQuery = db.delete(chunk).where(eq(chunk.filePath, filePath));

  if (storeSlug) {
    deleteQuery = deleteQuery.where(eq(chunk.storeSlug, storeSlug));
  }

  return await deleteQuery;
}

export async function getChunksByStore({ storeSlug }: { storeSlug: string }) {
  return await db
    .select()
    .from(chunk)
    .where(eq(chunk.storeSlug, storeSlug));
}

// Legacy function for backward compatibility
export async function getChatsByUser({ email }: { email: string }) {
  // For backward compatibility, return empty array
  // This can be removed once all references are updated
  return [];
}
