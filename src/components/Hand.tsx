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
  }))();
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Mano</Text>
        <Grid>
          {hand.map((card, i) => (
            <Grid.Col xs={4} key={i}>
              <Card card={card} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};
