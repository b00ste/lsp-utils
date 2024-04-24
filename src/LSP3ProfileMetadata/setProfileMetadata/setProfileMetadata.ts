import { BytesLike, Signer, Wallet } from 'ethers';
import { LSP3ProfileMetadataJSON } from '@lukso/lsp-smart-contracts';
import { ERC725Y } from '../../typechain/erc725';
import { getErc725yContract } from '../../helpers';

import ERC725 from '@erc725/erc725.js';
import LSP3Schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import { validateJson } from '../../helpers/validateJson';

const erc725 = new ERC725(LSP3Schema);

/**
 * Set Profile metadata.
 *
 * @category LSP3
 *
 * @param erc725y The address of the Profile to set the metadata for.
 * @param json The JSON file content hosted at `url`.
 * @param url The URL where the JSON file is hosted.
 * @param signer The ethers `Signer`, address that is allowed to modify the Profile metadata.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```ts
 * setProfileMetadata(
 *   "0x..."
 *   {
 *     LSP3Profile: {
 *       "name": "Tom",
 *       "description": "Some random description about Tom"
 *     }
 *   },
 *   "https://google.com/",
 *   signer
 * )
 * ```
 */
export async function setProfileMetadata(
    erc725y: ERC725Y | BytesLike,
    json: LSP3ProfileMetadataJSON,
    url: string,
    signer?: Signer | Wallet,
): Promise<void> {
    const erc725yContract: ERC725Y = signer
        ? await getErc725yContract(erc725y, signer)
        : await getErc725yContract(erc725y);

    const validatedJson = validateJson(json);

    const {
        keys: [dataKey],
        values: [dataValue],
    } = erc725.encodeData([
        {
            keyName: 'LSP3Profile',
            value: {
                url,
                json: validatedJson,
            },
        },
    ]);

    await erc725yContract.setData(dataKey, dataValue);
}
