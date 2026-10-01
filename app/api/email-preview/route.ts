import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import EmailTemplate from "@/components/Templates/EmailTemplate";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "Azi";
  const email = searchParams.get("email") ?? "you@example.com";
  const project =
    searchParams.get("project") ??
    "Hey, I'd love to build something together — hit me up when you have a moment.";

  const html = await render(EmailTemplate({ name, email, project }));

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
