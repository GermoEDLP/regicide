import { Container, Grid, Skeleton, Text } from "@mantine/core";
import { Actions } from "../components/Actions";
import { Deck } from "../components/Deck";
import { DiscardDeck } from "../components/DiscardDeck";
import { EnemiesField } from "../components/EnemiesField";
import { Hand } from "../components/Hand";
import { Steps } from "../components/Steps";
import { Table } from "../components/Table";

const child = <Skeleton height={140} radius="md" animate={false} />;

export const Game = () => {
  return (
    <div className="card m-2">
      <Container my="md">
        <Text my={35} size={"lg"}>
          Arena de juego
        </Text>
        <Grid>
          <Grid.Col xs={3}>{<DiscardDeck />}</Grid.Col>
          <Grid.Col xs={6}>{<EnemiesField />}</Grid.Col>
          <Grid.Col xs={3}>{<Deck />}</Grid.Col>
          <Grid.Col xs={12}>{<Table />}</Grid.Col>
          <Grid.Col xs={4}>{<Steps />}</Grid.Col>
          <Grid.Col xs={6}>{<Hand />}</Grid.Col>
          <Grid.Col xs={2}>{<Actions />}</Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
