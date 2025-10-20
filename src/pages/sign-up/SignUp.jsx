import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

const SignUp = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f1f0eb] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/rename.jpg')] bg-cover bg-center opacity-60 h-full"></div>

      <div className="h-screen flex items-center justify-center">
        <div className="max-w-xl flex flex-col md:flex-row items-center justify-center mt-2 rounded-2xl bg-blue-gray-300 dark:bg-gray-800 shadow-lg transition-colors duration-300">
          <Card className="w-full max-w-xl shadow-sm mx-4 my-10 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <CardHeader
              variant="gradient"
              color="teal"
              className="mb-3 grid h-16 place-items-center"
            >
              <Typography variant="h3" color="white" className="font-serif">
                Sign Up
              </Typography>
            </CardHeader>

            <Typography
              variant="h5"
              className="text-gray-600 dark:text-gray-300 text-center mt-1 flex justify-center"
            >
              Welcome to
              <span className="text-teal-600 font-semibold mx-2.5">
                EGY-Guide
              </span>
              join us now
              <IoLocationSharp className="text-red-800 dark:text-red-500 ml-1" />
            </Typography>

            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Name"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  required
                />
                <Input
                  label="Email"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  required
                  type="email"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Password"
                  type="password"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  required
                />
              </div>

              <div className="-ml-2.5 text-sm">
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  color="teal"
                />
              </div>
            </CardBody>

            <CardFooter className="pt-0">
              <Link to="/Login">
                <Button color="teal" variant="gradient" fullWidth>
                  Sign Up
                </Button>
              </Link>

              <Typography
                variant="small"
                className="mt-6 flex justify-center dark:text-gray-300"
              >
                Already have an account?
                <Typography
                  as={Link}
                  to="/login"
                  variant="small"
                  color="teal"
                  className="ml-1 font-bold"
                >
                  Log In
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
