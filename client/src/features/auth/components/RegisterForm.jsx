import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Card, Input } from "../../../components/ui";
import { register } from "../store/authSlice";
import {
    selectLoading,
    selectError
} from "../store/authSelectors";

const RegisterForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isLoading = useSelector(selectLoading);

    const serverError = useSelector(selectError);

    const {

        register: registerField,

        handleSubmit,

        watch,

        formState: {
            errors
        }

    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {

        try {

            const payload = {
                name: data.name,
                email: data.email,
                password: data.password
            };

            await dispatch(register(payload)).unwrap();

            toast.success("Registration Successful");

            navigate("/login");

        }
        catch (error) {

            toast.error(error || "Registration Failed");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

            <Card className="w-full max-w-md">

                <div className="mb-6">

                    <h1 className="text-3xl font-bold">

                        Create Account

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Create your RAG Assistant account

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input

                        label="Full Name"

                        placeholder="Enter Full Name"

                        {...registerField("name", {

                            required: "Name is required"

                        })}

                        error={errors.name?.message}

                    />

                    <Input

                        label="Email"

                        type="email"

                        placeholder="Enter Email"

                        {...registerField("email", {

                            required: "Email is required",

                            pattern: {

                                value: /^\S+@\S+$/i,

                                message: "Invalid Email"

                            }

                        })}

                        error={errors.email?.message}

                    />

                    <Input

                        label="Password"

                        type="password"

                        placeholder="Enter Password"

                        {...registerField("password", {

                            required: "Password is required",

                            minLength: {

                                value: 6,

                                message: "Minimum 6 characters"

                            }

                        })}

                        error={errors.password?.message}

                    />

                    <Input

                        label="Confirm Password"

                        type="password"

                        placeholder="Confirm Password"

                        {...registerField("confirmPassword", {

                            required: "Confirm Password is required",

                            validate: value =>

                                value === password ||

                                "Passwords do not match"

                        })}

                        error={errors.confirmPassword?.message}

                    />

                    {

                        serverError && (

                            <p className="text-red-500 text-sm">

                                {serverError}

                            </p>

                        )

                    }

                    <Button

                        type="submit"

                        loading={isLoading}

                    >

                        Register

                    </Button>

                </form>

                <p className="mt-6 text-center text-sm">

                    Already have an account?{" "}

                    <Link

                        to="/login"

                        className="text-blue-600 font-medium hover:underline"

                    >

                        Login

                    </Link>

                </p>

            </Card>

        </div>

    );

};

export default RegisterForm;