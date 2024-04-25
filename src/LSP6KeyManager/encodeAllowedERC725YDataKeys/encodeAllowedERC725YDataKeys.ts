import { BytesLike, isHexString, toBeHex } from 'ethers';

/**
 * Enocde a list of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`. The result can be user for `AddressPermissions:AllowedERC725YDataKeys:<address>`
 *
 * @since v0.0.1
 * @category LSP6
 * @param dataKeys A list of data keys.
 *
 * @throws
 * - When one of `dataKeys[index]` is not hex.
 * - When one of `dataKeys[index]` has a length of 0 bytes or bigger thsn 32 bytes.
 *
 * @return The compacted array of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```ts
 * encodeAllowedERC725YDataKeys([
 *   "0xcafe",
 *   "0xbeefdeadbeef0000cafe"
 * ]) => "0x0002cafe000abeefdeadbeef0000cafe"
 * ```
 */
export const encodeAllowedERC725YDataKeys = (dataKeys: BytesLike[]) => {
    let compactedBytes = '0x';

    for (let i = 0; i < dataKeys.length; i++) {
        const dataKey = dataKeys[i];

        if (!isHexString(dataKey)) {
            throw new Error(`Data key is not hex. Value: '${dataKey}'`);
        }

        const strippedDataKey = dataKey.replace('0x', '');

        if (strippedDataKey.length === 0 || strippedDataKey.length > 64) {
            throw new Error(
                `Invalid length. Length: '${
                    strippedDataKey.length / 2
                }'. Must be bigger than 0 and smaller than 32.`,
            );
        }

        compactedBytes += toBeHex(strippedDataKey.length / 2, 2).substring(2) + strippedDataKey;
    }

    return compactedBytes;
};
