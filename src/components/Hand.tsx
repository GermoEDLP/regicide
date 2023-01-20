import { Container, createStyles, Grid, Text } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";

export const Hand = () => {
  const { hand } = useAppSelector((state) => state.game);
  const { classes } = createStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    cards: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    }
  }))();
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Mano</Text>
        <Container className={classes.cards}>
          {hand.map((card, i) => (
              <Card card={card} i={i+1} key={i} hand/>
          ))}
        </Container>
      </Container>
    </>
  );
};
