import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = (await cookies()).get("auth_user")?.value;
  redirect(user ? "/movies" : "/login");
}
