import React from 'react';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
    return (
        <table className="transaction-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.description}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => onEdit(transaction)}>Edit</button>
                            <button onClick={() => onDelete(transaction.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
