import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { searchAllBooks } from "../services/books.http.service";

export default function Book({ navigation }) {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        searchAllBooks().then((data) => {
            setBooks(data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return (
        <FlatList 
            contentContainerStyle={styles.list}
            data={books}
            keyExtractor={(item) => item.abbrev.pt}
            numColumns={2}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Capítulos', { abbrev: item.abbrev.pt })}>
                    <Text style={styles.books}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container: {
        backgroundColor: "#F5FCFF",
        alignItems: "center",
        justifyContent: "center",
        margin: 12,
        flex: 1,
        borderRadius: 10,
        padding: 10,
        height: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    list: {
        backgroundColor: "#fff",
    },
    books: {
        color: '#000',
        fontSize: 17,
    },
});
