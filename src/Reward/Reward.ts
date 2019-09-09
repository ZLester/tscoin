interface RewardI {
    amount: number,
    key: string,
};

class Reward implements RewardI {
    amount: number = 100;
    key: string = 'MINING_REWARD';
}

export default Reward;
