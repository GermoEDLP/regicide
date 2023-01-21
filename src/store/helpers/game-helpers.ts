import { Card, EnemyType } from "../interfaces";

export const mixEnemies = (
  enemies: Record<EnemyType, Card[]>
): Record<EnemyType, Card[]> => {
  enemies.J = enemies.J.sort(() => Math.random() - 0.5);
  enemies.Q = enemies.Q.sort(() => Math.random() - 0.5);
  enemies.K = enemies.K.sort(() => Math.random() - 0.5);
  return enemies;
};

export const mix = (deck: Card[]): Card[] => {
  return deck.sort(() => Math.random() - 0.5);
}
