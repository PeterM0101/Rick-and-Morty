import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchInfo, setCurrentPage } from "../../store/slices/infoSlice";
import { fetchCharacters } from "../../store/slices/charactersSlice";
import Pagination from "../../components/Paginator/Pagination";
import { useAppSelector } from "../../hooks/useAppSelector";
import Character from "../../components/Character/Character";
import useLocalstorage from "../../hooks/useLocalStorage";
import { CharacterInterface } from "../../types/store/characters";

const Characters = () => {
  const dispatch = useAppDispatch();
  const { characters, error: charactersError } = useAppSelector(
    (state) => state.characters
  );
  const {
    currentPage,
    count,
    error: infoError,
  } = useAppSelector((state) => state.info);

  const [favorites, setFavorites] = useLocalstorage<CharacterInterface>(
    "favorites",
    []
  );
  const [disLiked, setDisliked] = useLocalstorage<CharacterInterface>(
    "disliked",
    []
  );

  const isFavorite = (id: number): boolean => {
    if (!favorites) return false;

    return !!favorites.find(
      (character: CharacterInterface) => id === character.id
    );
  };

  const handleAddToFavorite = (character: CharacterInterface) => {
    if (isDisliked(character.id)) {
      setDisliked(disLiked.filter((item) => item.id !== character.id));
    }
    if (!isFavorite(character.id)) {
      setFavorites([...favorites, character]);
    }
  };

  const handleAddToDislike = (character: CharacterInterface) => {
    if (isFavorite(character.id)) {
      setFavorites(favorites.filter((item) => item.id !== character.id));
    }
    if (!isDisliked(character.id)) {
      setDisliked([...disLiked, character]);
    }
  };

  const isDisliked = (id: number): boolean => {
    if (!disLiked) return false;
    return !!disLiked.find(
      (character: CharacterInterface) => id === character.id
    );
  };

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div className="characters">
      {!charactersError && !infoError ? (
        <>
          <div className="characters__paginator">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              siblingCount={1}
              totalCount={count}
              pageSize={20}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="characters__content">
            {characters.map((character) => (
              <Character
                key={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                character={character}
                isFavorite={isFavorite(character.id)}
                onFavorite={() => handleAddToFavorite(character)}
                isDisliked={isDisliked(character.id)}
                onDislike={() => handleAddToDislike(character)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="error">{charactersError || infoError}</p>
      )}
    </div>
  );
};

export default Characters;
