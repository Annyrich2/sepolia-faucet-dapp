let provider;
let signer;
let contract;

const CONTRACT_ADDRESS = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

const ABI = [
  {
    "inputs": [],
    "name": "requestETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  document.getElementById("wallet").innerText =
    "Connected: " + address.slice(0, 6) + "..." + address.slice(-4);

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

async function requestEth() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  try {
    const tx = await contract.requestETH();
    await tx.wait();
    alert("Faucet request sent!");
  } catch (err) {
    alert(err.reason || "Transaction failed");
  }
}
