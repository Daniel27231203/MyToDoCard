import { FC } from "react";
import scss from "./OrderPage.module.scss";

const OrderPage: FC = () => {
  return (
    <section className={scss.OrderPage}>
      <div className="container">
        <div className={scss.content}>OrderPage</div>
      </div>
    </section>
  );
};

export default OrderPage;
