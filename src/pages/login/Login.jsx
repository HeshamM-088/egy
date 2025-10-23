import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f1f0eb] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/rename.jpg')] bg-cover bg-center opacity-60 h-full"></div>

      <div className="h-screen flex items-center justify-center">
        <div className="max-w-5xl flex flex-col md:flex-row items-center justify-between mt-2 rounded-2xl bg-blue-gray-300 dark:bg-gray-800 shadow-lg transition-colors duration-300">
          <Card className="w-95 max-w-sm shadow-sm mx-4 my-10 md:w-96 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <CardHeader
              variant="gradient"
              color="teal"
              className="mb-3 grid h-12 place-items-center"
            >
              <Typography variant="h3" color="white" className="font-serif">
                Login
              </Typography>
            </CardHeader>

            <Typography
              variant="h5"
              className="text-blue-gray-600 dark:text-gray-300 text-center mt-1 flex justify-center"
            >
              Welcome to{" "}
              <span className="text-teal-600 font-semibold ml-1">
                EGY-Guide
              </span>
              <IoLocationSharp className="text-red-800 dark:text-red-500 ml-1" />
            </Typography>

            <CardBody className="flex flex-col gap-4">
              <Input
                label="Email"
                size="lg"
                required={true}
                type="email"
                className="dark:text-gray-200"
              />
              <Input
                label="Password"
                size="lg"
                required={true}
                type="password"
                className="dark:text-gray-200"
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" color="teal" />
              </div>
            </CardBody>

            <CardFooter className="pt-0">
              <Link to="/Places">
                <Button color="teal" variant="gradient" fullWidth>
                  Login
                </Button>
              </Link>
              <Typography
                variant="small"
                className="mt-6 flex justify-center dark:text-gray-300"
              >
                Don&apos;t have an account?
                <Typography
                  as={Link}
                  to="/sign-up"
                  variant="small"
                  color="teal"
                  className="ml-1 font-bold"
                >
                  Sign-up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Login;
