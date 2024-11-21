import React, { useState } from "react";

const IncomeExpenseTracker = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    type: "income",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
      type: formData.type,
    };

    if (formData.type === "income") {
      setIncome((prev) => [...prev, newTransaction]);
    } else {
      setExpense((prev) => [...prev, newTransaction]);
    }

    setFormData({
      amount: "",
      description: "",
      date: "",
      type: "income",
    });
  };

  const deleteTransaction = (id, type) => {
    if (type === "income") {
      setIncome((prev) => prev.filter((item) => item.id !== id));
    } else {
      setExpense((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const calculateNetBalance = () => {
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);
    return totalIncome - totalExpense;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2>Net Balance: ₹{calculateNetBalance().toFixed(2)}</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Add Transaction</h3>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <select name="type" value={formData.type} onChange={handleInputChange} style={{ marginRight: "10px" }}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={addTransaction}>Add</button>
      </div>

      <div>
        <h3>Income</h3>
        {income.length === 0 ? (
          <p>No income entries</p>
        ) : (
          <ul>
            {income.map((item) => (
              <li key={item.id}>
                ₹{item.amount} - {item.description} on {item.date}
                <button onClick={() => deleteTransaction(item.id, "income")} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3>Expenses</h3>
        {expense.length === 0 ? (
          <p>No expense entries</p>
        ) : (
          <ul>
            {expense.map((item) => (
              <li key={item.id}>
                ₹{item.amount} - {item.description} on {item.date}
                <button onClick={() => deleteTransaction(item.id, "expense")} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncomeExpenseTracker;
