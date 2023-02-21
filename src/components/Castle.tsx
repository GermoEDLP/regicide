import { Container, Text, Badge, Grid } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { EnemyType } from "../store/interfaces";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const Castle = () => {
  const { enemies, enemy } = useAppSelector((state) => state.game);
  const { classes } = useStyles(StylesComponent.EnemiesDeck);
  const enemiesCantCards = (Object.keys(enemies) as EnemyType[]).reduce(
    (acc, key: EnemyType) => acc + enemies[key].length,
    0
  );
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" color={"dark"} fw={500} className={classes.text}>
          Castillo
        </Text>
        <Card reverse cant={enemiesCantCards.toString()} />
      </Container>
    </>
  );
};
