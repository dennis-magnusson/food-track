import React from "react";
import { SafeAreaView } from "react-native";
import { MyText } from "./MyText";

interface TextScreenProps {
    text: string;
}

const TextScreen: React.FC<TextScreenProps> = ({text}): JSX.Element =>  {
    return (
        <SafeAreaView>
            <MyText>{text}</MyText>
        </SafeAreaView>
    );
}

export default TextScreen;