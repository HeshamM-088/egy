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
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

const SignUp = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const navigate = useNavigate();
  const handleSignUp=()=>{
    if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword ) {
      setError("All fields are required!");
    }else if (userData.name[0] !== userData.name[0].toUpperCase()) {
      setError("The first letter of the name must be capital!");
    }else if (
      !userData.email.includes("@") || !userData.email.includes(".")
    ){
      setError("Invalid email address!");
    }else if (userData.password.length < 6 || !userData.password.includes("!") )
    {
      setError("Password must be at least 6 characters and includes '!'  ");
    } else if (userData.password !== userData.confirmPassword)
    {  setError("Passwords do not match!");
    } else if (!userData.agree) {
      setError("You must agree to the Terms and Conditions!");
    } else {
      setError ("")
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
      setSuccess("");
      navigate("/login");
    }, 2000)
    }
  };
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
                  onChange={(e)=>
                    setuserData(
                    {...userData,
                      name: e.target.value,})}
                />
                <Input
                  label="Email"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  type="email"
                  onChange={(e)=>
                    setuserData(
                    {...userData,
                      email: e.target.value,})}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Password"
                  type="password"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  onChange={(e)=>
                    setuserData(
                    {...userData,
                      password: e.target.value,})}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  size="lg"
                  className="w-full dark:text-gray-200"
                  onChange={(e)=>
                    setuserData(
                    {...userData,
                      confirmPassword: e.target.value,})
                    }
                      
                />
              </div>

              <div className="-ml-2.5 text-sm">
                <Checkbox
                label="I agree to the Terms and Conditions"
                color="teal"
                checked={userData.agree}
                onChange={(e) =>
                  setuserData({ ...userData, agree: e.target.checked })
                  }
                  />

              </div>
            </CardBody>
            {error && (
              <div className="mt-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-center font-semibold px-4 py-2 rounded-lg shadow-md animate-pulse">
                {error}
                </div>
              )}
            {success && (
              <div className="mt-3 bg-gradient-to-r from-green-900 to-blue-gray-600 text-white text-center font-semibold px-4 py-2 rounded-lg shadow-md animate-fade-in">
                {success}
                </div>
              )}

               

            <CardFooter className="pt-0">
                <Button color="teal" variant="gradient" fullWidth onClick={handleSignUp}>
                  Sign Up
                </Button>
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
