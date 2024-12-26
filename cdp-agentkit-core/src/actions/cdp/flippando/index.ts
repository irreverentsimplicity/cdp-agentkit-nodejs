import { FlippandoAction, FlippandoActionSchemaAny } from "./flippando_action";
import { FlippandoCreateGameAction } from "./actions/create_game";
import { FlippandoInitializeGameAction } from "./actions/initialize_game";
/*
 * import { FlippandoFlipTilesAction } from "./actions/flip_tiles";
 * import { FlippandoMakeArtAction } from "./actions/make_art";
 */

/**
 * Retrieves all Flippando protocol action instances.
 * WARNING: All new FlippandoActions classes must be instantiated here to be discovered.
 *
 * @returns Array of Flipapndo protocol action instances
 */
export function getAllFlippandoActions(): FlippandoAction<FlippandoActionSchemaAny>[] {
  // eslint-disable-next-line prettier/prettier
  return [new FlippandoCreateGameAction(), 
    new FlippandoInitializeGameAction(),
    /*
     * new FlippandoFlipTilesAction(),
     * new FlippandoMakeArtAction(),
     */
  ];
}

export const FLIPPANDO_ACTIONS = getAllFlippandoActions();

// Export individual actions for direct imports
// eslint-disable-next-line prettier/prettier
export { FlippandoCreateGameAction, 
  FlippandoInitializeGameAction,
  /*
   * FlippandoFlipTilesAction,
   * FlippandoMakeArtAction,
   */
};
