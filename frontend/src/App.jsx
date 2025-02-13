import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/exercises");
        setExercises(response.data);
      } catch (error) {
        console.error("error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h1>Exercise Finder</h1>
      <input type="text" placeholder="search exercises..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {exercises
          .filter((exercise) => exercise.name?.toLowerCase().includes(search.toLowerCase()))
          .map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong> - {exercise.bodyPart}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
