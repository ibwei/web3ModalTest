import React from "react"
import { useAccount, useProvider } from "@web3modal/react"
// import { Web3ModalEthereum } from "@web3modal/ethereum"

const Test: React.FunctionComponent = () => {
  const library = useProvider()
  const { account } = useAccount()

  React.useEffect(() => {
    async function test() {
      console.log(library)
      if (library?.provider && account.address) {
        const res = await library.provider.getBalance(account.address)
        console.log(res)
        // const x = await Web3ModalEthereum.signMessage({ message: "123" })
        // await Web3ModalEthereum.sendTransaction({
        //   chainId: 1,
        //   mode: "prepared",
        //   request: {
        //     to: "0xD75a98ed0C6b96BECffA23b1c8a36dc1117228a1",
        //     value: 1,
        //     gasLimit: 21000,
        //   },
        // })
        // console.log("x", x)
      }
    }
    test()
  }, [library, account])

  return <div>test</div>
}
export default Test
