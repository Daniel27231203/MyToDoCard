import { FC } from "react";
import scss from "./HomePage.module.scss";
import Welcome from "./HomeSections/Welcome";
import Products from "./HomeSections/Products";

const HomePage: FC = () => {
  return (
    <>
      <Welcome />
      <Products />
    </>
  );
};

export default HomePage;
