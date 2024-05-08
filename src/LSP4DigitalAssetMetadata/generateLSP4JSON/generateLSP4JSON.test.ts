import { expect } from 'chai';
import { Link, Attribute } from '../../types/index';
import { generateLSP4JSON } from './generateLSP4JSON';

describe('generateLSP4JSON', () => {
    it('should generate correct LSP4 JSON with basic fields', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [{ title: 'Website', url: 'https://example.com' }];
        const attributes: Attribute[] = [{ key: 'trait', value: 'rare', type: 'string' }];
        const icons = { icons: [], lsp7icons: [], lsp8icons: [] };
        const images = { imageFields: [] };
        const assets = { assets: [], lsp7assets: [], lsp8assets: [] };

        const expectedJSON = JSON.stringify({
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

        const result = generateLSP4JSON(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(result).to.equal(expectedJSON);
    });

    it('should generate correct LSP4 JSON with image and asset fields', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [];
        const attributes: Attribute[] = [];
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

        const expectedJSON = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [],
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
                attributes: [],
            },
        });

        const result = generateLSP4JSON(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(result).to.equal(expectedJSON);
    });

    it('should generate correct LSP4 JSON with LSP7 and LSP8 assets', () => {
        const name = 'Test NFT';
        const description = 'This is a test NFT collection';
        const links: Link[] = [];
        const attributes: Attribute[] = [];
        const icons = { icons: [], lsp7icons: [], lsp8icons: [] };
        const images = {
            imageFields: [
                {
                    images: [],
                    lsp7images: [{ address: '0x1234567890abcdef' }],
                    lsp8images: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
                },
            ],
        };
        const assets = {
            assets: [],
            lsp7assets: [{ address: '0x1234567890abcdef' }],
            lsp8assets: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
        };

        const expectedJSON = JSON.stringify({
            LSP4Metadata: {
                name,
                description,
                links: [],
                icon: [],
                images: [
                    [
                        { address: '0x1234567890abcdef' },
                        { address: '0x0987654321fedcba', tokenId: '0x456' },
                    ],
                ],
                assets: [
                    { address: '0x1234567890abcdef' },
                    { address: '0x0987654321fedcba', tokenId: '0x456' },
                ],
                attributes: [],
            },
        });

        const result = generateLSP4JSON(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(result).to.equal(expectedJSON);
    });

    it('should generate correct LSP4 JSON with mixed data types', () => {
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

        const expectedJSON = JSON.stringify({
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

        const result = generateLSP4JSON(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(result).to.equal(expectedJSON);
    });

    it('should generate correct LSP4 JSON with multiple entries', () => {
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

        const expectedJSON = JSON.stringify({
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

        const result = generateLSP4JSON(
            name,
            description,
            links,
            attributes,
            icons,
            images,
            assets,
        );
        expect(result).to.equal(expectedJSON);
    });
});
