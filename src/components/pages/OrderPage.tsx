"use client";
import { FC } from "react";
import scss from "./OrderPage.module.scss";
import useStore from "@/zustand/store";
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import photoimg from "../../assets/images/DALL·E 2024-11-29 21.46.39 - A visually modern and minimalistic design for a 'TodoCard' application. The image features a dark mode theme with a sleek black background. The card e.webp";
import emptyCart from "../../assets/images/emptyBasket.webp";
import Image from "next/image";
import axios from "axios";

interface ITelegram {
  name: string;
  lastName: string;
  adress: string;
  productId?: number[];
  email: string;
  quantity?: number;
}

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const OrderPage: FC = () => {
  const { basket, increase, decrease, deleteMap, deleteAll } = useStore();
  const total = basket.reduce((acc, el) => acc + el.price * el.quantity, 0);
  const { register, handleSubmit, reset } = useForm<ITelegram>();
  const productId = basket.map((el) => el.id);
  const productQuantity = basket.map((el) => el.quantity);

  const massegeModel = (data: ITelegram) => {
    const orderData = {
      name: data.name,
      lastName: data.lastName,
      adress: data.adress,
      productId: productId,
      email: data.email,
      quantity: productQuantity,
    };
    let message = `Username: <b>${orderData.name}</b>\n`;
    message += `Email: <b>${orderData.email}</b>\n`;
    message += `Last Name: <b>${orderData.lastName}</b>\n`;
    message += `Address: <b>${orderData.adress}</b>\n`;
    message += `Product IDs: <b>${orderData.productId.join(", ")}</b>\n`;
    message += `Product quantitu: <b>${orderData.quantity.join(", ")}</b>`;
    return message;
  };

  const onSubmit: SubmitHandler<ITelegram> = async (data) => {
    if (!TOKEN || !CHAT_ID) {
      console.error("Telegram TOKEN or CHAT_ID is not defined");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          parse_mode: "HTML",
          text: massegeModel(data),
        }
      );
      console.log("Message sent successfully:", response.data);
      reset(); // Очистка формы после успешной отправки
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <section className={scss.OrderPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.orderHeader}>
            <h1>
              Your Orders <span>Are Here!</span>
            </h1>
            {basket.length > 1 ? (
              <button
                onClick={() => {
                  deleteAll();
                }}
              >
                Clear All
              </button>
            ) : null}
          </div>
          {basket.length ? (
            <>
              <div className={scss.tableContainer}>
                {basket && basket.length > 0 ? (
                  <>
                    <table className={scss.orderTable}>
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Photo</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.map((item: ProductBasket, index: number) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img src={item.photo} alt="" />
                            </td>
                            <td>{item.title}</td>
                            <td>
                              <div className={scss.quantitybox}>
                                <button onClick={() => increase(item.id!)}>
                                  <GoPlus />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => decrease(item.id!)}>
                                  <AiOutlineMinus />
                                </button>
                              </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                              <button onClick={() => deleteMap(item.id!)}>
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        ))}
                        <span className={scss.total}>
                          total price: {total}$
                        </span>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p className={scss.emptyMessage}>Your basket is empty.</p>
                )}
              </div>
              <div className={scss.telegramGo}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Your Name"
                  />
                  <input
                    {...register("lastName", { required: true })}
                    type="text"
                    placeholder="Last Name"
                  />
                  <input
                    {...register("adress", { required: true })}
                    type="text"
                    placeholder="your adress"
                  />
                  <input
                    {...register("email", { required: true })}
                    type="text"
                    placeholder="your email"
                  />

                  <button type="submit">Telegram Go</button>
                </form>
                <Image src={photoimg} alt="image" />
              </div>
            </>
          ) : (
            <div className={scss.empty}>
              <Image src={emptyCart} alt="empty basket" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
