import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { getBook } from "../services/books.http.service";

export default function BookDetails({ route, navigation }) {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { abbrev } = route.params;

    useEffect(() => {
        getBook(abbrev).then((data) => {
            setBook(data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [abbrev]);

    if (isLoading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return (
        <FlatList 
            contentContainerStyle={styles.list}
            data={Array.from({ length: book.chapters })}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Versículos', { abbrev, cap: index + 1 })}>
                    <Text style={styles.books}>{index + 1}</Text>
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
        margin: 10,
        flex: 1,
        borderRadius: 10,
        padding: 5,
        height: 100,
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
        fontSize: 16,
    },
});
