import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import {
    LeveragedPool,
    TestToken,
    ERC20,
    PoolSwapLibrary,
    PoolCommitter,
    PriceChanger,
} from "../../../typechain"

import { POOL_CODE } from "../../constants"
import {
    deployPoolAndTokenContracts,
    getRandomInt,
    generateRandomAddress,
    createCommit,
    CommitEventArgs,
    timeout,
} from "../../utilities"

chai.use(chaiAsPromised)
const { expect } = chai

const amountCommitted = ethers.utils.parseEther("2000")
const amountMinted = ethers.utils.parseEther("10000")
const feeAddress = generateRandomAddress()
const lastPrice = getRandomInt(99999999, 1)
const updateInterval = 2
const frontRunningInterval = 1 // seconds
const fee = "0x00000000000000000000000000000000"
const leverage = 1

describe("LeveragedPool - executeCommitment:  Multiple commitments", () => {
    let token: TestToken
    let shortToken: ERC20
    let pool: LeveragedPool
    let library: PoolSwapLibrary
    let poolCommiter: PoolCommitter
    let priceChanger: PriceChanger

    describe("Long mint->Long Burn", () => {
        const commits: CommitEventArgs[] | undefined = []
        beforeEach(async () => {
            const result = await deployPoolAndTokenContracts(
                POOL_CODE,
                frontRunningInterval,
                updateInterval,
                fee,
                leverage,
                feeAddress,
                amountMinted
            )
            pool = result.pool
            library = result.library
            token = result.token
            shortToken = result.shortToken
            poolCommiter = result.poolCommiter
            priceChanger = result.priceChanger

            await token.approve(pool.address, amountMinted)

            const commit = await createCommit(
                poolCommiter,
                [2],
                amountCommitted
            )
            await shortToken.approve(pool.address, amountMinted)
            await timeout(2000)
            const signers = await ethers.getSigners()
            await pool.setKeeper(signers[0].address)

            await pool.poolUpkeep(lastPrice, lastPrice + 10)

            commits.push(await createCommit(poolCommiter, [2], amountCommitted))
            commits.push(
                await createCommit(poolCommiter, [3], amountCommitted.div(2))
            )
        })
        it("should reduce the balances of the shadows pools involved", async () => {
            // Short mint and burn pools
            expect(await poolCommiter.shadowPools(commits[0].commitType)).to.eq(
                amountCommitted
            )
            expect(await poolCommiter.shadowPools(commits[1].commitType)).to.eq(
                amountCommitted.div(2)
            )
            await timeout(2000)
            await pool.poolUpkeep(lastPrice, lastPrice + 10)

            expect(await poolCommiter.shadowPools(commits[0].commitType)).to.eq(
                0
            )
            expect(await poolCommiter.shadowPools(commits[1].commitType)).to.eq(
                0
            )
        })
        it("should adjust the balances of the live pools involved", async () => {
            expect(await pool.longBalance()).to.eq(amountCommitted)
            await timeout(2000)
            await pool.poolUpkeep(lastPrice, lastPrice + 10)

            expect(await pool.longBalance()).to.eq(
                amountCommitted.add(amountCommitted.div(2))
            )
        })
    })
    describe("Short mint->short burn", () => {
        const commits: CommitEventArgs[] | undefined = []
        beforeEach(async () => {
            const result = await deployPoolAndTokenContracts(
                POOL_CODE,
                frontRunningInterval,
                updateInterval,
                fee,
                leverage,
                feeAddress,
                amountMinted
            )
            pool = result.pool
            library = result.library
            token = result.token
            shortToken = result.shortToken
            poolCommiter = result.poolCommiter
            priceChanger = result.priceChanger
            await pool.setKeeper(result.signers[0].address)

            await token.approve(pool.address, amountMinted)

            const commit = await createCommit(
                poolCommiter,
                [0],
                amountCommitted
            )

            await shortToken.approve(pool.address, amountMinted)
            await timeout(2000)

            await pool.poolUpkeep(lastPrice, 10)

            commits.push(await createCommit(poolCommiter, [0], amountCommitted))
            commits.push(
                await createCommit(poolCommiter, [1], amountCommitted.div(2))
            )
        })
        it("should reduce the balances of the shadows pools involved", async () => {
            // Short mint and burn pools
            expect(await poolCommiter.shadowPools(commits[0].commitType)).to.eq(
                amountCommitted
            )
            expect(await poolCommiter.shadowPools(commits[1].commitType)).to.eq(
                amountCommitted.div(2)
            )
            await timeout(2000)
            await pool.poolUpkeep(lastPrice, 10)

            expect(await poolCommiter.shadowPools(commits[0].commitType)).to.eq(
                0
            )
            expect(await poolCommiter.shadowPools(commits[1].commitType)).to.eq(
                0
            )
        })
        it("should adjust the balances of the live pools involved", async () => {
            expect(await pool.shortBalance()).to.eq(amountCommitted)
            await timeout(2000)
            await pool.poolUpkeep(lastPrice, 10)

            expect(await pool.shortBalance()).to.eq(
                amountCommitted.add(amountCommitted.div(2))
            )
        })
    })
})