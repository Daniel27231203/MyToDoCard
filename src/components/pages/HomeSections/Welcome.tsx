import { FC } from "react";
import scss from "./Welcome.module.scss";
import Link from "next/link";
import Image from "next/image";
import todo from "../../../assets/images/DALL·E 2024-11-29 21.46.39 - A visually modern and minimalistic design for a 'TodoCard' application. The image features a dark mode theme with a sleek black background. The card e.webp";
import hero from "../../../assets/images/hero.webp";
import mp3 from "../../../assets/images/mp3.webp";

const Welcome: FC = () => {
  return (
    <section className={scss.Welcome}>
      <div className="container">
        <div className={scss.content}>
          <h1>Welcome to My TodoCard!</h1>
          <p>
            My TodoCard is a simple and efficient to-do list app built with
            Next.js and BackEnd with node.js(Prisma)
          </p>
          <div className={scss.block}>
            <div className={scss.leftBox}>
              <Image src={mp3} alt="" />
            </div>
            <div className={scss.rightBox}>
              <h3>
                About my <span>project</span>
              </h3>
              <p>
                I am working on this project to practice and improve my
                development skills. I find the process genuinely engaging and
                exciting because I am creating a complete full-stack project
                entirely on my own. As part of this work, I am using Prisma for
                efficient database management, with Supabase as the database
                solution. This project allows me to deepen my understanding of
                all aspects of development, from backend programming to database
                integration.
              </p>
              <Link
                href="https://github.com/Daniel27231203/MyToDoCard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={scss.button}>View on GitHub</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
