import React, { FC, useState } from "react";
import Card from "../../ui/card/Card";
import { CharacterInterface } from "../../types/store/characters";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "../../assets/icons/dislike.svg";

interface CharacterProps {
  image: string;
  name: string;
  status: string;
  character: CharacterInterface;
  isDisliked: boolean;
  isFavorite: boolean;
  onFavorite: () => void;
  onDislike: () => void;
}

const Character: FC<CharacterProps> = ({
  image,
  status,
  name,
  isFavorite,
  onFavorite,
  isDisliked,
  onDislike,
}) => {
  return (
    <Card className="character">
      <div
        className="character__clickable"
        onClick={() => {
          console.log("click");
        }}
      >
        <img src={image} alt={name} className="character__image" />
        <h4>{name}</h4>
      </div>
      <p>{status}</p>
      <div className="character__rating">
        <Like
          className={`character__like ${
            isFavorite && "character__like--active"
          }`}
          onClick={onFavorite}
        />
        <Dislike
          className={`character__dislike ${
            isDisliked && "character__dislike--active"
          }`}
          onClick={onDislike}
        />
      </div>
    </Card>
  );
};

export default Character;
