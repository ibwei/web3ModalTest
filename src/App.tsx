import React from "react"
import { chains, providers } from "@web3modal/ethereum"
import {
  Web3Modal,
  ConnectButton,
  useConnectModal,
  useAccount,
} from "@web3modal/react"

import type { ConfigOptions } from "@web3modal/core"

import "./styles.css"
import Test from "./component"

// Get projectID at https://cloud.walletconnect.com

console.log(
  "process.env.REACT_APP_PROJECT_ID",
  process.env.REACT_APP_PROJECT_ID
)
if (!process.env.REACT_APP_PROJECT_ID)
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable")

// Configure web3modal
const modalConfig: ConfigOptions = {
  projectId: process.env.REACT_APP_PROJECT_ID as string,
  theme: "dark" as const,
  accentColor: "default" as const,
  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [
      chains.mainnet,
      chains.rinkeby,
      chains.avalanche,
      chains.avalancheFuji,
      chains.polygon,
      chains.polygonMumbai,
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.REACT_APP_PROJECT_ID,
      }),
    ],
  },
}

export default function App() {
  const { open } = useConnectModal()

  const { account } = useAccount()

  const [loading, setLoading] = React.useState<boolean>(false)

  const connect = async () => {
    console.log("connect", account)
    try {
      setLoading(() => true)
      await open()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(() => false)
    }
  }

  return (
    <>
      <Web3Modal config={modalConfig} />
      <ConnectButton />
      <br />
      <br />
      <br />
      <br />

      <div style={{ color: "#000" }} onClick={connect}>
        {account.isConnected && <div>{account.address}</div>}
        {!account.isConnected && loading && <div>"loading..."</div>}
        {!account.isConnected && !loading && <div>connect</div>}
      </div>
      <Test />
    </>
  )
}
