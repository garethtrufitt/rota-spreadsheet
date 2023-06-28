import { redirect, useSearchParams } from "next/navigation";
import nodemailer from "nodemailer";

import Button from "@/components/Button";
import Carers from "@/carers";

export default async function Admin(props: {
  searchParams: { login: string; rotaEmailSent: string };
}) {
  const sendMail = async (data: FormData) => {
    "use server";

    const carers = Carers();
    const carerNames = data.getAll("carers") as (keyof typeof carers)[];
    const carerObjs = carerNames.map((name) => carers[name]);

    const transport = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    carerObjs.forEach(async (carer) => {
      await transport.sendMail({
        from: '"Rota Trufitt" <rota@trufitt.com>', // sender address
        to: carer.email, // list of receivers
        subject: `Your Upcoming Rota, ${carer.name}`, // Subject line
        text: "Hello, your rota is available", // plain text body
        html: `<h1>Hi ${carer.name}, your rota is available.</h1><p><a href="https://rota.dearevelina.com/${carer.username}">See your rota</a></p><p><a href="https://rota.dearevelina.com/">See available shifts</a></p>`, // html body
      });
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
          {Object.entries(Carers()).map((carer) => (
            <label key={carer[1].username} className="flex items-center gap-2">
              <input type="checkbox" name="carers" value={carer[1].username} />
              {carer[1].name}
            </label>
          ))}
          <Button formAction={sendMail} />
        </form>
      </main>
    );
  } else {
    redirect(`/`);
  }
}
