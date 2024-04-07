import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./login/submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=No se pudo autenticar al usuario");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=No se pudo autenticar al usuario");
    }

    return redirect("/login?message=Verifique el correo electrónico para continuar con el proceso de inicio de sesión");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-4 bg-white">

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-gray-700">
        <label className="text-md" htmlFor="email">
          Correo Electrónico
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border border-gray-300 mb-4"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border border-gray-300 mb-4"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-blue-500 rounded-md px-4 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          pendingText="Iniciando sesión..."
        >
          Iniciar Sesión
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          pendingText="Registrando..."
        >
          Registrarse
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-gray-100 text-gray-700 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>

  );
}
