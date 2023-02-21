import { Grid } from "@mantine/core";
import { StatType } from "../../store/interfaces";
import { Enemy } from "./Enemy";
import { Stat } from "./Stat";
import { useAppSelector } from "../../store/hooks";
export const EnemiesField = () => {
  const { enemy } = useAppSelector((state) => state.game);
  return (
    <Grid>
      <Grid.Col span={4}>
        {<Stat type={StatType.hp} cant={enemy?.tempHp || 0} />}
      </Grid.Col>
      <Grid.Col span={4}>{<Enemy />}</Grid.Col>
      <Grid.Col span={4}>
        {<Stat type={StatType.attack} cant={enemy?.tempAttack || 0} />}
      </Grid.Col>
    </Grid>
  );
};
