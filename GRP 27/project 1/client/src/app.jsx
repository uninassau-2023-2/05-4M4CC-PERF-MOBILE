import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import DatabaseTest from "./screens/VouchersList";
import VouchersScreen from "./screens/VouchersScreen";
import VouchersHistory from "./screens/VouchersHistory";

export default function App() 
{
    const [selectedTab, setSelectedTab] = useState("Item 1");

    const renderContent = () => 
    {
        switch (selectedTab) {
            case "Item 1": return <VouchersScreen />;
            case "Navbar 2": return <DatabaseTest />;
            case "Navbar 3": return <VouchersHistory/>
            default: return <VouchersScreen/>;
        }
    }

    return (
        <View className="flex-1">
            <View className="flex-1 justify-center items-center">{renderContent()}</View>
            <View className="flex-row bg-zinc-800">
                <TouchableOpacity
                    onPress={() => setSelectedTab("Item 1")}
                    className="flex-1 justify-center items-center py-4"
                >
                    
                    <View className="flex items-center justify-center">
                        <FontAwesome5 name="ticket-alt" size={20} color={"lightgreen"}/>
                        <Text className="uppercase font-extrabold text-gray-200">Senhas</Text>
                    </View>
                    
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => setSelectedTab("Navbar 2")}
                    className="flex-1 justify-center items-center"
                >
                    
                    <View className="flex items-center justify-center">
                        <Ionicons name="bookmarks" size={20} color={"lightgreen"}/>
                        <Text className="uppercase font-extrabold text-gray-200">Chamada</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab("Navbar 3")}
                    className="flex-1 justify-center items-center"
                >
                    <View className="flex items-center justify-center">
                        <Ionicons name="chatbox-ellipses" size={20} color={"lightgreen"}/>
                        <Text className="uppercase font-extrabold text-gray-200">Logs</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}