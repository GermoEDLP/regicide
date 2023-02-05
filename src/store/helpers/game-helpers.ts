import {
  IconCards,
  IconPlus,
  IconRotate,
  IconShield,
  IconSword,
  TablerIcon,
  IconHeart,
} from "@tabler/icons";
import { HistorialItem } from "../interfaces/game-interfaces";
import {
  AttackResume,
  Card,
  CreateHistoryItem,
  Enemies,
  Enemy,
  EnemyType,
  HistoryAction,
  Suit,
} from "../interfaces";

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
};

export const stole = (
  deck: Card[],
  hand: Card[],
  maxHand: number,
  cant: number
) => {
  const newHand = [...hand];
  for (let i = 0; i < cant; i++) {
    newHand.push(deck.splice(0, 1)[0]);
  }
  return newHand.splice(0, maxHand);
};

export const cure = (discard: Card[], deck: Card[], cant: number) => {
  // saca del descarte y lo pone en el fondo del mazo. El descarte puede no tener suficientes cartas
  const newDeck = [...deck];
  for (let i = 0; i < cant; i++) {
    newDeck.push(discard.splice(0, 1)[0]);
  }
  return newDeck;
};

export const calculateAttack = (field: Card[]): AttackResume => {
  const cards = field.filter((c) => !c.used);
  const suits: Partial<Suit[]> = [];
  const attackSum = cards.reduce((acc, c) => {
    if (!suits.includes(c.suit)) suits.push(c.suit);
    return acc + c.value;
  }, 0);
  const attack = suits.includes(Suit.clubs) ? attackSum * 2 : attackSum;
  return { attack, suits, cards };
};

export const incrementStage = (stage: number) => {
  return stage === 4 ? 1 : stage + 1;
};

export const asignEnemy = (enemies: Enemies): Enemy => {
  const enemyFigure =
    enemies.J.length > 0
      ? EnemyType.J
      : enemies.Q.length > 0
      ? EnemyType.Q
      : EnemyType.K;
  const enemy = enemies[enemyFigure].splice(0, 1)[0];
  return { ...enemy, tempAttack: enemy.attack, tempHp: enemy.hp };
};

export const ActionIcon: Record<HistoryAction, TablerIcon> = {
  play: IconCards,
  attack: IconSword,
  defend: IconShield,
  cure: IconHeart,
  stole: IconPlus,
  mix: IconRotate,
};

export const createHistoryItem = (
  action: string,
  icon: HistoryAction
): HistorialItem => {
  return {
    action,
    icon: ActionIcon[icon],
  };
};
