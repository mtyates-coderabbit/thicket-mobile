import { useMutation, useQuery } from '@apollo/client';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SESSION } from '../apollo';
import { CartSummaryDocument, CatalogDocument, MyOrdersDocument, PlaceOrderDocument, QuickAddDocument } from '../gql/graphql';
import { purchaseEvent, track } from '../lib/analytics';
import { formatPrice } from '../lib/money';

const SHIPPING_ADDRESS = {
  line1: '18 Birch Court',
  city: 'Seattle',
  region: 'WA',
  postalCode: '98101',
  country: 'US',
};

export function ShopScreen({ onOrderPlaced }: { onOrderPlaced: (id: string) => void }) {
  const catalog = useQuery(CatalogDocument);
  const cart = useQuery(CartSummaryDocument, { variables: { id: SESSION.cartId } });
  const [quickAdd] = useMutation(QuickAddDocument);
  const [placeOrder, placing] = useMutation(PlaceOrderDocument, {
    refetchQueries: [CartSummaryDocument, MyOrdersDocument],
    onCompleted: ({ checkout }) => {
      track(purchaseEvent(checkout.order));
      onOrderPlaced(checkout.order.id);
    },
  });

  if (catalog.loading) return <ActivityIndicator style={styles.center} />;
  if (catalog.error) return <Text style={styles.error}>{catalog.error.message}</Text>;

  const itemCount = cart.data?.cart?.items.reduce((n, i) => n + i.quantity, 0) ?? 0;

  return (
    <View style={styles.flex}>
      <FlatList
        data={catalog.data?.products ?? []}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted}>{formatPrice(item.price)}</Text>
            </View>
            <Pressable
              disabled={!item.inStock}
              style={[styles.button, !item.inStock && styles.disabled]}
              onPress={() => quickAdd({ variables: { cartId: SESSION.cartId, productId: item.id } })}
            >
              <Text style={styles.buttonText}>{item.inStock ? 'Add' : 'Sold out'}</Text>
            </Pressable>
          </View>
        )}
      />
      {itemCount > 0 && (
        <Pressable
          style={styles.checkout}
          disabled={placing.loading}
          onPress={() =>
            placeOrder({
              variables: {
                input: {
                  cartId: SESSION.cartId,
                  email: SESSION.email,
                  shippingAddress: SHIPPING_ADDRESS,
                  cardToken: 'tok_visa_0005',
                },
              },
            })
          }
        >
          <Text style={styles.checkoutText}>
            {placing.loading
              ? 'Placing order…'
              : `Checkout · ${itemCount} item${itemCount === 1 ? '' : 's'} · ${formatPrice(cart.data?.cart?.subtotal ?? 0)}`}
          </Text>
        </Pressable>
      )}
      {placing.error && <Text style={styles.error}>{placing.error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { marginTop: 48 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e2e0d8' },
  name: { fontSize: 16, fontWeight: '600' },
  muted: { color: '#6b766e' },
  button: { backgroundColor: '#2f6b45', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  disabled: { backgroundColor: '#b9c2bb' },
  buttonText: { color: '#fff', fontWeight: '600' },
  checkout: { margin: 16, backgroundColor: '#2f6b45', padding: 16, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  error: { margin: 16, color: '#b4412f' },
});
