import { useQuery } from '@apollo/client';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusPill } from '../components/StatusPill';
import { OrderReceiptDocument } from '../gql/graphql';
import { formatPrice } from '../lib/money';
import { paymentLine } from '../lib/payment';

export function ReceiptScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const { data, loading, error } = useQuery(OrderReceiptDocument, { variables: { id } });

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error) return <Text style={styles.error}>{error.message}</Text>;
  const order = data?.order;
  if (!order) return <Text style={styles.error}>Order not found.</Text>;

  const paidOn = order.payment.capturedAt ? new Date(order.payment.capturedAt).toLocaleString() : 'Not yet charged';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack}>
        <Text style={styles.link}>‹ Orders</Text>
      </Pressable>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{order.number}</Text>
        <StatusPill status={order.status} />
      </View>

      <View style={styles.card}>
        {order.items.map((item) => (
          <View key={item.id} style={styles.line}>
            <Text>
              {item.quantity} × {item.product.name}
            </Text>
            <Text>{formatPrice(item.lineTotal)}</Text>
          </View>
        ))}
        <View style={styles.line}>
          <Text style={styles.muted}>Subtotal</Text>
          <Text style={styles.muted}>{formatPrice(order.subtotal)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.muted}>Tax</Text>
          <Text style={styles.muted}>{formatPrice(order.tax)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.bold}>Total</Text>
          <Text style={styles.bold}>{formatPrice(order.total)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.bold}>Payment</Text>
        <Text>{paymentLine(order.payment)}</Text>
        <Text style={styles.muted}>{paidOn}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  center: { marginTop: 48 },
  link: { color: '#2f6b45', fontSize: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 8, borderWidth: 1, borderColor: '#e2e0d8' },
  line: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: '#6b766e' },
  bold: { fontWeight: '700' },
  error: { margin: 16, color: '#b4412f' },
});
