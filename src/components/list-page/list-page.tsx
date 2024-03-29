import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { list } from "./utils";
import { ElementStates } from "../../types/element-states";
import { Location } from "../../types/utils";
import { timer } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IListElement } from "../../types/utils";
import { MAX_LENGTH } from "../../constants/list";
import { TAIL, HEAD } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [activeBtn, setActiveBtn] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [indexValue, setIndexValue] = React.useState<string>("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentElement, setCurrentElement] = React.useState<string>("");
  const [currentLocation, setCurrentLocation] = React.useState<Location>();
  const [numbersArray, setNumbersArray] = React.useState<Array<IListElement>>(
    list.toArray()
  );

  const handlerChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlerChangeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    setIndexValue(e.currentTarget.value);
  };

  const addHead = async () => {
    setActiveBtn("add");

    list.prepend(inputValue);
    setCurrentElement(inputValue);
    setCurrentIndex(0);
    setCurrentLocation(Location.Top);
    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Changing,
    };

    await timer(SHORT_DELAY_IN_MS);

    setNumbersArray(list.toArray());
    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Modified,
    };
    setCurrentLocation(Location.None);
    setInputValue("");
    setActiveBtn("");
  };

  const deleteHead = async () => {
    setActiveBtn("delHead");

    setCurrentElement(list.toArray()[0].item);
    setCurrentIndex(0);
    setCurrentLocation(Location.Bottom);
    numbersArray[0] = {
      ...numbersArray[list.toArray().length + 1],
      state: ElementStates.Changing,
    };
    list.deleteHead();
    await timer(SHORT_DELAY_IN_MS);

    setNumbersArray(list.toArray());
    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Modified,
    };

    setCurrentLocation(Location.None);

    if (list.toArray().length === 0) {
      setDisabled(true);
    }
    setActiveBtn("");
  };

  const addTail = async () => {
    setActiveBtn("addTail");

    setCurrentElement(inputValue);
    setCurrentIndex(list.toArray().length);
    setCurrentLocation(Location.Top);
    numbersArray[list.toArray().length] = {
      ...numbersArray[list.toArray().length],
      state: ElementStates.Changing,
    };
    list.append(inputValue);
    await timer(SHORT_DELAY_IN_MS);

    setNumbersArray(list.toArray());
    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Modified,
    };
    setCurrentLocation(Location.None);
    setInputValue("");
    setActiveBtn("");
  };

  const deleteTail = async () => {
    setActiveBtn("delTail");
    list.deleteTail();
    setCurrentElement(numbersArray[list.toArray().length].item);
    setCurrentLocation(Location.Bottom);
    setCurrentIndex(list.toArray().length);
    numbersArray[list.toArray().length] = {
      ...numbersArray[list.toArray().length + 1],
      state: ElementStates.Changing,
    };

    await timer(SHORT_DELAY_IN_MS);
    setNumbersArray(list.toArray());

    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Modified,
    };
    setActiveBtn("");
    setCurrentLocation(Location.None);
    if (list.toArray().length === 0) {
      setDisabled(true);
    }
  };
  const showHead = (index: number) => {
    return currentIndex === index && currentLocation === Location.Top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      HEAD
    ) : undefined;
  };

  const showTail = (index: number) => {
    return currentIndex === index && currentLocation === Location.Bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === numbersArray.length - 1 ? (
      TAIL
    ) : undefined;
  };

  const removeByIndex = async () => {
    setDisabled(true);
    setActiveBtn("delByInd");
    for (let i = 0; i <= +indexValue; i++) {
      numbersArray[i] = {
        ...numbersArray[i],
        state: ElementStates.Changing,
      };
      setNumbersArray([...numbersArray]);
      await timer(SHORT_DELAY_IN_MS);
    }
    list.deleteByIndex(+indexValue);
    setCurrentIndex(+indexValue);
    setCurrentElement(numbersArray[+indexValue].item);
    setCurrentLocation(Location.Bottom);
    numbersArray[+indexValue] = {
      ...numbersArray[+indexValue],
      state: ElementStates.Changing,
    };
    await timer(SHORT_DELAY_IN_MS);
    numbersArray[+indexValue] = {
      ...numbersArray[+indexValue],
      state: ElementStates.Default,
    };
    setNumbersArray(list.toArray());
    setCurrentLocation(Location.None);
    setDisabled(false);
    setActiveBtn("");
  };

  const addByIndex = async () => {
    setDisabled(true);
    setActiveBtn("delByInd");
    for (let i = 0; i <= +indexValue; i++) {
      numbersArray[i] = {
        ...numbersArray[i],
        state: ElementStates.Changing,
      };
      setNumbersArray([...numbersArray]);
      await timer(SHORT_DELAY_IN_MS);
    }
    await timer(SHORT_DELAY_IN_MS);
    list.addByIndex(inputValue, +indexValue);
    setCurrentElement(inputValue);
    setCurrentIndex(+indexValue);
    setCurrentLocation(Location.Top);
    numbersArray[+indexValue] = {
      ...numbersArray[+indexValue],
      state: ElementStates.Changing,
    };
    await timer(SHORT_DELAY_IN_MS);
    numbersArray[+indexValue] = {
      ...numbersArray[+indexValue],
      state: ElementStates.Default,
    };
    setNumbersArray(list.toArray());
    setCurrentLocation(Location.None);
    setIndexValue("");
    setDisabled(false);
    setActiveBtn("");
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
            maxLength={MAX_LENGTH}
            placeholder={"Введите значение"}
            data-cy="value-input"
          />
          <Button
            text="Добавить в head"
            onClick={addHead}
            disabled={!inputValue}
            isLoader={activeBtn === "add"}
            data-cy="button-add-head"
          />
          <Button
            text="Добавить в tail"
            disabled={!inputValue}
            isLoader={activeBtn === "addTail"}
            onClick={addTail}
            data-cy="button-add-tail"
          />
          <Button
            text="Удалить из head"
            disabled={disabled}
            isLoader={activeBtn === "delHead"}
            onClick={deleteHead}
            data-cy="button-delete-head"
          />
          <Button
            text="Удалить из tail"
            disabled={disabled}
            isLoader={activeBtn === "delTail"}
            onClick={deleteTail}
            data-cy="button-delete-tail"
          />
        </div>
        <div className={styles.listContainer}>
          <Input
            onChange={handlerChangeIndex}
            extraClass={styles.input}
            type="number"
            min="0"
            max={numbersArray.length - 1}
            value={indexValue}
            data-cy="index-input"
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button}
            disabled={
              !indexValue ||
              !inputValue ||
              !(numbersArray.length + 1 > +indexValue)
            }
            onClick={addByIndex}
            isLoader={activeBtn === "addByInd"}
            data-cy="button-add-by-index"
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button}
            disabled={!(numbersArray.length > +indexValue) || indexValue === ""}
            onClick={removeByIndex}
            isLoader={activeBtn === "delByInd"}
            data-cy="button-delete-by-index"
          />
        </div>
      </section>
      <ul className={styles.list}>
        {numbersArray &&
          numbersArray?.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <Circle
                  letter={item.item}
                  index={index}
                  state={item.state}
                  head={showHead(index)}
                  tail={showTail(index)}
                />
                {index !== numbersArray?.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
