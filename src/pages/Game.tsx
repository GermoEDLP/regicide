import { Container, Grid, Skeleton } from "@mantine/core";
import { DiscardDeck } from "../components/DiscardDeck";

const child = <Skeleton height={140} radius="md" animate={false} />;

export const Game = () => {
  return (
    <div className="card m-2">
      <h3>Arena de juego</h3>
      <Container my="md">
        <Grid>
          <Grid.Col xs={3}>{<DiscardDeck />}</Grid.Col>
          <Grid.Col xs={6}>{child}</Grid.Col>
          <Grid.Col xs={3}>{child}</Grid.Col>
          <Grid.Col xs={12}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
