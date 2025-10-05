//Components
import FormInput from "@/components/Inputs/FormInput";

//Constants
import { errorMap } from "@/constants";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  const params = (await searchParams) ?? "/movies";

  const { error, next } = params;

  return (
    <section className="m-auto max-w-md rounded-xl bg-white p-6 text-black translate-y-1/2">
      <h1 className="mb-4  text-2xl font-bold">Log in</h1>
      {error && (
        <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">
          {errorMap[error] ?? "Login failed."}
        </p>
      )}
      <form action="/login/submit" method="post" className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <FormInput type="username" />
        <FormInput type="password" />
        <button
          type="submit"
          className="w-full rounded-md bg-black p-2 text-white cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
