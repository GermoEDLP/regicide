import { Grid, Skeleton } from "@mantine/core";
import { Deck } from "./Deck";
import { DiscardDeck } from "./DiscardDeck";
import { Castle } from "./Castle";
export const Side = () => {
  const side = <Skeleton height={100} animate={false} />;

  return (
    <Grid>
      <Grid.Col xs={12}>{<Castle />}</Grid.Col>
      <Grid.Col xs={12}>{<DiscardDeck />}</Grid.Col>
      <Grid.Col xs={12}>{<Deck />}</Grid.Col>
    </Grid>
  );
};
