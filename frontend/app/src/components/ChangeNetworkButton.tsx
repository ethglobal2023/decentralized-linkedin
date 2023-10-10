import { useNetwork, useSwitchNetwork } from 'wagmi'

export const ChangeNetworkButton = () => {
  const { chain } = useNetwork()
  const {  error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const supportedChains = [
    {id: 1, name: "mainnet"},
    {id: 11155111, name: "sepolia"}
  ]
  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}

      {supportedChains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))}

      <div>{error && error.message}</div>
    </>
  )
}