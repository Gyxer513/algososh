import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fib } from "../../utils/fibonacci";

export const FibonacciPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<number>(0);
  const [numbersArray, setNumbersArray] = React.useState<Array<number>>([]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    +e.currentTarget.value > 0 ? setDisabled(false) : setDisabled(true);
    setInputValue(+e.currentTarget.value)
  };

  const handlerClick = async () => {
    setLoader(true);
    await fib(inputValue, setNumbersArray);
    setLoader(false);
  };

  console.log(numbersArray)


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <section className={styles.mainBox}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={onChangeValue}
        ></Input>
        <div className={styles.input}></div>
        <Button
          onClick={handlerClick}
          text="Развернуть"
          linkedList="small"
          isLoader={loader}
          disabled={disabled}
        />
      </section>
      <ul className={styles.list}>
        {
          numbersArray?.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={`${item}`} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
