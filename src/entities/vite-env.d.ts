/// <reference types="vite/client" />

// ##### Types #####

export type IAChoice = string

export type RoundResult = (a: string, b: string) => Result

export type IncreaseScore = (a: string) => void

// ##### Enums #####

export const enum Result {
    Win = "win",
    Lose = "lose",
    Draw = "draw"
}