import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "src/apollo";
import { LOCALSTORAGE_TOKEN } from "src/constants";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export const Header = () => {
  const navigate = useNavigate();
  const { data, client } = useMe();

  const onClickLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
    client.clearStore();

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
