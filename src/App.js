import { useState, useEffect } from "react";

const App = () => {
  const [grocery, setGrocery] = useState("");

  // check local storage.
  const getSavedGroceryList = () => {
    const groceryList = JSON.parse(localStorage.getItem("savedGroceryList"));
    if (groceryList) {
      return groceryList;
    } else {
      return [];
    }
  };

  const [groceryList, setGroceryList] = useState(getSavedGroceryList());

  const submitHandler = (event) => {
    event.preventDefault();
    const id = new Date().getTime().toString();
    const groceryDict = { id, grocery };
    setGroceryList([...groceryList, groceryDict]);
    localStorage.setItem("savedGroceryList", JSON.stringify(groceryList));
    setGrocery("");
  };

  const deleteItemHandler = (id) => {
    const updatedGroceryList = groceryList.filter((item) => id !== item.id);
    setGroceryList(updatedGroceryList);
    localStorage.setItem(
      "savedGroceryList",
      JSON.stringify(updatedGroceryList)
    );
  };

  // Update local storage every time when user submit data.
  useEffect(() => {
    localStorage.setItem("savedGroceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <section>
      <form onSubmit={submitHandler}>
        <label htmlFor="groceryName"></label>
        <input
          type="text"
          id="groceryName"
          value={grocery}
          onChange={(event) => setGrocery(event.target.value)}
        ></input>
        <button type="submit">Save</button>
      </form>
      <ul>
        {groceryList.map((item) => {
          return (
            <li key={item.id}>
              <div>
                <Checkbox></Checkbox>
                <p>{item.grocery}</p>
              </div>
              <button onClick={() => deleteItemHandler(item.id)}>
                <span className="material-symbols-outlined">remove</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <input
      className="checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    ></input>
  );
};

export default App;
