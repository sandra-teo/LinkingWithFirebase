import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default MetalList = ({ list }) => {

    return (
        <View style={[styles.listContainer, {backgroundColor: '#eee'}]}>
            <Text style={styles.listTitle}>
                {list.image}
            </Text>

            <View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.subtitle}>{list.description} {"\n"}{list.ways}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create ({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginHorizontal: 12,
        alignItems: "center",
        width: 250
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: 'black'
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: 'black'
    }
});