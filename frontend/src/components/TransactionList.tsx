import { FiTrash2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Transaction } from '../types';
import './TransactionList.css';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="empty-state">No transactions yet. Add your first transaction!</p>
      ) : (
        <div className="transactions">
          {transactions.map((transaction) => (
            <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-icon">
                {transaction.type === 'income' ? <FiTrendingUp /> : <FiTrendingDown />}
              </div>
              <div className="transaction-details">
                <h4>{transaction.description}</h4>
                <span className="category">{transaction.category}</span>
                <span className="date">{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
              <div className="transaction-amount">
                <span className={transaction.type}>
                  {transaction.type === 'income' ? '+' : '-'}{Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              <button className="delete-btn" onClick={() => onDelete(transaction._id!)}>
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
