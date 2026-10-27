import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { client } from './src/apollo';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { ReceiptScreen } from './src/screens/ReceiptScreen';
import { ShopScreen } from './src/screens/ShopScreen';

type Route = { name: 'shop' } | { name: 'orders' } | { name: 'receipt'; id: string };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'shop' });
  const openReceipt = (id: string) => setRoute({ name: 'receipt', id });

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <Text style={styles.brand}>Thicket</Text>
        <View style={styles.body}>
          {route.name === 'shop' && <ShopScreen onOrderPlaced={openReceipt} />}
          {route.name === 'orders' && <OrdersScreen onOpen={openReceipt} />}
          {route.name === 'receipt' && <ReceiptScreen id={route.id} onBack={() => setRoute({ name: 'orders' })} />}
        </View>
        <View style={styles.tabs}>
          <Tab label="Shop" active={route.name === 'shop'} onPress={() => setRoute({ name: 'shop' })} />
          <Tab label="Orders" active={route.name !== 'shop'} onPress={() => setRoute({ name: 'orders' })} />
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f6f2' },
  brand: { fontSize: 22, fontWeight: '700', color: '#2f6b45', paddingHorizontal: 16, paddingVertical: 12 },
  body: { flex: 1 },
  tabs: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#e2e0d8', backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  tabText: { color: '#6b766e', fontWeight: '600' },
  tabActive: { color: '#2f6b45' },
});
