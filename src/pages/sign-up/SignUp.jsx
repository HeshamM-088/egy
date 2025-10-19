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
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden ">
      <div className="absolute inset-0 bg-[url('/rename.jpg')] bg-cover bg-center opacity-60 h-83 "></div>

      <div className="h-screen flex items-center justify-center bg-[#f1f0eb]">
        
        <div className=" max-w-xl flex flex-col md:flex-row items-center justify-center mt-2 rounded-2xl bg-blue-gray-300">
          
          <Card className="w-full max-w-xl shadow-sm mx-4 my-10">
            <CardHeader
              variant="gradient"
              color="teal"
              className="mb-3 grid h-16 place-items-center "
            >
              <Typography variant="h3" color="white" className="font-serif"> 
                Sign Up
              </Typography>
            </CardHeader>
            <Typography
              variant="h5"
              className="text-gray-600 text-center mt-1 flex  justify-center  "
            >
              Welcome to
              <span className="text-teal-600  font-semibold mx-2.5 ">
                EGY-Guide
              </span> join us now
              <IoLocationSharp className="text-red-800" />
            </Typography>
            
            <CardBody className="flex flex-col gap-4">
               <div className="flex flex-col md:flex-row gap-4">
                  <Input label="Name" size="lg" className="w-full" required/>
                  <Input label="Email" size="lg" className="w-full" required type="Email" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                  <Input label="Password" type="password" size="lg" className="w-full" required/>
                  <Input label="Confirm Password" type="password" size="lg" className="w-full" required />
              </div>

              <div className="-ml-2.5 text-sm">
                <Checkbox label="I agree to the Terms and Conditions" />
              </div>
            </CardBody>
            
            <CardFooter className="pt-0">
              <Link to="/Login">
              <Button color="teal" variant="gradient" fullWidth >
                Sign Up
              </Button>
              </Link>
              <Typography variant="small" className="mt-6 flex justify-center">
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
