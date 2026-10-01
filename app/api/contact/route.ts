import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/components/templates/EmailTemplate";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// for debugging
// console.log(resend);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, project } = body;

    if (!name || !email || !project) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["rabano.azielrandel@gmail.com"],
      subject: `Portfolio Vistor: ${name}`,
      react: EmailTemplate({ name, email, project }),
    });

    if (error) {
      return NextResponse.json(
        { message: "Email not sent", error },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Email sent", id: data?.id });
  } catch (err) {
    return NextResponse.json(
      { message: "Email not sent", error: err },
      { status: 500 },
    );
  }
}
