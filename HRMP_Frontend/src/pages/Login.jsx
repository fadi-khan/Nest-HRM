import {CustomField} from "../components/CustomField.jsx";
import {Logo} from "../components/Logo.jsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {API} from "../services/client.jsx";

export const Login = () => {


    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } =  useForm()

    const onSubmit = async (data) => {
        try {

            const resp = await API.post(`/auth/login`, data);
            console.log(resp);

            const token = resp.data;
           localStorage.setItem('token', token);
            navigate("/dashboard")

        } catch (err) {

            console.log(err)
            const msg = err.response?.data?.message;
            setError('loginError',{type:'manual',message:msg})
        }
    };

    return (
        <div className={'flex h-screen  flex-row w-full mx-auto'} >



            <div className={"h-full hidden md:flex  bg-blue-950  px-4 md:w-1/2 lg:w-[40%]  justify-center items-center"}>

              <ul className={'text-white  h text-5xl space-y-6 font-bold tracking-wide   '}>
                  <li>HUMAN</li>
                  <li>RESOURCE</li>
                  <li>MANAGEMENT</li>
              </ul>

            </div>

            <div className={"  justify-center   flex flex-col  p-4 md:none mx-auto"}>



                   <Logo/>

                    <h1 className={"py-8 text-left font-bold text-3xl text-blue-950"}>Log in</h1>


                {
                    errors.loginError?.message &&
                    <h1 className={ "text-center  text-red-600 p-4 "}> {errors.loginError.message} </h1>
                }


                    <form onSubmit={handleSubmit(onSubmit)} className={"bg-white flex flex-col  gap-y-2  border rounded-lg shadow shadow-black p-8 "}>
                        <CustomField
                            type={'email'}
                            placeholder={"📧  Email address"}
                            inputLabel={'Email Address'}
                            name={'email'}
                            register={register}
                            isLoginScreen={true}
                        />
                        <CustomField
                            type={'password'}
                            placeholder={'🔒  Password'}
                            inputLabel={'Password'}
                            name={'password'}
                            register={register}
                            isLoginScreen={true}
                        />

                        <input
                            className={"bg-blue-900 hover:bg-blue-950 py-2  rounded-lg text-white"}
                            type={'submit'}
                            value={'Login'}

                        />

                    </form>


            </div>

        </div>
    )
}