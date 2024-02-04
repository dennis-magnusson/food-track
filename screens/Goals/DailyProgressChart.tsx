import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { MyText } from "../../shared/MyText";
import { layout, typography } from "../../theme";

const screenWidth =
  Dimensions.get("window").width -
  2 * layout.accentContainer1.marginHorizontal -
  2 * layout.accentContainer1.padding +
  50;

interface DailyProgressChartProps {}

const DailyProgressChart: React.FC<DailyProgressChartProps> = () => {
  const data = {
    labels: ["8.1.", "9.1.", "10.1.", "11.1.", "12.1.", "Today"],
    datasets: [
      {
        data: [2200, 2402, 2384, 2699, 2790, 2443],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={{ ...layout.accentContainer1, paddingBottom: 10 }}>
      <MyText style={typography.title1NoMargin}>
        Daily calories - last week
      </MyText>
      <BarChart
        style={{ marginTop: 10, marginLeft: -45 }}
        data={data}
        withInnerLines={false}
        width={screenWidth}
        height={200}
        yAxisLabel=""
        withHorizontalLabels={false}
        fromZero={true}
        yAxisSuffix=""
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

export default DailyProgressChart;
