import React from 'react';
import { View, Modal } from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import {PRIMARY_COLOR} from "../shared/colors";

export const  CustomLoader = (props) => {
    return (
        <Modal  
            transparent
            visible={props.visible}
            animationType='fade'
            onRequestClose={() => null}
        >
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)'
            }}>
                <PacmanIndicator size={60} color='#851616' />
            </View>
        </Modal>
    );
};
