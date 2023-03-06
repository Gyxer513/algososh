import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "../../utils/stack";
import { timer } from "../../utils/utils";
import { IStackElement } from "../../types/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<IStackElement[]>([]);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const stack = new Stack<string>();

  const pushItem = async () => {
    setLoader(true);
    stack.push(inputValue);
    array.push({ item: stack.peak(), state: ElementStates.Changing });
    setInputValue("");
    setArray([...array]);

    await timer(SHORT_DELAY_IN_MS);

    array[array.length - 1].state = ElementStates.Default;
    setArray([...array]);
    setLoader(false);
  };

  const removeItem = async () => {
    setLoader(true);
    stack.pop();
    array[array.length - 1].state = ElementStates.Changing;
    setArray([...array]);

    await timer(SHORT_DELAY_IN_MS);

    array.pop();
    setArray([...array]);
    setLoader(false);
  };

  const clearStack = async () => {
    setLoader(true);
    stack.clear();
    await timer(SHORT_DELAY_IN_MS);
    setArray([]);
    setLoader(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.stackContainer}>
        <Input
          placeholder="Введите текст"
          maxLength={4}
          isLimitText={true}
          onChange={handlerChangeInput}
          value={inputValue}
        />
        <Button
          text="Добавить"
          onClick={pushItem}
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
          onClick={clearStack}
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
                head={index === array.length - 1 ? "top" : ""}
              />{" "}
              {index}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
