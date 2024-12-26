// import React, { useState, useEffect } from 'react';

// const TransactionForm = ({
//     onAddTransaction,
//     onEditTransaction,
//     editingTransaction,
//     setEditingTransaction,
// }) => {
//     const [formData, setFormData] = useState({
//         id: null,
//         description: '',
//         amount: '',
//         date: '',
//     });

//     useEffect(() => {
//         if (editingTransaction) {
//             setFormData(editingTransaction);
//         } else {
//             setFormData({ id: null, description: '', amount: '', date: '' });
//         }
//     }, [editingTransaction]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (formData.id) {
//             onEditTransaction(formData);
//         } else {
//             onAddTransaction(formData);
//         }
//         setFormData({ id: null, description: '', amount: '', date: '' });
//         setEditingTransaction(null);
//     };

//     return (
//         <form className="transaction-form" onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                 }
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Amount"
//                 value={formData.amount}
//                 onChange={(e) =>
//                     setFormData({ ...formData, amount: e.target.value })
//                 }
//                 required
//             />
//             <input
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                 }
//                 required
//             />
//             <button type="submit">
//                 {formData.id ? 'Update Transaction' : 'Add Transaction'}
//             </button>
//         </form>
//     );
// };

// export default TransactionForm;
import React, { useState, useEffect } from 'react';

const TransactionForm = ({
  onAddTransaction,
  onEditTransaction,
  editingTransaction,
  setEditingTransaction,
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Populate form with the transaction to edit
  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDescription(editingTransaction.description);
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      console.error('Transaction data is incomplete.');
      return;
    }

    const transactionData = {
      amount: parseFloat(amount), // Ensure numeric input for amount
      category: category.trim(),
      description: description.trim(),
    };

    if (editingTransaction) {
      // Call the edit handler if editing a transaction
      onEditTransaction({ ...editingTransaction, ...transactionData });
      setEditingTransaction(null); // Reset editing state
    } else {
      // Call the add handler if adding a new transaction
      onAddTransaction(transactionData);
    }

    // Clear the form fields
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">{editingTransaction ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
};

export default TransactionForm;
