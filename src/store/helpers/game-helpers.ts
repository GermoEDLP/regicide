import {
  IconCards,
  IconPlus,
  IconRotate,
  IconShield,
  IconSword,
  TablerIcon,
  IconHeart,
  IconClubs,
  IconSpade,
  IconDiamonds,
} from "@tabler/icons";
import { HistorialItem } from "../interfaces/game-interfaces";
import {
  AttackResume,
  Card,
  CreateHistoryItem,
  Enemies,
  Enemy,
  EnemyType,
  HA,
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
  const faltantes = maxHand - hand.length;
  return [...hand, ...deck.splice(0, cant > faltantes ? faltantes : cant)];
};

export const cure = (discard: Card[], deck: Card[], cant: number) => {
  const d = mix(discard);
  const returnDeck = d.splice(0, cant);
  return [...deck, ...returnDeck];
};

export const superCard = (field: Card[], enemy: Enemy | null): AttackResume => {
  const cards = field.filter((c) => !c.used);
  const suits: Partial<Suit[]> = [];
  const attackSum = cards.reduce((acc, c) => {
    if (!suits.includes(c.suit)) suits.push(c.suit);
    return acc + c.value;
  }, 0);
  const attack =
    suits.includes(Suit.clubs) && enemy?.suit !== Suit.clubs
      ? attackSum * 2
      : attackSum;
  return { attack, suits };
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

export const ActionIcon: Record<HA, TablerIcon> = {
  play: IconCards,
  attack: IconSword,
  defend: IconShield,
  cure: IconHeart,
  stole: IconPlus,
  mix: IconRotate,
  spades: IconSpade,
  hearts: IconHeart,
  diamonds: IconDiamonds,
  clubs: IconClubs,
};

export interface HI {
  text: string;
  action: HA;
}

export const HistoryItems: Record<HA, HI> = {
  play: {
    text: "Juega $$ cartas",
    action: HA.play,
  },
  attack: {
    text: "Ataca con $$ cartas",
    action: HA.attack,
  },
  defend: {
    text: "Defiende con $$ cartas",
    action: HA.defend,
  },
  cure: {
    text: "Cura $$ cartas",
    action: HA.cure,
  },
  stole: {
    text: "Roba $$ cartas",
    action: HA.stole,
  },
  mix: {
    text: "Mezcla el mazo",
    action: HA.mix,
  },
  spades: {
    text: "Ataca con espadas",
    action: HA.spades,
  },
  hearts: {
    text: "Ataca con corazones",
    action: HA.hearts,
  },
  diamonds: {
    text: "Ataca con diamantes",
    action: HA.diamonds,
  },
  clubs: {
    text: "Ataca con treboles",
    action: HA.clubs,
  },
};

export const createHistoryItem = (action: string, icon: HA): HistorialItem => {
  return {
    action,
    icon: ActionIcon[icon],
  };
};

export const cIHI = (a: HA, c: number): HistorialItem => {
  return createHistoryItem(HistoryItems[a].text.replace("$$", c.toString()), a);
};
