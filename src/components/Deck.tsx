import { Container, createStyles, Text, Badge } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";

export const Deck = () => {
  const { deck } = useAppSelector((state) => state.game);
  const { classes } = createStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  }))();
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Mazo</Text>
        <Card reverse/>
        <Badge size="sm" mt={5}>
          {deck.length} carta{deck.length > 1 ? "s" : null}
        </Badge>
      </Container>
    </>
  );
};
