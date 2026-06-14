/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ItemType = "medication" | "supplement" | "food";

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  aliases: string[];
  description?: string; // Short helper description (e.g., "Blood thinner", "Calming herb")
}

export interface Interaction {
  a: string; // Item ID A
  b: string; // Item ID B
  severity: 1 | 2 | 3; // 3 = Severe, 2 = Moderate, 1 = Minor
  what: string; // Plain-language explanation of what happens and why
  advice: string; // Practical "what to do" note
  source?: string; // Type of source (e.g., "Drug labeling & clinical pharmacology references")
}

export interface CheckedPairResult {
  itemA: Item;
  itemB: Item;
  interaction?: Interaction; // If undefined, there is no known interaction in the demo dataset
  isFlagged: boolean;
}

export interface AnalysisSummary {
  checkedItemsCount: number;
  checkedPairsCount: number;
  severeCount: number;
  moderateCount: number;
  minorCount: number;
  noInteractionCount: number;
}
