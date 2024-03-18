import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config/global";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      const response = await axios.post(`${URL}/auth/login`, data);
      setCookie("token", response.data.token, { path: "/" });

      setIsLoading(false);
      navigate("/inventory");
    } catch (error) {
      console.log(error.response);
      const { status } = error.response;

      if (status === 400) {
        setServerError(error.response.data.message);
      }

      setIsLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center">
      <Card className="w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-6">
            <div className="mb-6">
              <Typography variant="h3" color="blue-gray" className="">
                <span className="text-red-800">UNC</span>Devices
              </Typography>
              <Typography className="text-gray-800">
                Login to your account.
              </Typography>
            </div>

            <div>
              <Input
                label="Email"
                size="lg"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="ml-3 text-xs text-red-400 italic">
                  *This field is required
                </span>
              )}
            </div>
            <div>
              <Input
                type="password"
                label="Password"
                size="lg"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="ml-3 text-xs text-red-400 italic">
                  *This field is required
                </span>
              )}
            </div>
            <div>
              {serverError && (
                <span className=" text-red-400">{serverError}</span>
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-2">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Forgot your password?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:underline"
              >
                Click here
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
