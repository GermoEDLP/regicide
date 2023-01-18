import { deck, enemies } from "../../data/cards";

export interface GameState {
  deck: Card[];
  discard: Card[];
  hand: Card[];
  field: Card[];
  enemies: Record<EnemyType, Card[]>;
  enemy: Card | null;
  stages: number;
  round: number;
  lastPlayed: Card[];
  multiple: boolean;
  players: number;
  maxHand: number;
  error: Error | null;
}

export type EnemyType = "J" | "Q" | "K";

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
  discard: [
    {
      name: "2",
      value: 2,
      suit: "clubs",
      hp: 2,
      attack: 2,
      bgp: "0.2% 6.1%",
    },
  ],
  field: [],
  enemies: {
    J: enemies.filter((card) => card.name === "J"),
    Q: enemies.filter((card) => card.name === "Q"),
    K: enemies.filter((card) => card.name === "K"),
  },
  enemy: null,
  stages: 1,
  round: 1,
  lastPlayed: [],
  multiple: false,
  players: 1,
  maxHand: 8,
  error: null,
};

export interface Card {
  name: string;
  value: number;
  suit: Suit;
  hp: number;
  attack: number;
  bgp: string;
}

export type Suit = "hearts" | "diamonds" | "spades" | "clubs" | "joker";
