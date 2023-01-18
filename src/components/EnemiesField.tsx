import { Container, createStyles, Text, Badge, Grid } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { EnemyType } from "../store/interfaces";
import { Card } from "./Card";

export const EnemiesField = () => {
  const { enemies, enemy } = useAppSelector((state) => state.game);
  const { classes } = createStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  }))();
  const enemiesCantCards = (Object.keys(enemies) as EnemyType[]).reduce(
    (acc, key: EnemyType) => {
      return acc + enemies[key].length;
    },
    0
  );
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Enemigos</Text>
        <Grid>
          <Grid.Col xs={6}>
            <Card card={enemy} />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Card reverse/>
            <Badge size="sm" mt={5}>
              {enemiesCantCards} carta{enemiesCantCards > 1 ? "s" : null}
            </Badge>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
