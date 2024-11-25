import { ProvedorEventos } from "@/data/contexts/Contexto.Eventos";
import { colors } from "@/style/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ProvedorEventos>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)/qrcode" options={{
          title:"Leitor de QR Code",
          headerBackTitle: "Voltar",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.zinc[900],
          }
        }} />
        <Stack.Screen name="(stack)/eventos/[id]" options={{ 
          title: "Detalhe do Evento", 
          headerBackTitle: "Voltar",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.zinc[900],
          }
        }} />
      </Stack>
    </ProvedorEventos>
  );
}
