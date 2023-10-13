import { useNetwork, useSwitchNetwork } from 'wagmi'

export const ChangeNetworkButton = () => {
  const { chain } = useNetwork()
  const {chains,  error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}

      {chains.map((x) => (
        <button
          style={{ border: '1px solid black', padding: '5px' } }
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