import axios from 'axios';
import { Transaction } from '../types';

const API_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTransaction = async (transaction: Omit<Transaction, '_id'>): Promise<Transaction> => {
  const response = await axios.post(API_URL, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
