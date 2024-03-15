import { gql, useMutation } from "@apollo/client";
import {
  createRestaurant,
  createRestaurantVariables,
} from "@generated/createRestaurant";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "src/components/button";
import { FormError } from "src/components/form-error";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setUploading(false);

      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-center text-3xl mb-5">
          Add Restaurant
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("name", { required: "Name is required." })}
            className="input"
            type="text"
            placeholder="Name"
          />
          <input
            {...register("address", { required: "Address is required." })}
            className="input"
            type="text"
            placeholder="Address"
          />
          <input
            {...register("categoryName", {
              required: "Category Name is required.",
            })}
            className="input"
            type="text"
            placeholder="Category Name"
          />

          <div>
            <input
              {...register("file", { required: true })}
              type="file"
              accept="image/*"
            />
          </div>

          <Button
            loading={uploading}
            canClick={isValid}
            actionText="Create Restaurant"
          />
          {data?.createRestaurant?.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
        </form>
      </div>
    </div>
  );
};
