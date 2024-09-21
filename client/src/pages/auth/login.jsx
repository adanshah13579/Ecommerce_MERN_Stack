import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className=" shadow-2xl mx-auto w-full max-w-md space-y-8 p-8 bg-slate-950  rounded-lg">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome Back
        </h1>
        <p className="mt-4 text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="rounded-lg shadow-md p-6 bg-gray-50"
      />
      <div className="text-center">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-800"
            to="/terms"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-800"
            to="/privacy"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
