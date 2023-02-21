import { Container, createStyles, Text, Badge } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const Deck = () => {
  const { deck } = useAppSelector((state) => state.game);
  const { classes } = useStyles(StylesComponent.Deck);
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" color={"dark"} fw={500}className={classes.text}>
          Mazo
        </Text>
        <Card reverse cant={deck.length.toString()} />
      </Container>
    </>
  );
};
