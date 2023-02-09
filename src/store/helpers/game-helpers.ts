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

export interface HI {
  template: string;
  icon: TablerIcon;
}

export const HIs: Record<HA, HI> = {
  play: {
    template: "Atacas con $$ cartas",
    icon: IconCards,
  },
  attack: {
    template: "Haces $$ puntos de daño",
    icon: IconSword,
  },
  defense: {
    template: "Descarta $$ cartas: $$ de defensa",
    icon: IconShield,
  },
  mix: {
    template: "Mezcla el mazo",
    icon: IconRotate,
  },
  spades: {
    template: "EL enemigo pierde $$ puntos de ataque",
    icon: IconSpade,
  },
  hearts: {
    template: "Te curas $$ cartas",
    icon: IconHeart,
  },
  diamonds: {
    template: "Robas $$ cartas",
    icon: IconDiamonds,
  },
  clubs: {
    template: "El daño total se duplica: $$",
    icon: IconClubs,
  },
  b_spades: {
    template: "Bloqueado por el enemigo",
    icon: IconSpade,
  },
  b_hearts: {
    template: "Bloqueado por el enemigo",
    icon: IconHeart,
  },
  b_diamonds: {
    template: "Bloqueado por el enemigo",
    icon: IconDiamonds,
  },
  b_clubs: {
    template: "Bloqueado por el enemigo",
    icon: IconClubs,
  },
};

export const cIHI = (
  a: HA,
  [...c]: (string | number)[] = []
): HistorialItem => {
  const { template, icon } = HIs[a];
  const text = template.replace(/\$\$/g, () => c.shift()?.toString() || "");
  return {
    text,
    icon,
  };
};
