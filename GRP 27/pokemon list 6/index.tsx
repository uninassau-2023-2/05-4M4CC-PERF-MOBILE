import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tab2Screen: React.FC = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [userPokemonData, setUserPokemonData] = useState<any | null>(null);
    const [opponentPokemonData, setOpponentPokemonData] = useState<any | null>(
        null
    );
    const [cameraActive, setCameraActive] = useState(false);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        const fetchRandomPokemon = async () => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon/"
                );
                const data = await response.json();
                const randomUserPokemon =
                    data.results[
                        Math.floor(Math.random() * data.results.length)
                    ];

                const userPokemonResponse = await fetch(randomUserPokemon.url);
                const userPokemonData = await userPokemonResponse.json();

                setUserPokemonData({
                    name: userPokemonData.name,
                    abilities: userPokemonData.abilities.map(
                        (ability: any) => ability.ability.name
                    ),
                    height: userPokemonData.height,
                    weight: userPokemonData.weight,
                    image: `https://pokeres.bastionbot.org/images/pokemon/${userPokemonData.id}.png`,
                });

                const randomOpponentPokemon =
                    data.results[
                        Math.floor(Math.random() * data.results.length)
                    ];

                const opponentPokemonResponse = await fetch(
                    randomOpponentPokemon.url
                );
                const opponentPokemonData =
                    await opponentPokemonResponse.json();

                setOpponentPokemonData({
                    name: opponentPokemonData.name,
                    abilities: opponentPokemonData.abilities.map(
                        (ability: any) => ability.ability.name
                    ),
                    height: opponentPokemonData.height,
                    weight: opponentPokemonData.weight,
                    image: `https://pokeres.bastionbot.org/images/pokemon/${opponentPokemonData.id}.png`,
                });
            } catch (error) {
                console.error("Erro ao obter dados do Pokémon", error);
            }
        };

        fetchRandomPokemon();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleCameraPress = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
    };

    const handleExitCamera = () => {
        setCameraActive(false);
    };

    const handleFlipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
        );
    };

    const handleBattle = () => {
        if (
            userPokemonData &&
            opponentPokemonData &&
            userPokemonData.abilities &&
            opponentPokemonData.abilities
        ) {
            const userPokemonAbilities = userPokemonData.abilities.length;
            const opponentPokemonAbilities =
                opponentPokemonData.abilities.length;

            let result = "";

            if (userPokemonAbilities === opponentPokemonAbilities) {
                result = "Empate";
            } else if (userPokemonAbilities > opponentPokemonAbilities) {
                result = "Ganhou";
            } else {
                result = "Perdeu";
            }

            const opponentInfo = `Nome: ${
                opponentPokemonData.name
            }\nHabilidades: ${opponentPokemonData.abilities.join(
                ", "
            )}\nAltura: ${opponentPokemonData.height}\nPeso: ${
                opponentPokemonData.weight
            }`;

            Alert.alert(
                "Resultado da Batalha",
                `${result}\n\nInformações do Pokémon Oponente:\n${opponentInfo}`
            );
        }
    };

    return (
        <View style={styles.container}>
            {cameraActive ? (
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.cameraOverlay}>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={handleExitCamera}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={handleCameraPress}
                        >
                            <Ionicons name="camera" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            ) : (
                <View style={styles.pokemonContainer}>
                    <Image
                        source={{ uri: userPokemonData?.image }}
                        style={styles.pokemonImage}
                    />
                    <Text style={styles.pokemonInfo}>
                        Nome: {userPokemonData?.name}
                        {"\n"}
                        Habilidades: {userPokemonData?.abilities?.join(", ")}
                        {"\n"}
                        Altura: {userPokemonData?.height}
                        {"\n"}
                        Peso: {userPokemonData?.weight}
                    </Text>
                    <TouchableOpacity
                        style={styles.battleButton}
                        onPress={handleBattle}
                    >
                        <Ionicons name="sword-cross" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => setCameraActive(true)}
                    >
                        <Ionicons name="camera" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    cameraOverlay: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 20,
    },
    cameraButton: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 15,
        borderRadius: 50,
        margin: 10,
    },
    pokemonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pokemonImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    pokemonInfo: {
        textAlign: "center",
        marginBottom: 20,
    },
    battleButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Batalhar" component={Tab2Screen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
