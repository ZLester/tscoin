import Block from '../Block';
import Transaction from '../../Transaction/';

describe('Block', () => {
    const mockIndex = 111;
    const mockNonce = 333;
    const mockHash = 'mockHash';
    const mockPreviousBlockHash = 'mockPreviousBlockHash';

    const mockAmount = 555;
    const mockSender = 'mockSender';
    const mockRecipient = 'mockRecipient';

    const mockTransactions = [
        new Transaction(
            mockAmount,
            mockSender,
            mockRecipient,
        ),
    ];

    describe('constructor', () => {
        it('should return an object with the expected properties', () => {
            const mockBlock = new Block(
                mockIndex,
                mockNonce,
                mockHash,
                mockPreviousBlockHash,
                mockTransactions,
            );

            expect(mockBlock.index).toBe(mockIndex);
            expect(mockBlock.nonce).toBe(mockNonce);
            expect(mockBlock.hash).toBe(mockHash);
            expect(mockBlock.previousBlockHash).toBe(mockPreviousBlockHash);
            expect(mockBlock.transactions).toBe(mockTransactions);
        });
    });
});
