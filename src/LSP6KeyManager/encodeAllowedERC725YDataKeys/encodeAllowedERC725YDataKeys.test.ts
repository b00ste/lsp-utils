import { expect } from 'chai';
import { encodeAllowedERC725YDataKeys } from '../..';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

describe('test `encodeAllowedERC725YDataKeys`', () => {
    it('should throw if a passed data key is UTF8', () => {
        const dataKeys = ['data key'];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `Data key is not hex. Value: '${dataKeys[0]}'`,
        );
    });

    it('should throw if a passed data key has 0 bytes', () => {
        const dataKeys = ['0x'];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `Invalid length. Length: '${
                dataKeys[0].length - 2
            }'. Must be bigger than 0 and smaller than 32.`,
        );
    });

    it('should throw if a passed data key has more than 32 bytes', () => {
        const dataKeys = [
            '0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe',
        ];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `Invalid length. Length: '${
                dataKeys[0].length / 2 - 1
            }'. Must be bigger than 0 and smaller than 32.`,
        );
    });

    it('should pass if the passed data keys are valid', () => {
        const dataKeys = [
            ERC725YDataKeys.LSP4['LSP4Creators[]'].index,
            ERC725YDataKeys.LSP4.LSP4CreatorsMap,
            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].index,
            ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap,
        ];

        const encodedAllowedERC725YDataKeys = encodeAllowedERC725YDataKeys(dataKeys);

        expect(encodedAllowedERC725YDataKeys).to.equal(
            '0x0010114bd03b3a46d48759680d81ebb2b414000c6de85eaf5d982b4e5da0000000107c8c3416d6cda87cd42c71ea1843df28000c74ac2555c10b9349e78f0000',
        );
    });
});
