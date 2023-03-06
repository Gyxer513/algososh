import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { timer } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<[]>([]);

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.queueContainer}>
        <Input />
        <Button />
        <Button />
        <Button />
      </section>

      <ul className={styles.list}>
        {array?.map((item, index) => {
          return (
            <li className={styles.listItem} key={index}>
              <Circle
                letter={`${item}`}
                state={item}
              />{" "}
              {index}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
