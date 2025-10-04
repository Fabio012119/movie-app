export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  const next = searchParams?.next ?? "/movies";
  const errorMap: Record<string, string> = {
    missing: "Please fill username and password.",
    invalid: "Invalid credentials.",
    rate_limit: "Too many attempts. Please try again shortly.",
    network: "Cannot reach the login server.",
    server: "Server error. Please try again.",
    bad_response: "Unexpected response from auth server.",
  };

  return (
    <section className="m-auto max-w-md rounded-xl bg-white p-6 text-black translate-y-1/2">
      <h1 className="mb-4  text-2xl font-bold">Log in</h1>
      {searchParams?.error && (
        <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">
          {errorMap[searchParams.error] ?? "Login failed."}
        </p>
      )}
      <form action="/login/submit" method="post" className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <label className="block">
          <span className="text-sm">Username</span>
          <input
            name="username"
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-black p-2 text-white"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
