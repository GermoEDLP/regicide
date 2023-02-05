import { Container, Text, Badge, Grid } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { EnemyType } from "../store/interfaces";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const EnemiesField = () => {
  const { enemies, enemy } = useAppSelector((state) => state.game);
  const { classes } = useStyles(StylesComponent.EnemiesDeck);
  const enemiesCantCards = (Object.keys(enemies) as EnemyType[]).reduce(
    (acc, key: EnemyType) => acc + enemies[key].length,
    0
  );
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" color={'dimmed'}>Enemigos</Text>
        <Grid>
          <Grid.Col xs={4}>
            <Text align="center">Ataque</Text>
            <Text align="center">{enemy?.tempAttack}</Text>
            <Text align="center">Vida</Text>
            <Text align="center">{enemy?.tempHp}</Text>
          </Grid.Col>
          <Grid.Col xs={4}>
            <Card card={enemy} />
          </Grid.Col>
          <Grid.Col xs={4}>
            <Card reverse />
            <Badge size="sm" mt={5}>
              {enemiesCantCards} carta{enemiesCantCards > 1 ? "s" : null}
            </Badge>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
