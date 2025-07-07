import { NextRequest, NextResponse } from "next/server";

const BASE_DOMAIN = "localhost:3000";

let validStoresCache: string[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

async function getValidStores(request: NextRequest): Promise<string[]> {
  const now = Date.now();
  if (validStoresCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return validStoresCache;
  }
  try {
    const protocol = request.nextUrl.protocol;
    const apiUrl = `${protocol}//${BASE_DOMAIN}/api/stores`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch stores: ${response.status}`);
    }
    const stores = await response.json();
    const transformedSlugs = stores.map((store: any) => {
      let slug = store.slug;
      if (slug.includes('.myshopify.com')) {
        const match = slug.match(/https?:\/\/([^.]+)\.myshopify\.com/);
        if (match) {
          slug = match[1];
        }
      }
      return slug;
    });
    validStoresCache = transformedSlugs;
    cacheTimestamp = now;
    return transformedSlugs;
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get("host") || "";

  const hostParts = host.split(".");
  let subdomain = "";

  if (host.includes("localhost")) {
    if (hostParts.length >= 2 && hostParts[0] !== "localhost") {
      subdomain = hostParts[0];
    }
  } else {
    if (hostParts.length > 2) {
      subdomain = hostParts[0];
    }
  }

  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  if (url.pathname.includes("/not-found")) {
    return NextResponse.next();
  }

  const isValid = await isValidSlug(subdomain, request);
  if (!isValid) {
    return NextResponse.redirect(new URL(`http://${BASE_DOMAIN}/not-found`, request.url));
  }

  const rewriteUrl = new URL(`/stores/${subdomain}${url.pathname}${url.search}`, request.url);
  console.log("Rewriting to:", rewriteUrl.pathname);

  return NextResponse.rewrite(rewriteUrl);
}

async function isValidSlug(slug: string | undefined, request: NextRequest): Promise<boolean> {
  if (!slug) return false;

  const validStores = await getValidStores(request);
  console.log("Valid stores:", validStores);
  return validStores.includes(slug);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
