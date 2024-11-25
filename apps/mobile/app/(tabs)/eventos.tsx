import EventoCard from "@/components/evento/EventoCard";
import NovoEvento from "@/components/evento/NovoEvento";
import SemEventos from "@/components/evento/SemEventos";
import useEventos from "@/data/hooks/useEventos";
import { p4, bgBlack, flex1, gapY4, py8, alignCenter, bgRed500 } from "@/style";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView } from "react-native";

export default function TelaEventos() {
  const { eventos } = useEventos();
  const router = useRouter();

  return (
    <SafeAreaView style={[flex1, bgBlack, p4]}>
      {eventos.length === 0 && <SemEventos />}
      <ScrollView contentContainerStyle={[gapY4, py8, alignCenter]}>
        {eventos.map((evento) => (
          <Pressable key={evento.id} onPress={() => router.push(`/eventos/${evento.id}`)}>
            <EventoCard key={evento.id} evento={evento} />
          </Pressable>
        ))}
      </ScrollView>
      <NovoEvento />
    </SafeAreaView>
  );
}
