import { getComparator, stableSort } from 'utils';
import { Order } from 'types';

interface GridItemListProps<T> {
  rows: T[];
  order: Order;
  orderBy: keyof T;
  renderItem: (item: T) => JSX.Element;
}

export const GridItemList = <T extends unknown>({
  rows,
  renderItem,
  order,
  orderBy,
}: GridItemListProps<T>) => {
  return (
    <>
      {stableSort(rows, getComparator(order, orderBy)).map((row) =>
        renderItem(row),
      )}
    </>
  );
};
