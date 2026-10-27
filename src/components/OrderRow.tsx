import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { OrderCardFragment } from '../gql/graphql';
import { formatPrice } from '../lib/money';
import { StatusPill } from './StatusPill';

export function OrderRow({ order, onPress }: { order: OrderCardFragment; onPress: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.main}>
        <Text style={styles.number}>{order.number}</Text>
        <Text style={styles.muted}>{new Date(order.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.side}>
        <Text style={styles.total}>{formatPrice(order.total)}</Text>
        <StatusPill status={order.status} />
        {order.payment.status === 'FAILED' && <Text style={styles.warning}>Payment failed</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e2e0d8' },
  main: { flex: 1, gap: 4 },
  side: { alignItems: 'flex-end', gap: 4 },
  number: { fontSize: 16, fontWeight: '600' },
  total: { fontSize: 16 },
  muted: { color: '#6b766e' },
  warning: { color: '#b4412f', fontSize: 12 },
});
