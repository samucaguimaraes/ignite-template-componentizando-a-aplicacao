import '../styles/sidebar.scss';
import { Button } from '../components/Button';
import { Header} from '../components/Header';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import IGenreResponseProps from '../interfaces/IGenreResponse'

interface Props {
  onSelectGender: (value: number) => void
}
export function SideBar({ onSelectGender }: Props) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    onSelectGender(id)
  }

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres')
      .then(response => {
        setGenres(response.data);
        handleClickButton(response.data[0].id)
    });
  }, []);

  return (
    <nav className="sidebar">
      <Header />
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}