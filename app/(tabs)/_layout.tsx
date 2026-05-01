import { theme } from "@/constants/theme";
import t from "@/lib/translator";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

/** Sem label, o item ainda usa justifyContent 'flex-start' → fica um vão em baixo; centramos o FAB na altura da tab. */
function ScheduleTabBarButton(props: BottomTabBarButtonProps) {
  const { style, ...rest } = props;
  return (
    <PlatformPressable
      {...rest}
      style={[style, { justifyContent: "center" }]}
    />
  );
}

const scheduleFabSize = 58;

const scheduleFabStyles = StyleSheet.create({
  wrap: {
    width: scheduleFabSize,
    height: scheduleFabSize,
    borderRadius: scheduleFabSize / 2,
    backgroundColor: theme.colors.shadow,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  wrapFocused: {
    borderWidth: 3,
    borderColor: theme.colors.tabActive,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.tabActive,
        shadowOpacity: 0.45,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 16,
      },
    }),
  },
});

function ScheduleTabIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={[scheduleFabStyles.wrap, focused && scheduleFabStyles.wrapFocused]}
    >
      <Ionicons name="cut-sharp" size={28} color={theme.colors.white} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarIconStyle: {
          marginVertical: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.colors.dividerDark,
          height: 100,
          elevation: 0,
          ...Platform.select({
            android: {
              elevation: 8,
            },
            ios: {
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: -2 },
            },
          }),
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
      }}
    >
      {/*
        Rotas com `pasta/index.tsx` no Expo Router v6 → nome do ecrã é `pasta/index`, não `pasta`.
      */}
      <Tabs.Screen
        name="home/index"
        options={{
          title: t.tabs.home,
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="home-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: t.tabs.explore,
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule/index"
        options={{
          title: t.tabs.schedule,
          // Não usar tabBarShowLabel: false — com a aba do meio focada isso pode esconder labels de todas as abas.
          tabBarLabel: () => null,
          tabBarAccessibilityLabel: t.tabs.schedule,
          tabBarButton: (p) => <ScheduleTabBarButton {...p} />,
          tabBarItemStyle: {
            paddingTop: 4,
            paddingBottom: 0,
          },
          // TabBarIcon usa wrapper fixo 31×28; sem isto o FAB fica “preso” a 28px de altura e parece descentrado.
          tabBarIconStyle: {
            width: scheduleFabSize,
            height: scheduleFabSize,
            marginTop: 0,
            marginBottom: 0,
          },
          tabBarIcon: ({ focused }) => <ScheduleTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="agenda/index"
        options={{
          title: t.tabs.agenda,
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: t.tabs.account,
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
