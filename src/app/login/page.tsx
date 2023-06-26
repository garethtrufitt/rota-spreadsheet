import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LogIn() {
  async function logInAction(data: FormData) {
    "use server";
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll
    const username = data.get("username");
    const password = data.get("password");

    if (username === "gareth" && password === process.env.GARETH_PASSWORD) {
      cookies().set(
        "loggedin",
        JSON.stringify({ username: "gareth", name: "Gareth" })
      );

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
      <form action={logInAction}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}
