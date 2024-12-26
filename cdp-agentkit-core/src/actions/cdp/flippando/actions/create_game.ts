import { FlippandoAction } from "../flippando_action";
import { Wallet } from "@coinbase/coinbase-sdk";
import { z } from "zod";

const CREATE_GAME_PROMPT = `
This tool will create a Flippando game by invoking the createGame function of the
FlippandoGameMaster contract. This will just create the NFT associated with the game.
actual playing must be done by invoking the initiallize_game action, with the gameId argument.
`;

/**
 * Input schema for create game action.
 */
export const CreateGameInput = z
  .object({
    contractAddress: z.string().describe("The address of the FlippandoGameMaster contract."),
    boardSize: z.string().describe("The size of the board: 16 or 64 tiles"),
    gameType: z.string().describe("The type of game: normal or sponsored"),
    gameTileType: z.string().describe("The type of game tile: square grid, dice, gradient, etc..."),
  })
  .strip()
  .describe("Instructions for creating a Flippando game");

/**
 * Create a Flippando game onchain. The game can be starte with the start_game action
 *
 * @param wallet - The wallet to use when creating the game.
 * @param args - The input arguments for the action.
 * @returns A message containing the game creation details.
 */
export async function createGame(
  wallet: Wallet,
  args: z.infer<typeof CreateGameInput>,
): Promise<string> {
  const createGameArgs = {
    args,
  };

  try {
    const createGameInvocation = await wallet.invokeContract({
      contractAddress: args.contractAddress,
      method: "createGame",
      args: createGameArgs,
    });

    const result = await createGameInvocation.wait();

    return `Create Flippando game  at contract ${args.contractAddress} with gameTyoe ${args.gameType}, gameTileType ${args.gameTileType}, boardSize ${args.boardSize} on network ${wallet.getNetworkId()}.\nTransaction hash for the mint: ${result.getTransaction().getTransactionHash()}\nTransaction link for the result: ${result.getTransaction().getTransactionLink()}`;
  } catch (error) {
    return `Error creating game: ${error}`;
  }
}

/**
 * Create Game action.
 */
export class FlippandoCreateGameAction implements FlippandoAction<typeof CreateGameInput> {
  public name = "create_game";
  public description = CREATE_GAME_PROMPT;
  public argsSchema = CreateGameInput;
  public func = createGame;
}
