import { deck, enemies } from "../../data/cards";
import { TablerIcon } from "@tabler/icons";

export enum StatType {
  attack = "attack",
  hp = "hp",
  tempAttack = "tempAttack",
  tempHp = "tempHp",
}

export interface GameState {
  deck: Card[];
  discard: Card[];
  hand: Card[];
  field: Card[];
  enemies: Enemies;
  enemy: Enemy | null;
  stages: number;
  round: number;
  lastPlayed: Card[];
  multiple: boolean;
  players: number;
  maxHand: number;
  attackResume: AttackResume | null;
  error: Error | null;
  history: HistorialItem[];
  started: boolean;
}

export type Enemies = Record<EnemyType, Card[]>;

export enum EnemyType {
  J = "J",
  Q = "Q",
  K = "K",
}

export enum CardType {
  A = "A",
}

export interface Error {
  message: string;
  code: number;
}

export enum DeckType {
  deck = "deck",
  discard = "discard",
}

export const initialGameState: GameState = {
  deck,
  hand: [],
  discard: [],
  field: [],
  enemies: {
    J: enemies.filter((card) => card.name === EnemyType.J),
    Q: enemies.filter((card) => card.name === EnemyType.Q),
    K: enemies.filter((card) => card.name === EnemyType.K),
  },
  enemy: null,
  stages: 1,
  round: 1,
  lastPlayed: [],
  multiple: false,
  players: 1,
  maxHand: 8,
  error: null,
  attackResume: null,
  history: [],
  started: false,
};

export interface Card {
  name: string;
  value: number;
  suit: string | Suit;
  hp: number;
  attack: number;
  bgp: string;
  select: boolean;
  disabled: boolean;
  used: boolean;
}

export interface Enemy extends Card {
  tempAttack: number;
  tempHp: number;
}

export enum Suit {
  hearts = "hearts",
  diamonds = "diamonds",
  clubs = "clubs",
  spades = "spades",
  joker = "joker",
}

export interface AttackResume {
  attack: number;
  suits: Partial<Suit[] | string[]>;
}

export interface HistorialItem {
  text: string;
  icon: TablerIcon;
}

export interface CreateHistoryItem {
  text: string;
  action: HA;
}

export enum HA {
  play = "play",
  attack = "attack",
  mix = "mix",
  defense = "defense",
  spades = "spades",
  hearts = "hearts",
  diamonds = "diamonds",
  clubs = "clubs",
  b_spades = "b_spades",
  b_hearts = "b_hearts",
  b_diamonds = "b_diamonds",
  b_clubs = "b_clubs",
}
