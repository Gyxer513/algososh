import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { timer } from "../../utils/utils";
import { queue, defaultArray } from "../../utils/queue";
import { IQueueElement } from "../../types/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<Array<IQueueElement>>(defaultArray);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addItem = async () => {
    setLoader(true);
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
    setLoader(false);
  };
  const clearQueue = async () => {
    queue.clear();
    await timer(SHORT_DELAY_IN_MS);
    setArray([
      ...Array.from({ length: 7 }, () => ({
        item: "",
        state: ElementStates.Default,
        head: false,
        tail: false,
      })),
    ]);
    setInputValue("");
  };
  const removeItem = async () => {
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
      console.log(array);
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
          disabled={inputValue == ""}
          isLoader={loader}
        />
        <Button
          text="Удалить"
          disabled={!array.length}
          onClick={removeItem}
          isLoader={loader}
        />
        <Button
          text="Очистить"
          disabled={!array.length}
          onClick={clearQueue}
          isLoader={loader}
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
                head={
                  index === queue.getHead() && !queue.isEmpty() ? "head" : ""
                }
                tail={
                  index === queue.getTail() && !queue.isEmpty() ? "tail" : ""
                }
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
