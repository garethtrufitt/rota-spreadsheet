import { redirect, useSearchParams } from "next/navigation";
import nodemailer from "nodemailer";

import Button from "@/components/Button";

export default async function Admin(props: {
  searchParams: { login: string; rotaEmailSent: string };
}) {
  const sendMail = async () => {
    "use server";

    const transport = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transport.sendMail({
      from: '"Rota Trufitt" <rota@trufitt.com>', // sender address
      to: "gtrufitt@gmail.com", // list of receivers
      subject: "Your Upcoming Rota", // Subject line
      text: "Hello world?", // plain text body
      html: "<h1>Your Rota</h1><p><b>Hello world?</b> Test</p>", // html body
    });
    redirect("/admin?login=admin1987&rotaEmailSent=true");
  };

  if (props.searchParams.login === process.env.ADMIN_PASSWORD) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Admin
        </h1>
        {props.searchParams.rotaEmailSent && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success!</span> Email sent
            successfully.
          </div>
        )}
        <h2 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Email shifts
        </h2>
        <form action="/api/emailShifts">
          <Button formAction={sendMail} />
        </form>
      </main>
    );
  } else {
    redirect(`/`);
  }
}
