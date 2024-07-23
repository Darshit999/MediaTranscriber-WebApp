import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-violet-100 dark:bg-slate-900">
                <Head title="Log in" />

                <div className="bg-white dark:bg-slate-800 w-[500px] p-8 rounded-lg">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 select-none">
                                    Remember me
                                </span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-300"
                                >
                                    Forgot password ?
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center mt-4">
                            <PrimaryButton
                                className="w-full my-4"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                            <Link
                                href={route("register")}
                                className="text-sm text-gray-600 dark:text-gray-400 mt-2"
                            >
                                Don't have an account ?{" "}
                                <span className="text-violet-500 hover:text-violet-600">
                                    Sign Up
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
