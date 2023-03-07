import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [indexValue, setIndexValue] = React.useState<string>("");
  const [numbersArray, setNumbersArray] = React.useState<Array<number>>([]);

  const handlerChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlerChangeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    setIndexValue(e.currentTarget.value);
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
      <div className={styles.listContainer}>
        <Input
          value={inputValue}
          onChange={handlerChangeInput}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          placeholder={"Введите значение"}
        />
        <Button text="Добавить в head" />
        <Button text="Добавить в tail" />
        <Button text="Удалить из head" />
        <Button text="Удалить из tail" />
      </div>
      <div className={styles.listContainer}>
        <Input onChange={handlerChangeIndex} extraClass={styles.input} />
        <Button text="Добавить по индексу" extraClass={styles.button}/>
        <Button text="Удалить по индексу" extraClass={styles.button}/>
      </div>
      </section>
      
    </SolutionLayout>
  );
};
