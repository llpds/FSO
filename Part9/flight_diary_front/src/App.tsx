import { useState, useEffect } from 'react';

import { DiaryEntry } from './types';
import { getAllDiaries } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <h2> Diary entries</h2>
        {diaries.map(d =>
          <div key = {d.id}>
            <h3>{d.date}</h3>
            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
          </div>
        )}
    </div>
  )
}
export default App
