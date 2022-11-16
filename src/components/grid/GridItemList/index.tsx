import { getComparator, stableSort } from 'utils';
import { Order } from 'types';

interface GridItemListProps<T> {
  /**
   * Row list
   */
  rows: T[];
  /**
   * Order rows
   */
  order: Order;
  /**
   * Sort by specific column
   */
  orderBy: keyof T;
  /**
   * Render item component
   */
  renderItem: (item: T) => JSX.Element;
}

/**
 * GridItemList generates row grids.
 */
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
