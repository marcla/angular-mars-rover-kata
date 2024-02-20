export const COMMANDS = {
  forward: 'f',
  backward: 'b',
  left: 'l',
  right: 'r',
} as const;

type TurnCommandKeys = keyof Pick<typeof COMMANDS, 'left' | 'right'>;
type MoveCommandKeys = keyof Pick<typeof COMMANDS, 'forward' | 'backward'>;

export type TurnCommands = (typeof COMMANDS)[TurnCommandKeys];
export type MoveCommands = (typeof COMMANDS)[MoveCommandKeys];
