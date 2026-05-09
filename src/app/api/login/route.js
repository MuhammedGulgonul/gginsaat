import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request) {
  const formData = await request.formData();
  const password = formData.get("password");

  // Harcoded basic password for small company context.
  if (password === "gulgonul123") {
    const cookieStore = await cookies();
    cookieStore.set("gg_admin_auth", "1", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  }

  redirect("/admin");
}
