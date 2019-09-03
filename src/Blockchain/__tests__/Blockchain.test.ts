import Block from '../../Block/';
import Blockchain from '../Blockchain';
import Transaction from '../../Transaction/';

describe('Blockchain', () => {
    const mockHash = 'mockHash';
    const mockHashKey = 'mockHashKey';
    const mockIndex = 1;
    const mockNonce = 555;
    const mockPreviousBlockHash = 'mockPreviousBlockHash';
    const mockTimestamp = 333;
    const mockTransactions: Transaction[] = [];

    describe('constructor', () => {
        const mockBlockchain = new Blockchain(
            mockNonce,
            mockPreviousBlockHash,
            mockHash,
        );

        it('should return an object with the expected properties', () => {
            expect(mockBlockchain.chain).toBeInstanceOf(Array);
            expect(mockBlockchain.pendingTransactions).toBeInstanceOf(Array);
            expect(mockBlockchain.createBlock).toBeInstanceOf(Function);
            expect(mockBlockchain.getLastBlock).toBeInstanceOf(Function);
            expect(mockBlockchain.createTransaction).toBeInstanceOf(Function);
        });
    });

    describe('createBlock', () => {
        let blockChain: Blockchain = null;

        beforeEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        afterEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        describe('when there is one block in blockChain.chain', () => {
                it('should not throw an error', () => {
                    expect(() => blockChain.createBlock(
                        mockNonce,
                        mockHash,
                        mockPreviousBlockHash,
                    )).not.toThrow();
                });

                it('should increase blockChain.chain.length by 1', () => {
                    expect(blockChain.chain).toHaveLength(1);

                    blockChain.createBlock(
                        mockNonce,
                        mockPreviousBlockHash,
                        mockHash,
                    );

                    expect(blockChain.chain).toHaveLength(2);
                });

                it('should return a new block with an index equal to blockChain.chain.length - 1', () => {
                    const newBlock = blockChain.createBlock(
                        mockNonce,
                        mockPreviousBlockHash,
                        mockHash,
                    );

                    expect(newBlock.index).toBe(blockChain.chain.length - 1);
                });

                it('should return the new block added to the chain', () => {
                    const newBlock = blockChain.createBlock(
                        mockNonce,
                        mockPreviousBlockHash,
                        mockHash,
                    );

                    expect(blockChain.chain[newBlock.index]).toBe(newBlock);
                });

                it('should return a new block with the expected properties', () => {
                    const newBlock = blockChain.createBlock(
                        mockNonce,
                        mockPreviousBlockHash,
                        mockHash,
                    );

                    expect(newBlock.nonce).toBe(mockNonce);
                    expect(newBlock.hash).toBe(mockHash);
                    expect(newBlock.previousBlockHash).toBe(mockPreviousBlockHash);
                });
            });
        });

    describe('getLastBlock', () => {
        let blockChain: Blockchain = null;

        beforeEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        afterEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        describe('when there is only the genesis block in blockChain.chain', () => {
            it('should return the genesis block in blockChain.chain', () => {
                const genesisBlock = blockChain.chain[blockChain.chain.length - 1];

                expect(blockChain.getLastBlock()).toBe(genesisBlock);
            });
        });

        describe('when there are multiple blocks in blockChain.chain', () => {
            it('should return the last block in blockChain.chain', () => {
                const secondBlock = blockChain.createBlock(
                    mockNonce,
                    mockHash,
                    mockPreviousBlockHash,
                );
                const lastBlock = blockChain.createBlock(
                    mockNonce,
                    mockHash,
                    mockPreviousBlockHash,
                );

                expect(blockChain.getLastBlock()).toBe(lastBlock);
            });
        });
    });

    describe('proofOfWork', () => {
        let blockChain: Blockchain = null;

        const mockBlock = new Block(
            mockIndex,
            mockNonce,
            mockHash,
            mockPreviousBlockHash,
            mockTransactions,
            mockTimestamp,
        );

        beforeEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        afterEach(() => {
            blockChain = new Blockchain(
                mockNonce,
                mockPreviousBlockHash,
                mockHash,
            );
        });

        it('should return the expected nonce', () => {
            const expectedNonce = 85835;

            expect(blockChain.proofOfWork(
                mockBlock,
                mockPreviousBlockHash,
                expectedNonce - 1,
            )).toBe(expectedNonce);
        });
    });
});
