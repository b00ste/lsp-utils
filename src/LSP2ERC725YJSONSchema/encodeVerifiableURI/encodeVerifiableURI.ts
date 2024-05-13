import { encodeValueContent } from '@erc725/erc725.js';
import { validateJson } from '../../helpers/validateJson/validateJson';

/**
 * Encode a VerifiableURI value content.
 *
 * @category LSP2
 *
 * @param json The JSON file content hosted at `url`.
 * @param url The URL where the JSON file is hosted.
 *
 * @return The encoded value as `VerifiableURI`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * encodeVerifiableURI(
 *   {
 *        "name": "Tom",
 *        "description": "Some random description about Tom"
 *   },
 *   "https://google.com/"
 * ) => "0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f"
 * ```
 */
export const encodeVerifiableURI = (json: object, url: string) => {
    const validatedJson = validateJson(json);

    return encodeValueContent('VerifiableURI', {
        json: validatedJson,
        url,
    });
};
