import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const calcValueFormat = (index: string, value: number) => {
  return `For index ${index} | calculated ${value}`;
};

function App() {
  const [index, setIndex] = useState("");
  const [seenIndices, setSeenIndices] = useState<number[]>([]);
  const [values, setValues] = useState<Record<string, number>>({});

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await axios.post("/api/values", { index });
      setIndex("");
    },
    [index]
  );

  const fetchValues = useCallback(async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  }, []);

  const fetchIndices = useCallback(async () => {
    const seenIndices = await axios.get("/api/values/all");
    setSeenIndices(
      Array.from(
        new Set([
          ...Object.values(seenIndices.data).map(
            //@ts-expect-error: Object.values returns { number: number }[]
            (v: { number: number }) => v.number
          ),
        ])
      )
    );
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, [fetchIndices, fetchValues]);

  return (
    <main className="container">
      <div className="title">Fib Calculator</div>
      <form className="form" onSubmit={onSubmit}>
        <label>Enter your index:</label>
        <input
          name="index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="fib-result">
        <span>Indices I have seen: </span>
        <span>{seenIndices.join(", ")}</span>
      </div>
      <div className="current-values">
        <span>Calculated values:</span>
        <span className="current-values__value">
          {Object.entries(values).map(([key, value]) => (
            <div key={key}>{calcValueFormat(key, value)}</div>
          ))}
        </span>
      </div>
    </main>
  );
}

export default App;
