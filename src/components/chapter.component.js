import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, StyleSheet, View } from 'react-native';
import { getChapter } from '../services/books.http.service';

const Verse = ({ number, text }) => (
    <Text style={styles.verse}>{number}. {text}</Text>
);

export default function Chapter({ route }) {
    const { abbrev, cap } = route.params;
    const [chapter, setChapter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getChapter(abbrev, cap).then((data) => {
            setChapter(data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [abbrev, cap]);

    if (isLoading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    if (!chapter || !chapter.verses) {
        return <View style={styles.errorContainer}><Text>Erro ao carregar o capítulo</Text></View>;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {chapter.verses.map((verse, index) => (
                <Verse key={index} number={verse.number} text={verse.text} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    verse: {
        textAlign: "center",
        padding: 12,
        fontSize: 18,
        color: '#333333',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 5,
    },
});
