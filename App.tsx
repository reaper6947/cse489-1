import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import Row from "./components/row";
import Button from "./components/button";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export default function App() {
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  );

  const arr = ["500", "100", "50", "20", "10", "5", "2", "1"];

  const [getObj, setObj] = useState({
    value: "",
    "500": 0,
    "100": 0,
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "2": 0,
    "1": 0,
  });

  useEffect(() => {
    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();

      setOrientation(orientation);
    };
    const handleOrientationChange = (o: any) => {
      setOrientation(o.orientationInfo.orientation);
    };

    checkOrientation();
    ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  const changeCalc = () => {
    const { value, ...obj } = getObj;

    let temp: { [key: string]: number } = {};
    let remainder: number = parseInt(value);

    for (let i of arr) {
      if (value == "") {
        remainder = 0;
      }
      temp[i] = Math.floor(remainder / parseInt(i));
      remainder = remainder % parseInt(i);
    }

    setObj(() => {
      return { ...getObj, ...temp };
    });
  };

  useEffect(() => {
    changeCalc();
  }, [getObj.value]);

  const clickNum = (btnVal: any) => {
    if (btnVal == "clear") {
      setObj(() => {
        return { ...getObj, value: "" };
      });
      return;
    }

    if (btnVal == "<-") {
      setObj(() => {
        return { ...getObj, value: getObj.value.slice(0, -1) };
      });
      return;
    }

    setObj(() => {
      return { ...getObj, value: (getObj.value += btnVal) };
    });
  };

  const PortraitUI = () => (
    <View style={styles.main}>
      <View style={styles.list}>
        {arr.map((i: any | string) => {
          return (
            <Text key={i}>
              {i}:{getObj[i]}
            </Text>
          );
        })}
      </View>

      <View style={styles.dial}>
        <Text
          style={{
            fontSize: 20,
            borderWidth: 1,
            alignContent: "center",
          }}
        >
          {getObj.value}
        </Text>
        <Row style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() => clickNum(1)}
            title="1"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(2)}
            title="2"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(3)}
            title="3"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(4)}
            title="4"
          ></Button>
        </Row>
        <Row style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() => clickNum(5)}
            title="5"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(6)}
            title="6"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(7)}
            title="7"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(8)}
            title="8"
          ></Button>
        </Row>
        <Row style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() => clickNum(9)}
            title="9"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum(0)}
            title="0"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum("<-")}
            title="<-"
          ></Button>
          <Button
            style={styles.btn}
            onPress={() => clickNum("clear")}
            title="clear"
          ></Button>
        </Row>
      </View>

      <StatusBar style="auto" />
    </View>
  );

  return (
    <View style={styles.container}>
      {(orientation == 1 || 4) && <PortraitUI />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    backgroundColor: "",
    flexDirection: "row",
  },
  row: {
    flex: 1,
    margin: 25,
    backgroundColor: "",
  },
  btn: {
    flex: 1,
    margin: 10,
  },
  list: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "",
  },
  dial: {
    justifyContent: "center",
  },
});
