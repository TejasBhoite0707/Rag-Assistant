import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Card, Input } from "../../../components/ui";
import { login } from "../store/authSlice";
import {
    selectLoading,
    selectError
} from "../store/authSelectors";

const LoginForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isLoading = useSelector(selectLoading);

    const serverError = useSelector(selectError);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
 
        try {
console.log("Before Login");
            await dispatch(login(data)).unwrap();
console.log("After Login");
            toast.success("Login Successful");
console.log("toast");
            navigate("/dashboard");
            console.log("navigated");

        } catch (error) {

            toast.error(error?.message || "Login Failed");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

            <Card className="w-full max-w-md">

                <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your RAG Assistant
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email address"
                            }
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        {...register("password", {
                            required: "Password is required"
                        })}
                        error={errors.password?.message}
                    />

                    {serverError && (
                        <p className="text-red-500 text-sm">
                            {serverError}
                        </p>
                    )}

                    <Button
                        type="submit"
                        loading={isLoading}
                    >
                        Login
                    </Button>

                </form>

                <p className="mt-6 text-center text-sm">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>

                </p>

            </Card>

        </div>

    );

};

export default LoginForm;