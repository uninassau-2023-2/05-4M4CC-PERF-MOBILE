import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

export default function VouchersScreen() 
{
    const apiURL = "https://mobile-project-api.onrender.com/api/senhas";

    const addVoucher = async (type) => {
        try {
            await axios.post(apiURL, { type });
            Alert.alert("Senha Gerada", "Sua senha foi criada com sucesso e será chamada em breve!");
        } catch (error) {
            console.error("Erro ao adicionar senha:", error);
        }
    }

    return (

        <ScrollView className="w-full py-14 bg-black">
            <View className="flex flex-row justify-between items-center px-4">
                <View className="flex flex-row items-center gap-2">
                    <Image source={require("../../assets/ticket.png")} className="w-12 h-12"/>
                    <Text className="text-3xl font-extrabold uppercase text-white">TicketLand</Text>
                </View>
            </View>

            <View className="border border-white/20 my-5"></View>

            <View className="px-5 flex gap-5 pb-20">
                <View className="p-10 bg-zinc-900 border-2 border-white/20 rounded-md">
                    <View className="flex flex-row gap-5 items-center justify-center">
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                       <FontAwesome5 name="accessible-icon" size={32} color="red" />
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                    </View>
                    <View className="mt-5">
                        <Text className="text-xl font-extrabold text-white">Senha Prioritária</Text>
                        <View className="flex flex-row items-center mt-2">
                            <Text className="text-[14px] font-medium text-gray-300">Para Pessoas idosas ou gestantes, não gere para casos comuns</Text>
                        </View>
                        <View className="flex flex-row items-center mt-3 -ml-1">
                            <Ionicons name="time-outline" size={20} color={'white'} />
                            <Text className="text-[14px] ml-1 font-medium text-gray-300">Espera: 5 minutos</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => addVoucher("preferencial")}
                            className="w-full px-5 py-3 mt-5 bg-red-700 flex items-center justify-center rounded">
                                <Text className="font-bold uppercase text-white">Gerar senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Senha de exames */}

                <View className="p-10 bg-zinc-900 border-2 border-white/20 rounded-md">
                    <View className="flex flex-row gap-5 items-center justify-center">
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                       <Ionicons name="flask" size={32} color="yellow" />
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                    </View>
                    <View className="mt-5">
                        <Text className="text-xl font-extrabold text-white">Senha de Exames</Text>
                        <View className="flex flex-row items-center mt-2">
                            <Text className="text-[14px] font-medium text-gray-300">Senha para retirada de exames, caso não senha isso, não crie.</Text>
                        </View>
                        <View className="flex flex-row items-center mt-3 -ml-1">
                            <Ionicons name="time-outline" size={20} color={'white'} />
                            <Text className="text-[14px] ml-1 font-medium text-gray-300">Espera: 1 minuto</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => addVoucher("exames")} 
                            className="w-full px-5 py-3 mt-5 bg-yellow-500 flex items-center justify-center rounded">
                                <Text className="font-bold uppercase">Gerar senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Senha padrão */}

                <View className="p-10 bg-zinc-900 border-2 border-white/20 rounded-md">
                    <View className="flex flex-row gap-5 items-center justify-center">
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                       <Ionicons name="medical" size={32} color="lightgreen" />
                       <View className="bg-white/60 w-28 h-[2px]"></View>
                    </View>
                    <View className="mt-5">
                        <Text className="text-xl font-extrabold text-white">Senha Comum</Text>
                        <View className="flex flex-row items-center mt-2">
                            <Text className="text-[14px] font-medium text-gray-300">Senha comum para um atendimento padrão fornecido por nós.</Text>
                        </View>
                        <View className="flex flex-row items-center mt-3 -ml-1">
                            <Ionicons name="time-outline" size={20} color={'white'} />
                            <Text className="text-[14px] ml-1 font-medium text-gray-300">Espera: 5 minutos</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity 
                            onPress={() => addVoucher("comum")}
                            className="w-full px-5 py-3 mt-5 bg-green-700 flex items-center justify-center rounded">
                            <Text className="font-bold uppercase text-white">Gerar senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}