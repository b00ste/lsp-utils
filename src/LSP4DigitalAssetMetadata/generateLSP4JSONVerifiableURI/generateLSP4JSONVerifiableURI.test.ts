import { expect } from 'chai';
import { keccak256, toUtf8Bytes, hexlify } from 'ethers';
import { Link, Attribute, HashBasedVerification } from '../../types/index';
import { generateLSP4JSONVerifiableURI } from './generateLSP4JSONVerifiableURI';

describe('generateLSP4JSONVerifiableURI', () => {
    it('should generate correct verifiable URI with basic fields', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [{ title: 'Website', url: 'https://example.com' }];
        const attributes: Attribute[] = [{ key: 'trait', value: 'rare', type: 'string' }];
        const icons = { icons: [], lsp7icons: [], lsp8icons: [] };
        const images = { imageFields: [] };
        const assets = { assets: [], lsp7assets: [], lsp8assets: [] };

        const json = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [{ title: 'Website', url: 'https://example.com' }],
                icon: [],
                images: [],
                assets: [],
                attributes: [{ key: 'trait', value: 'rare', type: 'string' }],
            },
        });
        const hash = keccak256(Buffer.from(json)).slice(2);
        const base64Json = Buffer.from(json).toString('base64');
        const dataUri = `data:application/json;base64,${base64Json}`;
        const dataUriBytes = hexlify(toUtf8Bytes(dataUri)).slice(2);
        const expectedVerifiableURI = `0x00006f357c6a0020${hash}${dataUriBytes}`;

        const verifiableURI = generateLSP4JSONVerifiableURI(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(verifiableURI).to.equal(expectedVerifiableURI);
    });

    it('should generate correct verifiable URI with complex fields', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [
            { title: 'Website', url: 'https://example.com' },
            { title: 'Twitter', url: 'https://twitter.com/example' },
        ];
        const attributes: Attribute[] = [
            { key: 'trait', value: 'rare', type: 'string' },
            { key: 'level', value: '5', type: 5 },
        ];
        const hashVerification: HashBasedVerification = {
            method: 'keccak256(bytes)',
            data: '0x1234567890abcdef',
        };
        const icons = {
            icons: [
                {
                    width: 200,
                    height: 200,
                    url: 'ipfs://example/icon1.png',
                    verification: hashVerification,
                },
                {
                    width: 400,
                    height: 400,
                    url: 'ipfs://example/icon2.png',
                    verification: hashVerification,
                },
            ],
            lsp7icons: [],
            lsp8icons: [],
        };
        const images = {
            imageFields: [
                {
                    images: [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image1.png',
                            verification: hashVerification,
                        },
                        {
                            width: 800,
                            height: 600,
                            url: 'ipfs://example/image2.png',
                            verification: hashVerification,
                        },
                    ],
                    lsp7images: [{ address: '0x1234567890abcdef' }],
                    lsp8images: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
                },
            ],
        };
        const assets = {
            assets: [
                {
                    url: 'ipfs://example/asset1.json',
                    fileType: 'json',
                    verification: hashVerification,
                },
                {
                    url: 'ipfs://example/asset2.png',
                    fileType: 'image/png',
                    verification: hashVerification,
                },
            ],
            lsp7assets: [{ address: '0x1234567890abcdef' }],
            lsp8assets: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
        };

        const json = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [
                    { title: 'Website', url: 'https://example.com' },
                    { title: 'Twitter', url: 'https://twitter.com/example' },
                ],
                icon: [
                    {
                        width: 200,
                        height: 200,
                        url: 'ipfs://example/icon1.png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    {
                        width: 400,
                        height: 400,
                        url: 'ipfs://example/icon2.png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                ],
                images: [
                    [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image1.png',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0x1234567890abcdef',
                            },
                        },
                        {
                            width: 800,
                            height: 600,
                            url: 'ipfs://example/image2.png',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0x1234567890abcdef',
                            },
                        },
                        { address: '0x1234567890abcdef' },
                        { address: '0x0987654321fedcba', tokenId: '0x456' },
                    ],
                ],
                assets: [
                    {
                        url: 'ipfs://example/asset1.json',
                        fileType: 'json',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    {
                        url: 'ipfs://example/asset2.png',
                        fileType: 'image/png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    { address: '0x1234567890abcdef' },
                    { address: '0x0987654321fedcba', tokenId: '0x456' },
                ],
                attributes: [
                    { key: 'trait', value: 'rare', type: 'string' },
                    { key: 'level', value: '5', type: 5 },
                ],
            },
        });
        const hash = keccak256(Buffer.from(json)).slice(2);
        const base64Json = Buffer.from(json).toString('base64');
        const dataUri = `data:application/json;base64,${base64Json}`;
        const dataUriBytes = hexlify(toUtf8Bytes(dataUri)).slice(2);
        const expectedVerifiableURI = `0x00006f357c6a0020${hash}${dataUriBytes}`;

        const verifiableURI = generateLSP4JSONVerifiableURI(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(verifiableURI).to.equal(expectedVerifiableURI);
    });

    it('should generate correct verifiable URI with empty fields', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [];
        const attributes: Attribute[] = [];
        const icons = { icons: [], lsp7icons: [], lsp8icons: [] };
        const images = { imageFields: [] };
        const assets = { assets: [], lsp7assets: [], lsp8assets: [] };

        const json = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [],
                icon: [],
                images: [],
                assets: [],
                attributes: [],
            },
        });
        const hash = keccak256(Buffer.from(json)).slice(2);
        const base64Json = Buffer.from(json).toString('base64');
        const dataUri = `data:application/json;base64,${base64Json}`;
        const dataUriBytes = hexlify(toUtf8Bytes(dataUri)).slice(2);
        const expectedVerifiableURI = `0x00006f357c6a0020${hash}${dataUriBytes}`;

        const verifiableURI = generateLSP4JSONVerifiableURI(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(verifiableURI).to.equal(expectedVerifiableURI);
    });

    it('should generate correct verifiable URI with mixed data types', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [{ title: 'Website', url: 'https://example.com' }];
        const attributes: Attribute[] = [
            { key: 'trait', value: 'rare', type: 'string' },
            { key: 'level', value: '5', type: 5 },
            { key: 'isSpecial', value: 'true', type: true },
        ];
        const hashVerification: HashBasedVerification = {
            method: 'keccak256(bytes)',
            data: '0x1234567890abcdef',
        };
        const icons = {
            icons: [
                {
                    width: 200,
                    height: 200,
                    url: 'ipfs://example/icon.png',
                    verification: hashVerification,
                },
            ],
            lsp7icons: [],
            lsp8icons: [],
        };
        const images = {
            imageFields: [
                {
                    images: [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image.png',
                            verification: hashVerification,
                        },
                    ],
                    lsp7images: [],
                    lsp8images: [],
                },
            ],
        };
        const assets = {
            assets: [
                {
                    url: 'ipfs://example/asset.json',
                    fileType: 'json',
                    verification: hashVerification,
                },
            ],
            lsp7assets: [],
            lsp8assets: [],
        };

        const json = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [{ title: 'Website', url: 'https://example.com' }],
                icon: [
                    {
                        width: 200,
                        height: 200,
                        url: 'ipfs://example/icon.png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                ],
                images: [
                    [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image.png',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0x1234567890abcdef',
                            },
                        },
                    ],
                ],
                assets: [
                    {
                        url: 'ipfs://example/asset.json',
                        fileType: 'json',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                ],
                attributes: [
                    { key: 'trait', value: 'rare', type: 'string' },
                    { key: 'level', value: '5', type: 5 },
                    { key: 'isSpecial', value: 'true', type: true },
                ],
            },
        });
        const hash = keccak256(Buffer.from(json)).slice(2);
        const base64Json = Buffer.from(json).toString('base64');
        const dataUri = `data:application/json;base64,${base64Json}`;
        const dataUriBytes = hexlify(toUtf8Bytes(dataUri)).slice(2);
        const expectedVerifiableURI = `0x00006f357c6a0020${hash}${dataUriBytes}`;

        const verifiableURI = generateLSP4JSONVerifiableURI(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(verifiableURI).to.equal(expectedVerifiableURI);
    });

    it('should generate correct verifiable URI with large data', () => {
        const name = 'Test NFT';
        const description =
            'This is a very long description for testing purposes. It should be long enough to ensure that the function can handle large data inputs.';
        const links: Link[] = [
            { title: 'Website', url: 'https://example.com' },
            { title: 'Twitter', url: 'https://twitter.com/example' },
            { title: 'Discord', url: 'https://discord.gg/example' },
        ];
        const attributes: Attribute[] = [
            { key: 'trait', value: 'rare', type: 'string' },
            { key: 'level', value: '10', type: 10 },
            { key: 'isSpecial', value: 'true', type: true },
            {
                key: 'description',
                value: 'This is a very long attribute value for testing purposes.',
                type: 'string',
            },
        ];
        const hashVerification: HashBasedVerification = {
            method: 'keccak256(bytes)',
            data: '0x1234567890abcdef',
        };
        const icons = {
            icons: [
                {
                    width: 200,
                    height: 200,
                    url: 'ipfs://example/icon1.png',
                    verification: hashVerification,
                },
                {
                    width: 400,
                    height: 400,
                    url: 'ipfs://example/icon2.png',
                    verification: hashVerification,
                },
            ],
            lsp7icons: [],
            lsp8icons: [],
        };
        const images = {
            imageFields: [
                {
                    images: [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image1.png',
                            verification: hashVerification,
                        },
                        {
                            width: 800,
                            height: 600,
                            url: 'ipfs://example/image2.png',
                            verification: hashVerification,
                        },
                    ],
                    lsp7images: [{ address: '0x1234567890abcdef' }],
                    lsp8images: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
                },
            ],
        };
        const assets = {
            assets: [
                {
                    url: 'ipfs://example/asset1.json',
                    fileType: 'json',
                    verification: hashVerification,
                },
                {
                    url: 'ipfs://example/asset2.png',
                    fileType: 'image/png',
                    verification: hashVerification,
                },
            ],
            lsp7assets: [{ address: '0x1234567890abcdef' }],
            lsp8assets: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
        };

        const json = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links,
                icon: [
                    {
                        width: 200,
                        height: 200,
                        url: 'ipfs://example/icon1.png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    {
                        width: 400,
                        height: 400,
                        url: 'ipfs://example/icon2.png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                ],
                images: [
                    [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://example/image1.png',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0x1234567890abcdef',
                            },
                        },
                        {
                            width: 800,
                            height: 600,
                            url: 'ipfs://example/image2.png',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0x1234567890abcdef',
                            },
                        },
                        { address: '0x1234567890abcdef' },
                        { address: '0x0987654321fedcba', tokenId: '0x456' },
                    ],
                ],
                assets: [
                    {
                        url: 'ipfs://example/asset1.json',
                        fileType: 'json',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    {
                        url: 'ipfs://example/asset2.png',
                        fileType: 'image/png',
                        verification: { method: 'keccak256(bytes)', data: '0x1234567890abcdef' },
                    },
                    { address: '0x1234567890abcdef' },
                    { address: '0x0987654321fedcba', tokenId: '0x456' },
                ],
                attributes,
            },
        });
        const hash = keccak256(Buffer.from(json)).slice(2);
        const base64Json = Buffer.from(json).toString('base64');
        const dataUri = `data:application/json;base64,${base64Json}`;
        const dataUriBytes = hexlify(toUtf8Bytes(dataUri)).slice(2);
        const expectedVerifiableURI = `0x00006f357c6a0020${hash}${dataUriBytes}`;

        const verifiableURI = generateLSP4JSONVerifiableURI(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(verifiableURI).to.equal(expectedVerifiableURI);
    });
});
