import { Container, Grid, Skeleton } from "@mantine/core";
import { Deck } from "../components/Deck";
import { DiscardDeck } from "../components/DiscardDeck";
import { EnemiesField } from "../components/EnemiesField";

const child = <Skeleton height={140} radius="md" animate={false} />;

export const Game = () => {
  return (
    <div className="card m-2">
      <h3>Arena de juego</h3>
      <Container my="md">
        <Grid>
          <Grid.Col xs={3}>{<DiscardDeck />}</Grid.Col>
          <Grid.Col xs={6}>{<EnemiesField />}</Grid.Col>
          <Grid.Col xs={3}>{<Deck />}</Grid.Col>
          <Grid.Col xs={12}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
