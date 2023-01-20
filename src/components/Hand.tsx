import { Container, createStyles, Grid, Text } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const Hand = () => {
  const { hand } = useAppSelector((state) => state.game);

  const { classes } = useStyles(StylesComponent.Hand);
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Mano</Text>
        <Container className={classes.cards}>
          {hand.map((card, i) => (
            <Card card={card} i={i + 1} key={i} hand />
          ))}
        </Container>
      </Container>
    </>
  );
};
