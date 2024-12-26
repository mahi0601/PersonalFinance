
// import React, { useEffect, useState } from 'react';
// import TransactionForm from './TransactionForm';
// import TransactionTable from './TransactionTable';
// import axios from '../../utils/api';
// import '../../assets/css/transactions.css';
// const TransactionsPage = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [editingTransaction, setEditingTransaction] = useState(null);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const userId = localStorage.getItem('user_id'); // Retrieve user_id from localStorage
//                 if (!userId) {
//                     console.error('User ID is missing.');
//                     return;
//                 }

//                 // Append user_id as a query parameter
//                 const response = await axios.get('/transactions', {
//                     params: { user_id: parseInt(userId, 10) }, // Ensure user_id is an integer
//                 });
//                 setTransactions(response.data);
//             } catch (err) {
//                 console.error('Failed to fetch transactions:', err.response?.data || err.message);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     const handleAddTransaction = async (newTransaction) => {
//         try {
//             const userId = localStorage.getItem('user_id');
//             if (!userId) {
//                 console.error('User ID is missing.');
//                 return;
//             }
    
//             // Ensure all required fields are provided
//             if (!newTransaction.amount || !newTransaction.category || !newTransaction.description) {
//                 console.error('Transaction data is incomplete.');
//                 return;
//             }
    
//             // Clean up and format the payload
//             const transactionWithUserId = {
//                 user_id: parseInt(userId, 10), // Ensure user_id is an integer
//                 amount: parseFloat(newTransaction.amount), // Convert amount to a number
//                 category: newTransaction.category?.trim() || '', // Trim whitespace or default to empty string
//                 description: newTransaction.description?.trim() || '', // Trim whitespace or default to empty string
//             };
    
//             console.log('Payload:', transactionWithUserId); // Debugging: Log the payload
    
//             const response = await axios.post('/transactions', transactionWithUserId);
//             setTransactions((prevTransactions) => [...prevTransactions, response.data]);
//         } catch (err) {
//             console.error('Failed to add transaction:', err.response?.data || err.message);
//         }
//     };
    

//     const handleEditTransaction = async (updatedTransaction) => {
//         try {
//             // Ensure payload matches backend expectations
//             const transactionToUpdate = {
//                 ...updatedTransaction,
//                 amount: parseFloat(updatedTransaction.amount), // Convert amount to a number
//                 category: updatedTransaction.category.trim(),
//                 description: updatedTransaction.description.trim(),
//             };

//             const response = await axios.put(
//                 `/transactions/${transactionToUpdate.id}`,
//                 transactionToUpdate
//             );
//             setTransactions((prevTransactions) =>
//                 prevTransactions.map((tx) =>
//                     tx.id === transactionToUpdate.id ? response.data : tx
//                 )
//             );
//         } catch (err) {
//             console.error('Failed to edit transaction:', err.response?.data || err.message);
//         }
//     };

//     const handleDeleteTransaction = async (id) => {
//         try {
//             await axios.delete(`/transactions/${id}`);
//             setTransactions((prevTransactions) => prevTransactions.filter((tx) => tx.id !== id));
//         } catch (err) {
//             console.error('Failed to delete transaction:', err.response?.data || err.message);
//         }
//     };

//     return (
//         <div className="transactions-page">
//             <h1>Manage Transactions</h1>
//             <TransactionForm
//                 onAddTransaction={handleAddTransaction}
//                 onEditTransaction={handleEditTransaction}
//                 editingTransaction={editingTransaction}
//                 setEditingTransaction={setEditingTransaction}
//             />
//             <TransactionTable
//                 transactions={transactions}
//                 onEdit={setEditingTransaction}
//                 onDelete={handleDeleteTransaction}
//             />
//         </div>
//     );
// };

// export default TransactionsPage;
import React, { useEffect, useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import axios from '../../utils/api';
import '../../assets/css/transactions.css';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          console.error('User ID is missing.');
          return;
        }

        const response = await axios.get('/transactions', {
          params: { user_id: parseInt(userId, 10) },
        });
        setTransactions(response.data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err.response?.data || err.message);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID is missing.');
        return;
      }

      const transactionWithUserId = {
        ...newTransaction,
        user_id: parseInt(userId, 10),
      };

      const response = await axios.post('/transactions', transactionWithUserId);
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);
    } catch (err) {
      console.error('Failed to add transaction:', err.response?.data || err.message);
    }
  };

  const handleEditTransaction = async (updatedTransaction) => {
    try {
      const response = await axios.put(
        `/transactions/${updatedTransaction.id}`,
        updatedTransaction
      );
      setTransactions((prevTransactions) =>
        prevTransactions.map((tx) =>
          tx.id === updatedTransaction.id ? response.data : tx
        )
      );
    } catch (err) {
      console.error('Failed to edit transaction:', err.response?.data || err.message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      setTransactions((prevTransactions) => prevTransactions.filter((tx) => tx.id !== id));
    } catch (err) {
      console.error('Failed to delete transaction:', err.response?.data || err.message);
    }
  };

  return (
    <div className="transactions-page">
      <h1>Manage Transactions</h1>
      <TransactionForm
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />
      <TransactionTable
        transactions={transactions}
        onEdit={setEditingTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default TransactionsPage;
