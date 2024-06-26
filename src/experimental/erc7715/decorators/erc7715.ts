import type { Client } from '../../../clients/createClient.js'
import type { Transport } from '../../../clients/transports/createTransport.js'
import type { Account } from '../../../types/account.js'
import type { Chain } from '../../../types/chain.js'
import {
  type IssuePermissionsParameters,
  type IssuePermissionsReturnType,
  issuePermissions,
} from '../actions/issuePermissions.js'

export type WalletActionsErc7715 = {
  /**
   * Request permissions from a wallet to perform actions on behalf of a user.
   *
   * - Docs: https://viem.sh/experimental/erc7715/issuePermissions
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { walletActionsErc7715 } from 'viem/experimental'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * }).extend(walletActionsErc7715())
   *
   * const result = await client.issuePermissions({
   *   expiry: 1716846083638,
   *   permissions: [
   *     {
   *       type: 'contract-call',
   *       data: {
   *         address: '0x0000000000000000000000000000000000000000',
   *       },
   *     },
   *     {
   *       type: 'native-token-limit',
   *       data: {
   *         amount: 69420n,
   *       },
   *       required: true,
   *     },
   *   ],
   * })
   */
  issuePermissions: (
    parameters: IssuePermissionsParameters,
  ) => Promise<IssuePermissionsReturnType>
}

/**
 * A suite of ERC-7715 Wallet Actions.
 *
 * - Docs: https://viem.sh/experimental
 *
 * @example
 * import { createPublicClient, createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { walletActionsErc7715 } from 'viem/experimental'
 *
 * const walletClient = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(walletActionsErc7715())
 *
 * const result = await walletClient.issuePermissions({...})
 */
export function walletActionsErc7715() {
  return <
    transport extends Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  >(
    client: Client<transport, chain, account>,
  ): WalletActionsErc7715 => {
    return {
      issuePermissions: (parameters) => issuePermissions(client, parameters),
    }
  }
}
