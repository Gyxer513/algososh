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
  const [indexValue, setindexValue] = React.useState<string>("");
  const [numbersArray, setNumbersArray] = React.useState<Array<number>>([]);

  const handleInputValChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
}

const handleInputIdxChange = (e: React.FormEvent<HTMLInputElement>) => {
  setindexValue(e.currentTarget.value);
}

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.listContainer}>
        <Input
          value={inputValue}
          onChange={handleInputValChange}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          placeholder={"Введите значение"}
        />
        <Button
          text="Добавить в head"

        />
        <Button
          text="Добавить в tail"
    
        />
        <Button
          text="Удалить из head"

        />
        <Button
          text="Удалить из tail"
        />
      </section>
      <section className={styles.listContainer}>
        <Input
extraClass={styles.input}
        />
        <Button
          text="Добавить по индексу"


        />
        <Button
          text="Удалить по индексу"


        />
      </section>
    </SolutionLayout>
  );
};
