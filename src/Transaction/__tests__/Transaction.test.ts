import Transaction from '../Transaction';

describe('Transaction', () => {
    const mockAmount = 555;
    const mockSender = 'mockSender';
    const mockRecipient = 'mockRecipient';

    describe('constructor', () => {
        it('should return an object with the expected properties', () => {
            const newTransaction = new Transaction(
                mockAmount,
                mockSender,
                mockRecipient,
            );

            expect(newTransaction.amount).toBe(mockAmount);
            expect(newTransaction.sender).toBe(mockSender);
            expect(newTransaction.recipient).toBe(mockRecipient);
        });
    });
});
