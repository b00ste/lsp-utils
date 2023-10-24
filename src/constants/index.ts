import { BytesLike } from 'ethers';
import { PERMISSIONS } from '@lukso/lsp-smart-contracts';

// generate types from PERMISSIONS imported from `@lukso/lsp-smart-contracts`
export type LSP6PermissionName = keyof typeof PERMISSIONS;
export type LSP6Permission = (typeof PERMISSIONS)[LSP6PermissionName];

export interface LSP3ProfileMetadata {
    LSP3Profile: {
        description: string;
        links: string[];
        name: string;
        tags: string[];
        profileImage?: {
            width: number;
            height: number;
            hashFunction: string;
            hash: string;
            url: string;
        }[];
        backgroundImage?: {
            width: number;
            height: number;
            hashFunction: string;
            hash: string;
            url: string;
        }[];
    };
}

export type Issuer = { address: BytesLike; interfaceId: BytesLike };

export const defaultLSP3ProfileMetadata: LSP3ProfileMetadata = {
    LSP3Profile: {
        description: '',
        links: [],
        name: '',
        tags: [],
    },
};

export const defaultIpfsGateway = 'https://2eff.lukso.dev/ipfs/';
