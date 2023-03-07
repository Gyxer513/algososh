import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { stack } from "../../utils/stack";
import { timer } from "../../utils/utils";
import { IStackElement } from "../../types/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH } from "../../constants/stack";

export const StackPage: React.FC = () => {
  const [activaBtn, setActivaBtn] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<IStackElement[]>([]);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const pushItem = async () => {
    setActivaBtn("push");

    stack.push(inputValue);
    array.push({ item: stack.peak(), state: ElementStates.Changing });
    setInputValue("");
    setArray([...array]);

    await timer(SHORT_DELAY_IN_MS);

    array[array.length - 1].state = ElementStates.Default;
    setArray([...array]);

    setActivaBtn("");
  };

  const removeItem = async () => {
    setActivaBtn("del");
    stack.pop();
    array[array.length - 1].state = ElementStates.Changing;
    setArray([...array]);

    await timer(SHORT_DELAY_IN_MS);

    array.pop();
    setArray([...array]);
    setActivaBtn("");
  };

  const clearStack = async () => {
    setActivaBtn("clear");
    stack.clear();
    await timer(SHORT_DELAY_IN_MS);
    setArray([]);
    setInputValue("");
    setActivaBtn("");
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.stackContainer}>
        <Input
          placeholder="Введите текст"
          maxLength={MAX_LENGTH}
          isLimitText={true}
          onChange={handlerChangeInput}
          value={inputValue}
        />
        <Button
          text="Добавить"
          onClick={pushItem}
          disabled={
            inputValue == "" || activaBtn == "del" || activaBtn == "clear"
          }
          isLoader={activaBtn == "push"}
        />
        <Button
          text="Удалить"
          disabled={
            !array.length || activaBtn == "push" || activaBtn == "clear"
          }
          onClick={removeItem}
          isLoader={activaBtn == "del"}
        />
        <Button
          text="Очистить"
          disabled={!array.length || activaBtn == "del" || activaBtn == "push"}
          onClick={clearStack}
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
