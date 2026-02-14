import { useState, useEffect } from 'react';
import { FiPieChart } from 'react-icons/fi';
import Balance from '../components/Balance';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions, addTransaction, deleteTransaction } from '../services/api';
import { Transaction, TransactionFormData } from '../types';
import './Home.css';

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (formData: TransactionFormData) => {
    try {
      const newTransaction = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date
      };
      const added = await addTransaction(newTransaction);
      setTransactions([added, ...transactions]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <FiPieChart />
            <h1>Expense Tracker</h1>
          </div>
          <p className="subtitle">Manage your finances with ease</p>
        </div>
      </header>

      <main className="main-content">
        <Balance income={income} expense={expense} />
        
        <div className="content-grid">
          <TransactionForm onSubmit={handleAddTransaction} />
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </div>
      </main>
    </div>
  );
}

export default Home;
