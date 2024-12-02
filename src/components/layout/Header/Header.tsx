import { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

const Header: FC = () => {
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <span className={scss.logoText}>TodoCard</span>
          </div>
          <div className={scss.leftBlock}>
            <nav>
              <Link className={scss.Link} href={"/"}>
                Home
              </Link>
              <Link className={scss.Link} href={"/product"}>
                Product
              </Link>
              <Link className={scss.Link} href={"/order"}>
                Order
              </Link>
              <Link className={scss.Link} href={"/create"}>
                Create
              </Link>
            </nav>
            <div className={scss.search}>
              <input placeholder="search..." type="text" />
              <button>
                <CiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
