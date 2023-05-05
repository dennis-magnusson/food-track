const DateHeader = () => {
  const dateString = new Date().toLocaleDateString("en-FI", {
    weekday: "long",
  });

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{dateString}</Text>
      <TouchableOpacity>
        <Ionicons name="md-settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DateHeader;
