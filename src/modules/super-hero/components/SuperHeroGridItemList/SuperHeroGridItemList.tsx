import { GridItem } from 'components';
import { getComparator, stableSort } from 'utils';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';

export const SuperHeroGridItemList = () => {
  const { columns, order, orderBy, superHeroes: rows, onAddOrEditOrView, onDelete } = useSuperHero();

  return (
    <>
      {stableSort(rows, getComparator(order, orderBy))
        .map((row) => (
          <GridItem
            key={row.name}
            row={row}
            columns={columns}
            onAddOrEditOrView={onAddOrEditOrView}
            onDelete={onDelete}
          />
        ))}
    </>
  );
};
