import { Option } from 'interfaces';
import { Order } from 'types';

/**
 * Get enum keys from enum object
 * @param type enum
 */
export const getEnumKeys = <T>(type: T): string[] => Object.keys(type).filter((key) => !Number(key));

/**
 * Convert enum Object to array from key, value par.
 * @param type enum
 * @example [ { key: 'A', value: 1 }, { key: 'B', value: 2 } ]
 */
export const convertEnumToKeyValueArray = <T extends unknown>(type: T): Option[] =>
  getEnumKeys(type).map((key) => ({ key, value: type[key as keyof typeof type] as unknown } as Option));

// Comparator functions
export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => (b[orderBy] < a[orderBy] ? -1 : 1);

export const getComparator = <T>(order: Order, orderBy: keyof T): ((a: T, b: T) => number) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
