"use client";

import { Spinner } from "flowbite-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Button(props: { formAction: () => void }) {
  const { pending } = useFormStatus();
  const { formAction } = props;

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
      type="submit"
      formAction={formAction}
    >
      Email shifts {pending && <Spinner />}
    </button>
  );
}
