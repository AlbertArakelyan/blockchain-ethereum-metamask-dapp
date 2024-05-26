import { createContext, useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
};

const initialFormData = {
  addressTo: '',
  amount: '',
  keyword: '',
  message: '',
};

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount') ?? 0);
  const [transactions, setTransactions] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }
  
      const transactionContract = await getEthereumContract();
  
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transaction) => {
        console.log(typeof transaction.timestamp);
        return {
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(+transaction.timestamp.toString() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount) / (10 ** 18),
        };
      });

      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log('getAllTransactions: ', error);
    }
  };

  const checkIfWalltedConnected = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }
  
      const accounts = await ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
  
        getAllTransactions();
      } else {
        console.log('No Accounts Found');
        alert('No Accounts Found');
      }
    } catch(error) {
      console.log('checkIfWalltedConnected: ', error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      localStorage.setItem('transactionCount', +transactionCount.toString());
    } catch(error) {
      console.log('sendTransaction: ', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch(error) {
      console.log('connectWallet: ', error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = await getEthereumContract();
      const parsedAmount = ethers.hexlify(ethers.toUtf8Bytes(amount)); // TODO calculate correctly
      // const parsedAmount = ethers.formatEther(ethers.parseEther(amount));
      // console.log(ethers.hexlify(ethers.toUtf8Bytes(ethers.parseUnits(amount, 'gwei'))));
      
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount, // 0.00001
        }],
      });

      // const tx = await transactionContract.sendTransaction({
      //   to: addressTo,
      //   value: ethers.utils.parseUnits(amount, 'wei'),
      // });

      const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);

      console.log(`Loading - ${transactionHash.hash}`);
      
      await transactionHash.wait();

      setIsLoading(false);

      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(+transactionCount.toString());
    } catch(error) {
      console.log('sendTransaction: ', error);
    }
  };

  useEffect(() => {
    checkIfWalltedConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider value={{
      connectWallet,
      currentAccount,
      formData,
      handleChange,
      sendTransaction,
      isLoading,
      transactions,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
