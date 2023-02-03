import { Container, Text, Grid } from "@mantine/core";
import { StylesComponent, useStyles } from "./ui/styles";
// importar svg desde assets/img/card-play.svg
import card from "../assets/img/card-play.svg";
import suits from "../assets/img/suits.svg";
import enemyAttack from "../assets/img/enemy-attack.svg";
import champAttack from "../assets/img/champ-attack.svg";
import cardSel from "../assets/img/card-play-sel.svg";
import suitsSel from "../assets/img/suits-sel.svg";
import enemyAttackSel from "../assets/img/enemy-attack-sel.svg";
import champAttackSel from "../assets/img/champ-attack-sel.svg";
import { useAppSelector } from "../store/hooks";

export const Steps = () => {
  const { classes } = useStyles(StylesComponent.Steps);
  const { stages } = useAppSelector((state) => state.game);
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" mb={20}>
          Pasos
        </Text>
        <Container>
          <Grid>
            <Grid.Col xs={3}>
              <img
                src={stages === 1 ? cardSel : card}
                className={classes.icons}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <img
                src={stages === 2 ? suitsSel : suits}
                className={classes.icons}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <img
                src={stages === 3 ? champAttackSel : champAttack}
                className={classes.icons}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <img
                src={stages === 4 ? enemyAttackSel : enemyAttack}
                className={classes.icons}
              />
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
};
