//Components
import FormInput from "@/components/Inputs/FormInput";

//Constants
import { errorMap } from "@/constants";

//Types
import type { LoginPageProps } from "@/types/props";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? "/movies";

  const { error, next } = params;

  return (
    <section className=" text-black translate-y-1/2">
      <div
        className="flex justify-center text-white text-5xl mb-5 font-semibold"
        data-testid="login-header"
      >
        🎬 MOVIE APP
      </div>
      <div className="bg-white m-auto max-w-md rounded-xl p-6">
        <h1 className="mb-4 text-2xl font-bold text-center">Log in</h1>
        {error && (
          <p
            className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700"
            data-testid="login-error"
          >
            {errorMap[error] ?? "Login failed."}
          </p>
        )}
        <form
          action="/login/submit"
          method="post"
          className="space-y-3"
          data-testid="login-form"
        >
          <input type="hidden" name="next" value={next} />
          <FormInput type="username" />
          <FormInput type="password" />
          <button
            type="submit"
            data-testid="sign-in-btn"
            className="w-full rounded-md bg-black p-2 text-white cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
