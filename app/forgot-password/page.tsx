import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const forgotPassword = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;

    const supabase = createClient();
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/recover-password`
    });
    if (error) {
      console.log(error);
      return redirect("/?message=" + encodeURIComponent('No se encontro al usuario'));
    }

    return redirect('/?message=' + encodeURIComponent('Gracias por tu solicitud. Revisa tu correo electrónico para restablecer tu contraseña.'));
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-4 bg-white">
      <a className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center group text-sm" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"><polyline points="15 18 9 12 15 6"></polyline></svg> Atrás</a>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Contraseña</h2>

        <label className="text-md" htmlFor="email">
          Correo Electrónico
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border border-gray-300 mb-4"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          required
        />

        <SubmitButton
          formAction={forgotPassword}
          className="bg-blue-500 rounded-md px-4 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          pendingText="Validando..."
        >
          Recuperar Contraseña
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
