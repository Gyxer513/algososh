import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fib } from "../../utils/fibonacci";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<number>(0);
  const [numbersArray, setNumbersArray] = React.useState<Array<number>>([]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    +e.currentTarget.value > 0 && +e.currentTarget.value <= 19 ? setDisabled(false) : setDisabled(true);
    setInputValue(+e.currentTarget.value)
  };

  const handlerClick = async () => {
    setLoader(true);
    for (let i = 0; i <= fib(inputValue).length; i++ ) {
      await new Promise((res) => setTimeout(res, DELAY_IN_MS));
      setNumbersArray(fib(inputValue).slice(0, i))
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <section className={styles.mainBox}>
        <Input
          max={19}
          type={"number"}
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
        {numbersArray?.map((item, index) => {
            return (
              <li className={styles.listItem} key={index}>
                <Circle letter={`${item}`} /> {index}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
