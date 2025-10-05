import { errorMap } from "@/constants";
import FormInput from "@/components/FormInput";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  const next = searchParams?.next ?? "/movies";

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
        <FormInput type="username" />
        <FormInput type="password" />
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
