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
import { Link  } from "react-router-dom";
const Login = () => {
  return( 
     <div className="relative min-h-screen flex items-center justify-center bg-[#f1f0eb] overflow-hidden ">
      
      <div className="absolute inset-0 bg-[url('/rename.jpg')] bg-cover bg-center opacity-60 h-full"></div>

  <div className="h-screen flex items-center justify-center bg-[#f1f0eb]">
    <div className=" max-w-5xl flex flex-col md:flex-row items-center justify-between mt-2  rounded-2xl bg-blue-gray-300  ">
    <Card className="w-95 max-w-sm shadow-sm  mx-4 my-10 md:w-96 ">
      <CardHeader
        variant="gradient"
        color="teal"
        className="mb-3 grid h-12 place-items-center"
      >
        <Typography 
         variant="h3" color="white" className="font-serif">
          Login
        </Typography>
      </CardHeader>
      <Typography  variant="h5" className="text-blue-gray-600 text-center mt-1 flex justify-center">
              Welcome to <span className="text-teal-600 font-semibold ml-1 ">EGY-Guide 
</span><IoLocationSharp className="text-red-800" />
            </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" required={true} type="Email"/>
        <Input label="Password" size="lg"required={true} type="password" />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me"  />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to="/Places">
  <Button color="teal" variant="gradient" fullWidth>
    Login
    </Button>
    </Link>
        <Typography variant="small" className="mt-6 flex justify-center">
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
