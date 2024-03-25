import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

interface ISearchFormProps {
  searchTerm: string;
}

export const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(() => location.search.split("?term=")[1], [location]);

  const { register, handleSubmit, getValues, setValue } =
    useForm<Pick<ISearchFormProps, "searchTerm">>();

  useEffect(() => {
    // '/' -> 'search' 페이지로 왔을 떄.
    const { searchTerm } = getValues();

    if (query && !searchTerm) {
      setValue("searchTerm", query);
    }
  }, [query]);

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate(`/search?term=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSearchSubmit)}
      className="bg-gray-800 w-full py-40 flex items-center justify-center"
    >
      <input
        {...register("searchTerm", { required: true })}
        type="search"
        className="input rounded-md border-0 w-3/4 md:w-3/12"
        placeholder="Search Restaurants..."
      />
    </form>
  );
};
