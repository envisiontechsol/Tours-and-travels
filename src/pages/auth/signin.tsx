import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/loaders/spiner";
import RenderIf from "../../components/renderIf";
import RoutesPath from "../../routes/routesPath";
import { IMAGES } from "../../theme/images";
import { adminLoginReq } from "../../services/api/auth/loginApi";
import { setAuthDetailsAction } from "../../store/authStore";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const SigninPage: React.FC = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>("");
  const [loginLoader, setLoginLoader] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onLogin = async (data: LoginFormInputs) => {
    setLoginLoader(true);
    try {
      const res = await adminLoginReq(data);
      setAuthDetailsAction(res?.data?.user, res?.data?.permissions || []);
      navigate(`${RoutesPath.admin}`);
    } catch (error: any) {
      toast.error("Login failed! Please check your username and password.");
    } finally {
      setLoginLoader(false);
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data Submitted: ", data);
    onLogin(data);
  };

  useEffect(() => {
    reset({
      email: "seed.admin@example.com",
      password: "root",
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <div className="container flex flex-col justify-center items-center flex-1">
        <div className="w-[95%] md:w-[50%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sm:max-w-lg mx-auto shadow-lg rounded-lg flex flex-col items-center bg-white"
          >
            <div className="text-center px-14 h-52 w-11/12">
              <img
                src={IMAGES.logo}
                alt="Techspiration Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {/* <div className="h-[0.5px] bg-gray-200 w-full mb-8"></div> */}
            <h2 className="text-center text-[20px] font-bold pb-4">
              Admin Login
            </h2>
            <div className="flex flex-col w-full px-10 pb-10">
              <div className="mb-4">
                <label className="block text-gray-700">User name</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "User name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 4 characters required",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Please enter user name"
                      className={`mt-1 p-2 w-full border rounded-lg ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                  }}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="Please enter password"
                      className={`mt-1 p-2 w-full border rounded-lg ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                {!!loginError && (
                  <div className="my-6">
                    <p className="text-[14px] text-[#F62E2E] font-semibold text-center mb-2">
                      Login Failed
                    </p>
                    <p className="text-[#F62E2E] text-center">{loginError}</p>
                  </div>
                )}
              </div>

              <div className="self-center">
                <button className="px-3 py-2 rounded-md bg-primary text-white w-44 flex justify-center">
                  Login
                  <RenderIf isShown={!!loginLoader}>
                    <div className="ml-2">
                      <Spinner color="white" size="small" />
                    </div>
                  </RenderIf>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
