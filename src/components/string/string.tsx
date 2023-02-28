
import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
     <section className={styles.mainBox}>
      <Input maxLength={11} isLimitText={true}>
      </Input>
      <div className={styles.input}></div>
      <Button text="Развернуть">
        
      </Button>
     </section>
    </SolutionLayout>
  );
};
