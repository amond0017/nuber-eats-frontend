import React from "react";
import nuberLogo from "../images/logo.svg";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "src/constants";
import { authTokenVar, isLoggedInVar } from "src/apollo";

export const Header = () => {
  const navigate = useNavigate();
  const { data } = useMe();

  const onClickLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
    navigate("/");
  };

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} className="w-36" alt="Nuber eats" />
          </Link>
          <span className="text-xs ">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-5" />
            </Link>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-xl cursor-pointer"
              onClick={onClickLogout}
            />
          </span>
        </div>
      </header>
    </>
  );
};
