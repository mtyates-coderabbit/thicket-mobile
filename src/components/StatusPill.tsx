import { StyleSheet, Text } from 'react-native';
import type { OrderStatus } from '../gql/graphql';
import { getStatusTheme } from '../lib/statusTheme';

export function StatusPill({ status }: { status: OrderStatus }) {
  const theme = getStatusTheme(status);
  return <Text style={[styles.pill, { color: theme.color, backgroundColor: theme.background }]}>{theme.label}</Text>;
}

const styles = StyleSheet.create({
  pill: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
