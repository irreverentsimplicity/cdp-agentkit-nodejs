import { FlippandoAction } from "../flippando_action";
import { Wallet } from "@coinbase/coinbase-sdk";
import { z } from "zod";

const INITIAIZE_GAME_PROMPT = `
This tool will initialize a previously created Flippando game, by invoking the
initializeGame function of the FlippandoGameMaster contract. You will need the gameId argument.
`;

/**
 * Input schema for initialize game action.
 */
export const InitializeGameInput = z
  .object({
    contractAddress: z.string().describe("The address of the FlippandoGameMaster contract"),
    gameId: z.string().describe("The game id"),
  })
  .strip()
  .describe("Instructions for initializing a previously created Flippando game");

/**
 * Create a Flippando game onchain. The game can be starte with the start_game action
 *
 * @param wallet - The wallet to use when creating the game.
 * @param args - The input arguments for the action.
 * @returns A message containing the game initialization details, and a game struct
 */
export async function initializeGame(
  wallet: Wallet,
  args: z.infer<typeof InitializeGameInput>,
): Promise<string> {
  const initializeGameArgs = {
    args,
  };

  try {
    const initializeGameInvocation = await wallet.invokeContract({
      contractAddress: args.contractAddress,
      method: "initializeGame",
      args: initializeGameArgs,
    });

    const result = await initializeGameInvocation.wait();

    return `Initialize Flippando game  at contract ${args.contractAddress} with gameId ${args.gameId}  on network ${wallet.getNetworkId()}.\nTransaction hash for the mint: ${result.getTransaction().getTransactionHash()}\nTransaction link for the result: ${result.getTransaction().getTransactionLink()}`;
  } catch (error) {
    return `Error initializing game: ${error}`;
  }
}

/**
 * Initialize Game action.
 */
export class FlippandoInitializeGameAction implements FlippandoAction<typeof InitializeGameInput> {
  public name = "initialize_game";
  public description = INITIAIZE_GAME_PROMPT;
  public argsSchema = InitializeGameInput;
  public func = initializeGame;
}
