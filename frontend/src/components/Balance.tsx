import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import './Balance.css';
import { FaCalculator } from 'react-icons/fa';

interface Props {
  income: number;
  expense: number;
}

function Balance({ income, expense }: Props) {
  const balance = income - expense;

  return (
    <div className="balance-container">
      <div className="balance-card main">
        <div className="card-icon">
          <FaCalculator/>
        </div>
        <div className="card-content">
          <p>Total Balance</p>
          <h2 className={balance >= 0 ? 'positive' : 'negative'}>
            {balance.toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="balance-card income">
        <div className="card-icon">
          <FiTrendingUp />
        </div>
        <div className="card-content">
          <p>Income</p>
          <h3>{income.toFixed(2)}</h3>
        </div>
      </div>

      <div className="balance-card expense">
        <div className="card-icon">
          <FiTrendingDown />
        </div>
        <div className="card-content">
          <p>Expenses</p>
          <h3>{expense.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Balance;
