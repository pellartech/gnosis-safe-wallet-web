import Web3 from 'web3'
import type { SafeTransaction } from '@gnosis.pm/safe-core-sdk-types'
import { Operation, proposeTransaction } from '@gnosis.pm/safe-react-gateway-sdk'
import { getSafeSDK } from '@/services/web3'

const proposeTx = async (chainId: string, safeAddress: string, tx: SafeTransaction) => {
  const sender = Web3.utils.toChecksumAddress(Web3.givenProvider.selectedAddress)

  const safeTxHash = await getSafeSDK().getTransactionHash(tx)

  return await proposeTransaction(chainId, safeAddress, {
    ...tx.data,
    safeTxHash,
    sender,
    value: parseInt(tx.data.value, 16).toString(),
    operation: tx.data.operation as unknown as Operation,
    nonce: tx.data.nonce.toString(),
    safeTxGas: tx.data.safeTxGas.toString(),
    baseGas: tx.data.baseGas.toString(),
    gasPrice: tx.data.gasPrice.toString(),
    signature: tx.encodedSignatures(),
    origin: null,
  })
}

export default proposeTx
