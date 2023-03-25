import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { IItemArray } from "../../types/utils";
import { reverseArray } from "./utils";
import { ElementStates } from "../../types/element-states";


export const StringComponent: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<Array<IItemArray>>([]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true);
    setInputValue(
      e.currentTarget.value.split("").map((item: string) => {
        return {
          item,
          state: ElementStates.Default,
        };
      })
    );
  };

  const handlerClick = async () => {
    setLoader(true);
    await reverseArray(inputValue, setInputValue);
    setLoader(false);
  };
  console.log(inputValue);
  

  return (
    <SolutionLayout title="Строка">
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
        {inputValue?.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={`${item.item}`} state={item.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
