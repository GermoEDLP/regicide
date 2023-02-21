import { Badge, Container, Text, createStyles } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const DiscardDeck = () => {
  const { discard } = useAppSelector((state) => state.game);
  const { classes } = useStyles(StylesComponent.DiscardDeck);
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" color={"dark"} fw={500} className={classes.text}>
          Descarte
        </Text>
        <Card card={discard.at(0)} cant={discard.length.toString()} />
      </Container>
    </>
  );
};
