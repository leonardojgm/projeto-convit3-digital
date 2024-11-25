import Logo from "@/components/template/logo";
import { bgBlack, centerGrow, wFull, hFull } from "@/style";
import { ImageBackground } from "react-native";

export default function TelaInicio() {
  return (
    <ImageBackground source={require("@/assets/images/background.png")} resizeMode="cover" style={[centerGrow, bgBlack, wFull, hFull]}>
      <Logo />
    </ImageBackground>
  );
}
