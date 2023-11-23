import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function QueueTest() {
    const [senhas, setSenhas] = useState([]);
    const apiUrl = "https://mobile-project-api.onrender.com/api/senhas";

    useEffect(() => {
        loadVouchers();
    }, []);

    const loadVouchers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setSenhas(response.data);
        } catch (error) {
            console.error("Erro ao consultar senhas:", error);
        }
    };
    
    const removeSenha = async (id) => {
        try {
            await markAsFinish(id);
            await axios.delete(`${apiUrl}/${id}`);
            Alert.alert("Sucesso!", "Senha finalizada!");
            loadVouchers();
        } catch (error) {
            console.error("Erro ao remover senha:", error);
        }
    };

    const markAsFinish = async (id) => {
        try {
            await axios.put(`${apiUrl}/${id}`);
        } catch (error) {
            console.error("Erro ao marcar como atendido:", error);
        }
    };

    return (
        <ScrollView className="w-full py-14 bg-black">
            <View className="flex flex-row justify-between items-center px-4">
                <View className="flex flex-row items-center gap-2">
                    <Image source={require("../../assets/ticket.png")} className="w-12 h-12"/>
                    <Text className="text-3xl font-extrabold uppercase text-white">TicketLand</Text>
                </View>
            </View>

            <View className="border border-white/20 my-5"></View>
            {senhas.length > 0 ? (
                <FlatList
                    className="px-4 pb-20"
                    data={senhas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="px-4 mb-4 rounded-lg bg-zinc-900 border-2 border-white/20 py-5">
                            <Text className="text-xl  text-white font-bold">
                                ID: {item.id}
                            </Text>

                            <View className="border border-white/20 my-5"></View>

                            <View className="flex flex-row gap-2 items-center">
                                <Ionicons name="cube" size={20} color={"lightgreen"}/>
                               <Text className="text-lg text-white">Tipo: {item.type}</Text>
                            </View>
                            <View className="flex flex-row gap-2 items-center">
                                <Ionicons name="time" size={20} color={"pink"}/>
                               <Text className="text-lg text-white">Tempo: 1 minuto</Text>
                            </View>

                            <TouchableOpacity
                                    onPress={() => removeSenha(item.id)}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5 flex items-center justify-center"
                                >
                                    <Text className="text-md font-extrabold uppercase text-white">
                                        Finalizar Senha
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <View className="flex mt-[280px] justify-center items-center">
                    <Text className="text-2xl font-extrabold text-white">Lista de senhas vazia.</Text>
                </View>
            )}
        </ScrollView>
    );
}