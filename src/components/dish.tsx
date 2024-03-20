import { restaurant_restaurant_restaurant_menu_options } from "@generated/restaurant";
import React from "react";

interface IDishProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  removeFromOrder,
  isSelected,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className={`px-8 py-4 border cursor-pointer transition-all ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
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
