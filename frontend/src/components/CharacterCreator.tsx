import "./CharacterCreator.css";
import SheetHeader from "./SheetHeader";
import axios from "axios";
import { Alert, Button, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { clearCharacter } from "../features/character-slice";
// import CharacterOptions from './CharacterOptions';
// import ProgressionTable from './ProgressionTable';

export default function CharacterCreator() {
  const character = useAppSelector((state) => state.character);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch();

  const saveCharacter = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (character.name && character.playerName) {
      setLoading(true);

      await axios
        .post("http://localhost:8000/character", character)
        .then((res) => {
          setLoading(false);

          notifications.show({
            title: "Saved successfully!",
            message: `Character ${character.name} was saved`,
            color: "green",
            icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
          });

          dispatch(clearCharacter());
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      if (!character.playerName) {
        notifications.show({
          title: "Error",
          message: "Player name is required",
          color: "red",
        });
      }

      if (!character.name) {
        notifications.show({
          title: "Error",
          message: "Character name is required",
          color: "red",
        });
      }
    }
  };

  return (
    <div className="characterCreator">
      <h1>Character Creator</h1>
      {showAlert && (
        <Alert
          variant="filled"
          color="red"
          radius="xl"
          withCloseButton
          icon={<IconInfoCircle />}
          onClose={() => setShowAlert(false)}
        >
          Fill out the required fields.
        </Alert>
      )}

      <SheetHeader onEnterKey={saveCharacter} />
      <Button
        onClick={saveCharacter}
        loading={loading}
        loaderProps={{ type: "dots" }}
      >
        Save
      </Button>
      {/* TODO: <CharacterOptions /> */}
      {/* TODO: <ProgressionTable /> */}
    </div>
  );
}
