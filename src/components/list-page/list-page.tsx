import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { list } from "../../utils/list";
import { ElementStates } from "../../types/element-states";
import { Location } from "../../types/utils";
import { timer } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IListElement } from "../../types/utils";
import { MAX_LENGTH } from "../../constants/list";


export const ListPage: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
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
    setLoader(true);

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
    setLoader(false);
  };

  const deleteHead = async () => {
    setLoader(true);
    list.deleteHead();
    setCurrentElement(numbersArray[0].item);
    setCurrentLocation(Location.Bottom);
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
    setLoader(false);
    if (list.toArray().length === 0) {
      setDisabled(true);
    }
  };

  const addTail = async () => {
    setLoader(true);

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
    setLoader(false);
  };

  const deleteTail = async () => {
    setLoader(true);
    list.deleteTail();
    setCurrentElement("DELL");
    setCurrentLocation(Location.Bottom);
    setCurrentIndex(list.toArray().length - 1);
    numbersArray[list.toArray().length] = {
      ...numbersArray[list.toArray().length - 1],
      state: ElementStates.Changing,
    };

    await timer(SHORT_DELAY_IN_MS);

    setNumbersArray(list.toArray());
    numbersArray[0] = {
      ...numbersArray[0],
      state: ElementStates.Modified,
    };
    setLoader(false);
    setCurrentLocation(Location.None);
    if (list.toArray().length === 0) {
      setDisabled(true);
    }
  };
  const showHead = (index: number) => {
    return currentIndex === index && currentLocation === Location.Top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : undefined;
  };

  const showTail = (index: number) => {
    return currentIndex === index && currentLocation === Location.Bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === numbersArray.length - 1 ? (
      "tail"
    ) : undefined;
  };

  const removeByIndex = async () => {
    setDisabled(true);
    setLoader(true);
    list.deleteByIndex(+indexValue);
    setCurrentIndex(+indexValue);
    setCurrentElement("DELL");
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
    setLoader(false);
  };

  const addByIndex = async () => {
    setDisabled(true);
    setLoader(true);
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
    setIndexValue("")
    setDisabled(false);
    setLoader(false);
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
          />
          <Button
            text="Добавить в head"
            onClick={addHead}
            disabled={!inputValue}
            isLoader={loader}
          />
          <Button
            text="Добавить в tail"
            disabled={!inputValue}
            isLoader={loader}
            onClick={addTail}
          />
          <Button
            text="Удалить из head"
            disabled={disabled}
            isLoader={loader}
            onClick={deleteHead}
          />
          <Button
            text="Удалить из tail"
            disabled={disabled}
            isLoader={loader}
            onClick={deleteTail}
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
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button}
            disabled={!indexValue || !inputValue}
            onClick={addByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button}
            disabled={!(numbersArray.length > +indexValue) || indexValue == ""}
            onClick={removeByIndex}
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
