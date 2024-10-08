import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Login from "./Login";

function App() {
  const isLoggedInSession =
    JSON.parse(sessionStorage.getItem("isLoggedIn")) || "";
  const [salary, setSalary] = useState("₹1,000");
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInSession);
  const initialData = JSON.parse(sessionStorage.getItem(isLoggedIn)) || [];
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseValue, setExpenseValue] = useState("₹1,000");
  const [data, setData] = useState(initialData);
  const [checkedItems, setCheckedItems] = useState({});
  const [sum,setSum] = useState(0);
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    const initialData = JSON.parse(sessionStorage.getItem(isLoggedIn)) || [];
    setData(initialData);
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem(isLoggedIn, JSON.stringify(data));
    let total = 0
    data.forEach(value => {
      total += parseInt(value.expenseValue.replace(/[^0-9]/g, ""), 10); 
    })
    setSum(total)

  }, [data]);

  const saveHandler = () => {
    setData((prevData) => [...prevData, { expenseReason, expenseValue }]);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
  };

  const signoutHandler = () => {
    setIsLoggedIn("");
    setSalary("₹1,000");
    setExpenseValue("₹1,000");
    setExpenseReason("");
    window.location.reload();
  };

  const removeHandler = () => {
    const newData = data.filter((_, index) => !checkedItems[index]);
    setData(newData);
    setCheckedItems({});
  };

  if (!isLoggedIn) {
    return (
      <Login onLogin={setIsLoggedIn} salary={salary} setSalary={setSalary} />
    );
  }

  return (
    <>
      <div className="expense-top-bar"></div>
      <div className="App">
        <div className="expense-tracker">
          <h1>
            Expense Tracker for {isLoggedIn.split("₹")[0]} current salary is{" "}
            {isLoggedIn.split("₹")[1]}
          </h1>
          <button className="signout-button" onClick={signoutHandler}>
            signout
          </button>
          <>
            <p>What is your current expense for?</p>
            <input
              onChange={(e) => setExpenseReason(e.target.value)}
              type="text"
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                margin: "1rem",
              }}
            />
          </>
          <>
            <p>What is your current expense value in rupees?</p>
            <CurrencyInput
              onChange={(e) => setExpenseValue(e.target.value)}
              type="text"
              defaultValue={1000}
              decimalsLimit={2}
              allowNegativeValue={0}
              // prefix="₹"
              intlConfig={{ locale: "en-IN", currency: "INR" }}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                margin: "1rem",
              }}
            />
            <button className="save-button" onClick={saveHandler}>
              Save
            </button>
          </>
          <table>
            <thead>
              <tr>
                <th>Expense Reason</th>
                <th>Expense Value</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => (
                <tr key={index}>
                  <td>{val.expenseReason}</td>
                  <td>{val.expenseValue}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>
            After Expenses your current saving is {parseInt(isLoggedIn.replace(/[^0-9]/g, ""), 10) - sum}
          </h5>
          <button className="remove-button" onClick={removeHandler}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
