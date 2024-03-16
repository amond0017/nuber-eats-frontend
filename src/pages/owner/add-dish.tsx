import { gql, useMutation } from "@apollo/client";
import { createDish, createDishVariables } from "@generated/createDish";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "src/components/button";
import { FormError } from "src/components/form-error";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

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
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { name, price, description } = getValues();

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
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
