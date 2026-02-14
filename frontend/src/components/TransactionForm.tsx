import { useState } from 'react';
import { FiCalendar, FiTag } from 'react-icons/fi';
import { TransactionFormData } from '../types';
import './TransactionForm.css';

interface Props {
  onSubmit: (data: TransactionFormData) => void;
}

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Salary', 'Other'];

function TransactionForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Other',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ description: '', amount: '', type: 'expense', category: 'Other', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            step="0.01"
          />
        </div>

        <div className="form-group">
          <FiCalendar className="input-icon" />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FiTag className="input-icon" />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="type-toggle">
          <button
            type="button"
            className={formData.type === 'expense' ? 'active expense' : ''}
            onClick={() => setFormData({ ...formData, type: 'expense' })}
          >
            Expense
          </button>
          <button
            type="button"
            className={formData.type === 'income' ? 'active income' : ''}
            onClick={() => setFormData({ ...formData, type: 'income' })}
          >
            Income
          </button>
        </div>
      </div>

      <button type="submit" className="submit-btn">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
