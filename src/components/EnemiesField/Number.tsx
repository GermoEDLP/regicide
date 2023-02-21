import rojas from "../../assets/images/number_1.png";
import negras from "../../assets/images/number_2.png";
import { StylesComponent, useStyles } from "../ui/styles";
import { StatType } from "../../store/interfaces/game-interfaces";

export enum NumberPosition {
  left = "left",
  rigth = "rigth",
}

export const Number = ({
  number,
  position,
  type,
  unique,
}: {
  number: number;
  position: NumberPosition;
  type: StatType;
  unique?: boolean;
}) => {
  const { classes } = useStyles(StylesComponent.Number);
  const num_1 = number < 5 ? `-${number}00%` : `-${number-5}00%`;
  const num_2 = number < 5 ? "0%" : "-100%";
  return (
    <div
      className={
        position === NumberPosition.left
          ? classes.left
          : unique
          ? classes.center
          : ""
      }
    >
      <div
        style={{
          backgroundImage: `url(${type === StatType.hp ? rojas : negras})`,
          backgroundPosition: `${num_1} ${num_2}`,
        }}
        className={classes.image}
      ></div>
    </div>
  );
};
