import { firebaseStorage } from 'config/firebase';
import { pictureBasePath } from 'constant';
import { ref, StorageReference } from 'firebase/storage';
import { Option, PageConfig } from 'interfaces';
import { Order } from 'types';

/**
 * Get enum keys from enum object
 * @param type enum
 */
export const getEnumKeys = <T>(type: T): string[] =>
  Object.keys(type).filter((key) => !Number(key));

/**
 * Convert enum Object to array from key, value par.
 * @param type enum
 * @example [ { key: 'A', value: 1 }, { key: 'B', value: 2 } ]
 */
export const convertEnumToKeyValueArray = <T extends unknown>(
  type: T,
): Option[] =>
  getEnumKeys(type).map(
    (key) =>
      ({ key, value: type[key as keyof typeof type] as unknown } as Option),
  );

// Comparator functions
export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) =>
  b[orderBy] < a[orderBy] ? -1 : 1;

export const getComparator = <T>(
  order: Order,
  orderBy: keyof T,
): ((a: T, b: T) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = <T>(
  array: T[],
  comparator: (a: T, b: T) => number,
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Convert file to base64 string.
 * @param file File
 * @returns Promise<unknown>
 */
export const fileToBase64String = (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result as string);
  });
};

export const fileRef = (fileName: string): StorageReference =>
  ref(firebaseStorage, `${pictureBasePath}/${fileName}`);

export const fileName = (): string => `picture-${Date.now()}`;

export const createHttpParams = <T>(pageConfig: PageConfig<T>) => {
  let params: Record<string, unknown> = {};
  const { order, page, rowsPerPage, orderBy, filter } = pageConfig;

  if (rowsPerPage < 0) {
    return params;
  }

  params = {
    _page: page + 1,
    _limit: rowsPerPage,
    _sort: orderBy as string,
    _order: order,
  };

  if (filter && filter.length > 0) {
    params.name_like = filter;
  }

  return params;
};
