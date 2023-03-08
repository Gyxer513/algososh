import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { timer } from "../../utils/utils";
import { queue, defaultArray } from "./utils";
import { IQueueElement } from "../../types/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ARRAY_LENGTH } from "../../constants/quenue";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [activaBtn, setActivaBtn] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<Array<IQueueElement>>(defaultArray);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addItem = async () => {
    setActivaBtn("push");
    queue.enqueue(inputValue);
    if (queue.getTail() > 0) {
      array[queue.getTail() - 1].tail = false;
    }
    array[queue.getTail()] = {
      item: inputValue,
      state: ElementStates.Changing,
      head: true,
      tail: true,
    };
    setInputValue("");
    await timer(SHORT_DELAY_IN_MS);
    array[queue.getTail()].state = ElementStates.Default;
    setArray([...array]);
    setActivaBtn("");
  };
  const clearQueue = async () => {
    setActivaBtn("clear");
    queue.clear();
    await timer(SHORT_DELAY_IN_MS);
    setArray([
      ...Array.from({ length: ARRAY_LENGTH }, () => ({
        item: "",
        state: ElementStates.Default,
        head: false,
        tail: false,
      })),
    ]);

    setActivaBtn("");
    setInputValue("");
  };
  const removeItem = async () => {
    setActivaBtn("del");
    if (queue.getHead() === queue.getTail()) {
      array[queue.getHead()].state = ElementStates.Changing;
      clearQueue();

      await timer(SHORT_DELAY_IN_MS);
      array[queue.getHead()].state = ElementStates.Default;
      setArray([
        ...Array.from({ length: 7 }, () => ({
          item: "",
          state: ElementStates.Default,
          head: false,
          tail: false,
        })),
      ]);
    } else {
      queue.dequeue();
      array[queue.getHead() - 1] = {
        item: "",
        state: ElementStates.Changing,
        head: true,
      };
      setArray([...array]);
      await timer(SHORT_DELAY_IN_MS);
      setArray([...array]);
      array[queue.getHead() - 1].state = ElementStates.Default;
      setActivaBtn("");
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.queueContainer}>
        <Input
          onChange={handlerChangeInput}
          placeholder="Введите текст"
          maxLength={4}
          isLimitText={true}
          value={inputValue}
        />
        <Button
          text="Добавить"
          onClick={addItem}
          disabled={
            inputValue == "" || activaBtn == "del" || activaBtn == "clear"
          }
          isLoader={activaBtn == "push"}
        />
        <Button
          text="Удалить"
          disabled={activaBtn == "push" || activaBtn == "clear"}
          onClick={removeItem}
          isLoader={activaBtn == "del"}
        />
        <Button
          text="Очистить"
          disabled={activaBtn == "del" || activaBtn == "push"}
          onClick={clearQueue}
          isLoader={activaBtn == "clear"}
        />
      </section>

      <ul className={styles.list}>
        {array?.map((item, index) => {
          return (
            <li className={styles.listItem} key={index}>
              <Circle
                letter={`${item.item}`}
                state={item.state}
                index={index}
                head={index === queue.getHead() && !queue.isEmpty() ? HEAD : ""}
                tail={index === queue.getTail() && !queue.isEmpty() ? TAIL : ""}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
