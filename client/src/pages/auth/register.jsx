import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className=" bg-slate-950 mx-auto w-full max-w-md space-y-8 p-8 shadow-2xl  rounded-lg">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Create a New Account
        </h1>
        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-800 font-medium"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="space-y-6"
      />
    </div>
  );
}

export default AuthRegister;
