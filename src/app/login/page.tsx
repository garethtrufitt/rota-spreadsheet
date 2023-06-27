import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Carers from "@/carers";

export default async function LogIn() {
  async function logInAction(data: FormData) {
    "use server";
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll
    const username = data.get("username");
    const password = data.get("password");

    const carers = Carers();
    const carer = carers[username as keyof typeof carers];

    console.log(carer);

    if (
      username === carer?.username &&
      password === process.env[`${carer.name.toUpperCase()}_PASSWORD`]
    ) {
      cookies().set("loggedin", JSON.stringify(carer));

      redirect(`/`);
    }
  }

  if (cookies().get("loggedin")) {
    redirect(`/`);
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Log In
      </h1>
      <form action={logInAction} className="flex flex-col text-gray-900">
        <label htmlFor="username">Username</label>
        <input className="mb-4" type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input className="mb-4" type="text" name="password" id="password" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-5">
        Contact Gareth if you have problems logging in or forget your password.
      </p>
    </main>
  );
}
