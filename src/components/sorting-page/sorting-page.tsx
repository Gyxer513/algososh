import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { IItemArray } from "../../types/utils";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { getRandomArray } from "./utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { bubbleSort, selectSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [radioValue, setRadioValue] = React.useState("Select");
  const [sortMethod, setSortMethod] = React.useState<Direction>();
  const [array, setArray] = React.useState<Array<IItemArray>>([]);
  const generateArray = () => {
    setArray(
      getRandomArray().map((item: number) => {
        return {
          item,
          state: ElementStates.Default,
        };
      })
    );
  };
  React.useEffect(() => {
    generateArray();
  }, []);

  const handleSortingMethod = async (sortMethod: Direction) => {
    setLoader(true);
    setDisabled(true);
    setSortMethod(sortMethod);
    if (radioValue === "Select") {
      await selectSort(array, sortMethod, setArray);
    } else {
      await bubbleSort(array, sortMethod, setArray);
    }
    setLoader(false);
    setDisabled(false);
  };

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.sortContainer}>
        <RadioInput
          label="Выбор"
          name="radioButton"
          value="Select"
          checked={radioValue === "Select"}
          onChange={OnChange}
        />
        <RadioInput
          label="Пузырёк"
          name="radioButton"
          value="Bubble"
          checked={radioValue === "Bubble"}
          onChange={OnChange}
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          isLoader={loader && sortMethod === Direction.Ascending}
          onClick={() => handleSortingMethod(Direction.Ascending)}
          disabled={loader}
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          isLoader={loader && sortMethod === Direction.Descending}
          disabled={loader}
          onClick={() => handleSortingMethod(Direction.Descending)}
        />
        <Button
          text="Новый массив"
          onClick={generateArray}
          disabled={disabled}
        />
      </section>
      <div className={styles.columnBox}>
        {array &&
          array?.map((item, index) => (
            <Column index={+item.item} state={item.state} key={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
