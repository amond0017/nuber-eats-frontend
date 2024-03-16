import { gql, useMutation } from "@apollo/client";
import { createDish, createDishVariables } from "@generated/createDish";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "src/components/button";
import { FormError } from "src/components/form-error";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";
import { DishOptionInputType } from "@generated/globalTypes";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  options?: DishOptionInputType[];
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();

  const onCompleted = () => {
    history.goBack();
  };

  const [createDishMutation, { loading, data }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: { id: +restaurantId },
        },
      },
    ],
    onCompleted,
  });

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = () => {
    const { name, price, description, options } = getValues();

    let convertedOptions: DishOptionInputType[] = [];

    // 옵션 있을 때 처리
    if (!!options?.length) {
      convertedOptions = options.map((option) => ({
        name: option.name,
        ...(!!option.extra && { extra: +option.extra }),
      }));
    }

    // const input = {
    //   name,
    //   price: +price,
    //   description,
    //   restaurantId: +restaurantId,
    //   ...(!!options?.length && { options: convertedOptions }),
    // };
    // console.log("input", input);

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          ...(!!options?.length && { options: convertedOptions }),
        },
      },
    });
  };

  const onAddOptionClick = () => {
    append({ name: "" });
  };

  const onDeleteClick = (idToDelete: number) => {
    remove(idToDelete);
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-center text-3xl mb-5">
          Add Dish
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("name", { required: "Name is required." })}
            className="input"
            type="text"
            placeholder="Name"
          />
          <input
            {...register("price", { required: "Price is required.", min: 0 })}
            className="input"
            type="number"
            placeholder="Price"
          />
          <input
            {...register("description", {
              required: "Description is required.",
            })}
            className="input"
            type="text"
            placeholder="Description"
          />

          <div className="my-10">
            <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
            <span
              onClick={onAddOptionClick}
              className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
            >
              Add Dish Option
            </span>
            {!!fields.length &&
              fields.map((field, index) => (
                <div key={field.id} className="mt-5">
                  <input
                    {...register(`options.${index}.name`, { required: true })}
                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                    type="text"
                    placeholder="Option Name"
                  />
                  <input
                    {...register(`options.${index}.extra`)}
                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                    type="number"
                    min={0}
                    placeholder="Option Extra"
                  />
                  <span
                    className="cursor-pointer text-white bg-red-500 py-3 px-4 mt-5"
                    onClick={() => onDeleteClick(index)}
                  >
                    Delete Option
                  </span>
                </div>
              ))}
          </div>

          <Button
            loading={loading}
            canClick={isValid}
            actionText="Create Dish"
          />

          {data?.createDish?.error && (
            <FormError errorMessage={data.createDish.error} />
          )}
        </form>
      </div>
    </div>
  );
};
