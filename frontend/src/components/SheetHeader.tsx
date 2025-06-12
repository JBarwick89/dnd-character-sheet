import "./SheetHeader.css";
import { Group, TextInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCharacterProperty } from "../features/character-slice";
import { Character } from "../types";

interface SheetHeaderProps {
  onEnterKey: Function;
}

export default function SheetHeader({ onEnterKey }: SheetHeaderProps) {
  const dispatch = useAppDispatch();
  const character: Character = useAppSelector((state) => state.character);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnterKey(e);
  };

  return (
    <Group>
      <TextInput
        label="Player Name:"
        value={character.playerName}
        onChange={(e) =>
          dispatch(
            setCharacterProperty({
              value: e.target.value,
              propertyName: "playerName",
            })
          )
        }
        onKeyDown={handleKeyDown}
      />

      <TextInput
        label="Character Name:"
        value={character.name}
        onChange={(e) =>
          dispatch(
            setCharacterProperty({
              value: e.target.value,
              propertyName: "name",
            })
          )
        }
        onKeyDown={handleKeyDown}
      />
    </Group>
  );
}
