import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import CharacterCreator from "./components/CharacterCreator";
import ClassCreator from "./components/ClassCreator";
import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Character } from "./types";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [opened, { toggle }] = useDisclosure(true);
  const [shakeDieActive, setShakeDieActive] = useState(false);
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/characters")
      .then((res) => {
        if (res.data.error) {
          console.error(res.data.error);
        } else {
          setCharacterList(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const shakeDie = () => {
    setShakeDieActive(true);

    setTimeout(() => {
      setShakeDieActive(false);
    }, 800);
  };

  const mainRouter = createBrowserRouter([
    { path: "/", element: <ClassCreator /> },
    { path: "characters", element: <CharacterCreator /> },
  ]);

  return (
    <Provider store={store}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm" />
            <FontAwesomeIcon
              icon={faDiceD20}
              className={`${shakeDieActive ? "fa-shake" : ""}`}
              onClick={shakeDie}
              size="xl"
              style={{ color: "#e41f17" }}
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          {" "}
          {/* TODO: update to change to show classes when route changes */}
          <AppShell.Section>
            <h2>Created Characters</h2>
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            {characterList.map((character, index) => (
              <p key={index}>{character.name}</p>
            ))}
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          <RouterProvider router={mainRouter} />
        </AppShell.Main>
      </AppShell>
    </Provider>
  );
}

export default App;
