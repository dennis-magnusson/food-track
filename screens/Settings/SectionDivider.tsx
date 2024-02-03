import { StyleSheet, View } from "react-native";
import { MyText } from "../../shared/MyText";
import { typography } from "../../theme";

interface SectionDividerProps {
  sectionName: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ sectionName }) => {
  return (
    <>
      <View style={styles.sectionTitle}>
        <MyText style={styles.sectionTitleText}>{sectionName}</MyText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: 15,
    marginTop: 20,
  },
  sectionTitleText: {
    ...typography.secondary,
  },
});
export default SectionDivider;
