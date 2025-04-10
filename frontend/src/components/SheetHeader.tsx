import './SheetHeader.css';
import { Group, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCharacterProperty } from '../features/character-slice';
import { Character } from '../types';

interface SheetHeaderProps {
  onEnterKey: Function,
}

export default function SheetHeader({onEnterKey}: SheetHeaderProps) {
  const dispatch = useAppDispatch();
  const character: Character = useAppSelector((state) => state.character);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && character.playerName && character.name) {
      onEnterKey();
    } else if (e.key === 'Enter' && (!character.playerName || !character.name)) {
      if (!character.playerName) {
        notifications.show({
          title: 'Error',
          message: 'Player name is required',
          color: 'red',
        });
      }
      
      if (!character.name) {
        notifications.show({
          title: 'Error',
          message: 'Character name is required',
          color: 'red',
        });
      }
    }
  }

  return (
    <Group>
      <TextInput
        label='Player Name:'
        value={character.playerName}
        onChange={(e) =>
          dispatch(
            setCharacterProperty({
              value: e.target.value,
              propertyName: 'playerName',
            })
          )
        }
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <TextInput
        label='Character Name:'
        value={character.name}
        onChange={(e) =>
          dispatch(
            setCharacterProperty({
              value: e.target.value,
              propertyName: 'name',
            })
          )
        }
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Group>
  );
}
