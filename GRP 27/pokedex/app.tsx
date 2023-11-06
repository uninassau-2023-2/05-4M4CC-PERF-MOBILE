import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TextInput } from "react-native";

interface AddressData {
    cep: string;
    bairro: string;
    localidade: string;
    uf: string;
}

interface PokemonData {
    name: string;
    sprites: {
        front_default: string;
    };
    abilities: Array<{ ability: { name: string } }>;
    height: number;
    weight: number;
}

const PokemonApp: React.FC = () => {
    const [cep, setCep] = useState("");
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [addressData, setAddressData] = useState<AddressData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [storedPokemon, setStoredPokemon] = useState<
        Record<string, PokemonData | null>
    >({});

    const fetchRandomPokemon = () => {
        setIsLoading(true);
        const randomPokemonId = generateRandomPokemonId();
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
            .then((response) => response.json())
            .then((data: PokemonData) => {
                setPokemonData(data);
                setIsLoading(false);
                storePokemonData(cep, data);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const generateRandomPokemonId = () => {
        return Math.floor(Math.random() * 100) + 1;
    };

    const fetchAddress = (cep: string) => {
        if (isValidCEP(cep)) {
            const stored = storedPokemon[cep];
            if (stored) {
                setPokemonData(stored);
            } else {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((response) => response.json())
                    .then((data: AddressData) => {
                        setAddressData(data);
                    })
                    .catch((error) => {
                        console.error(error);
                        setAddressData(null);
                    });
            }
        }
    };

    const storePokemonData = (cep: string, data: PokemonData) => {
        const updatedStoredPokemon = { ...storedPokemon };
        updatedStoredPokemon[cep] = data;
        setStoredPokemon(updatedStoredPokemon);
    };

    const isValidCEP = (cep: string) => {
        return /^\d{8}$/.test(cep);
    };

    useEffect(() => {
        if (cep.length === 8 && isValidCEP(cep)) {
            fetchAddress(cep);
            fetchRandomPokemon();
        } else {
            setAddressData(null);
            setPokemonData(null);
        }
    }, [cep]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CEP e Pokémon</Text>
            <Text style={styles.subtitle}>
                Digite um CEP de 8 dígitos para ver as informações de endereço e
                um Pokémon aleatório.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o CEP (8 dígitos)"
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={8}
            />
            {isLoading && <ActivityIndicator size="large" color="#007AFF" />}
            {pokemonData && addressData && (
                <View style={styles.pokemonInfo}>
                    <Text style={styles.pokemonName}>
                        {pokemonData.name.charAt(0).toUpperCase() +
                            pokemonData.name.slice(1)}
                    </Text>
                    <Image
                        source={{ uri: pokemonData.sprites.front_default }}
                        style={styles.pokemonImage}
                    />
                    <Text>Habilidades: {pokemonData.abilities.length}</Text>
                    <Text>Altura: {pokemonData.height / 10}m</Text>
                    <Text>Peso: {pokemonData.weight / 10}kg</Text>
                </View>
            )}
            {addressData && (
                <View style={styles.addressInfo}>
                    <Text style={styles.addressTitle}>
                        Informações de Endereço:
                    </Text>
                    <Text style={styles.label}>CEP: {addressData.cep}</Text>
                    <Text style={styles.label}>
                        Bairro: {addressData.bairro}
                    </Text>
                    <Text style={styles.label}>
                        Cidade: {addressData.localidade}
                    </Text>
                    <Text style={styles.label}>UF: {addressData.uf}</Text>
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    pokemonInfo: {
        alignItems: "center",
    },
    addressInfo: {
        marginTop: 20,
    },
    addressTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
    },
    pokemonName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    pokemonImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});

export default PokemonApp;