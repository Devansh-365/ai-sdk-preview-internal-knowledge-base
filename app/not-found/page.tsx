export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          404
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Store not found
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          The subdomain you're trying to access doesn't exist or isn't configured.
        </p>
      </div>
    </div>
  );
}
