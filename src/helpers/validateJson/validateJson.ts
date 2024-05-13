/**
 * Verify that the `json` object is a valid JSON
 *
 * @category Helpers
 * @param json JSON file content
 * @returns The `json` object
 */
export const validateJson = (json: object) => {
    if (typeof json !== 'object') {
        throw new Error('`object` is not a valid JSON');
    }

    try {
        const stringifyResult = JSON.stringify(json);
        JSON.parse(stringifyResult);
    } catch (error) {
        throw new Error('`object` is not a valid JSON');
    }

    return json;
};
