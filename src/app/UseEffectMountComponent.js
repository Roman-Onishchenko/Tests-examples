import React, { useEffect, useState } from "react";

const fetchData = () => {
  const data = {
    firstName: "Yusinto",
    lastName: "Ngadiman",
    nickName: "React Junkie",
  };
  return data;
};

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const data = fetchData();
    setData(data);
  }, []);

  return (
    <div className="App">
      {data ? (
        <h2>
          Hi {data.firstName} {data.lastName} {data.nickName}!
        </h2>
      ) : (
        "No data yet"
      )}
    </div>
  );
};

export default App;
