import { Container, Grid, Skeleton, Text } from "@mantine/core";
import { EnemiesField } from "../components/EnemiesField/EnemiesField";
import { Hand } from "../components/Hand";
import { Side } from "../components/Side";
import { Table } from "../components/Table";
import { History } from "../components/History";
import { Actions } from "../components/Actions";
import fondo from '../assets/images/background_2.png';

export const Game = () => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${fondo})`
      }}
    >
      <Container mt={50} maw={'90vw'}>
        <Grid>
          <Grid.Col xs={2}>{<Side />}</Grid.Col>
          <Grid.Col xs={7}>
            <Grid>
              <Grid.Col xs={12}>{<EnemiesField />}</Grid.Col>
              <Grid.Col xs={12}>{<Table />}</Grid.Col>
              <Grid.Col xs={12}>{<Hand />}</Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Grid.Col xs={12}>{<History />}</Grid.Col>
            <Grid.Col xs={12}>{<Actions />}</Grid.Col>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
