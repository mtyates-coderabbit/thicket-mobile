import { useQuery } from '@apollo/client';
import { ActivityIndicator, SectionList, StyleSheet, Text } from 'react-native';
import { SESSION } from '../apollo';
import { OrderRow } from '../components/OrderRow';
import { MyOrdersDocument } from '../gql/graphql';
import { isSettled } from '../lib/statusTheme';

export function OrdersScreen({ onOpen }: { onOpen: (id: string) => void }) {
  const { data, loading, error, refetch } = useQuery(MyOrdersDocument, {
    variables: { customerId: SESSION.customerId },
  });

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error) return <Text style={styles.error}>{error.message}</Text>;

  const orders = data?.orders ?? [];
  const sections = [
    { title: 'In progress', data: orders.filter((o) => !isSettled(o.status)) },
    { title: 'Past orders', data: orders.filter((o) => isSettled(o.status)) },
  ].filter((s) => s.data.length > 0);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(order) => order.id}
      onRefresh={refetch}
      refreshing={loading}
      renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
      renderItem={({ item }) => <OrderRow order={item} onPress={() => onOpen(item.id)} />}
      ListEmptyComponent={<Text style={styles.empty}>No orders yet.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  center: { marginTop: 48 },
  header: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8, fontWeight: '700', color: '#6b766e' },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b766e' },
  error: { margin: 16, color: '#b4412f' },
});
