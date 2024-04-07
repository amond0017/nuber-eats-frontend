import { ApolloError, gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "src/components/button";
import { FormError } from "src/components/form-error";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { useNavigate } from "react-router-dom";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "@generated/graphql";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
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
  const client = useApolloClient();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onCompleted = (data: CreateRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId, error },
    } = data;
    setUploading(false);

    if (ok) {
      const { name, categoryName, address } = getValues();

      // fake
      const queryResult = client.readQuery({
        query: MY_RESTAURANTS_QUERY,
        variables: { input: { page: 1 } }, // variables 가 있는 쿼리에 variables 명시하지 않으면 null 을 리턴한다.
      });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          ...queryResult,
          myRestaurants: {
            ...queryResult.myRestaurants,
            results: [
              {
                id: restaurantId,
                name,
                coverImg: imageUrl,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                address,
                isPromoted: false,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.results,
            ],
          },
        },
        variables: {
          input: {
            page: 1,
          },
        },
      });

      navigate("/");
    } else if (error) setErrorMessage(error);
  };

  const onError = (e: ApolloError) => {
    setUploading(false);
    setErrorMessage(() => {
      if (!!e.graphQLErrors?.length) {
        const {
          extensions: { originalError },
        } = e.graphQLErrors[0] as Record<string, any>;

        return (
          (!!originalError?.message.length && originalError?.message[0]) ||
          "Something is wrong."
        );
      }
    });
  };

  const [createRestaurantMutation] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    onError,
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
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
      setImageUrl(coverImg);

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
    <div className="container flex flex-col items-center mt-52">
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

          {!!errorMessage && <FormError errorMessage={errorMessage} />}
        </form>
      </div>
    </div>
  );
};
