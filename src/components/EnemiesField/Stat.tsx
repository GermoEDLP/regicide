import { StatType } from "../../store/interfaces";
import { Grid } from "@mantine/core";
import { StylesComponent, useStyles } from "../ui/styles";
import { Number, NumberPosition } from "./Number";

export const Stat = ({ type, cant }: { type: StatType; cant: number }) => {
  const { classes } = useStyles(StylesComponent.Stat);
  // extraer las unidades y las decenas de cant
  const unidades = cant % 10;
  const decenas = Math.floor(cant / 10);
  return (
    <Grid>
      <Grid.Col
        span={12}
        className={classes.titleHp}
        hidden={type !== StatType.hp}
      >
        Salud
      </Grid.Col>
      <Grid.Col
        span={12}
        className={classes.titleAttack}
        hidden={type !== StatType.attack}
      >
        Ataque
      </Grid.Col>
      <Grid.Col span={6} hidden={cant < 10} className={classes.leftNumber}>
        <Number number={decenas} position={NumberPosition.left} type={type} />
      </Grid.Col>
      <Grid.Col span={cant < 10 ? 12 : 6} className={classes.rigthNumber}>
        <Number
          number={unidades}
          position={NumberPosition.rigth}
          type={type}
          unique={cant < 10}
        />
      </Grid.Col>
    </Grid>
  );
};
