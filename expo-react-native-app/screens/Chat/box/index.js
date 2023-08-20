import * as React from 'react';
import {
    Text, View, Dimensions
} from 'react-native';
import Logo from '../logo';
import Markdown from 'react-native-markdown-display';

export default function Box({ text, type }) {

    return (
        <View style={{ alignItems: type === 'system' ? 'flex-start' : 'flex-end', }}>
            <View style={{ overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        backgroundColor: 'white',
        elevation: 2,flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, padding:  type === 'system'? 8:8, margin: 8, maxWidth: Dimensions.get('window').width - 64 - 32 }}>
               { type === 'system' && <View style={{ marginRight: 8 }}>
                    <Logo style={{ height: 40, width: 40 }} />
                </View>}
                { type === 'system' ?  <View style={{ flex: 1,
    alignItems: 'center',
    justifyContent: 'center',}}>
                <Markdown style={{ flex: 1, flexWrap: 'wrap' }} >
                    {text}
                </Markdown>
                </View>:
                <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                    {text}
                </Text> }
            </View>
        </View>
    );
}
