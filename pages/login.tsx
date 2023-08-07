import { auth } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, signInGoogle } = useAuth();
  const [google, setGoogle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else if (!login) {
      await signUp(email, password);
    }
  };

  const googleSignIn = async () => {
    await signInGoogle();
  };

  return (
    <div
      className="relative h-screen w-screen flex flex-col bg-black md:items-center md:justify-center
    md:bg-transparent"
    >
      <Head>
        <title>Netflix Clone | Login</title>
        <link rel="icon" href="https://rb.gy/oubj9" />
      </Head>

      <Image
        src="https://rb.gy/dh439"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="Netflix Background"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={100}
        height={100}
      />

      <div className="relative mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-4xl font-semibold">Sign in</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                className="input"
                type="email"
                placeholder="Email"
                {...register("email", { required: "true" })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Please enter a valid email to continue.
                </p>
              )}
            </label>

            <label className="inline-block w-full">
              <input
                className="input"
                type="password"
                placeholder="Password"
                {...register("password", { required: "true" })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Your password must contain between 6 and 32 characters.
                </p>
              )}
            </label>
          </div>
          <button
            className="signinButton bg-[#e50914] hover:bg-opacity-60"
            onClick={() => setLogin(true)}
          >
            Sign in
          </button>
          <div className="text-[gray]">
            New to Netflix?{" "}
            <button
              type="submit"
              className="text-white hover:underline"
              onClick={() => setLogin(false)}
            >
              Sign up now
            </button>
          </div>
        </form>
        <p className="text-center font-semibold my-4">or</p>
        <button
          className="signinButton bg-[rgb(245,245,245)] text-black hover:bg-opacity-60"
          onClick={googleSignIn}
        >
          Sign in using Google
        </button>
      </div>
    </div>
  );
}
