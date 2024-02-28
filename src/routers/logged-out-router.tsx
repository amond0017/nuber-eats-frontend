import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = () => {
    console.log(watch("email"));
  };

  const onInvalid = () => {
    console.log("can't create account");
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com/,
            })}
            type="email"
          ></input>
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input {...register("password", { required: true })}></input>
        </div>

        <button type="submit" className="bg-yellow-300 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoggedOutRouter;
