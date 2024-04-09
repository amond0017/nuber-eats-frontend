import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "@generated/graphql";

export interface ICategoryImage extends Pick<Category, "coverImg"> {}

export const CategoryImage: React.FC<ICategoryImage> = ({ coverImg = "" }) => {
  return (
    <div
      className="w-16 h-16 bg-contain bg-no-repeat bg-center group-hover:bg-gray-100 rounded-full flex justify-center items-center"
      style={{ backgroundImage: `url(${coverImg})` }}
    >
      {!coverImg && <FontAwesomeIcon className="w-8 h-8" icon={faUtensils} />}
    </div>
  );
};
