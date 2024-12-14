"use client";
import { FC, useState } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import useStore from "@/zustand/store";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const { basket } = useStore();
  const { search, setSearch } = useStore();
  const router = useRouter();
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
              {basket.length ? <span>{basket.length}</span> : null}
            </nav>
            <div className={scss.search}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search..."
                type="text"
              />
              <button
                onClick={() => {
                  router.push(`/product/${search}`);
                  setSearch(search);
                }}
              >
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
