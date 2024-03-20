import { restaurant_restaurant_restaurant_menu_options } from "@generated/restaurant";
import React from "react";

interface IDishProps {
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
}

export const Dish: React.FC<IDishProps> = ({
  name,
  description,
  price,
  isCustomer = false,
  options,
}) => {
  return (
    <div className="px-8 py-4 border hover:border-gray-800 transition-all">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && !!options?.length && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options</h5>
          {options?.map((option, index) => (
            <span className="flex items-center" key={index.toString()}>
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">(${option.extra || 0})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
