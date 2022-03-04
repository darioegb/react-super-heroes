import { GridItem } from 'components';
import { getComparator, stableSort } from 'utils';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';

interface SuperHeroGridItemListProps<SuperHero> {
  filteredRows: SuperHero[] | undefined;
}

export const SuperHeroGridItemList = ({ filteredRows }: SuperHeroGridItemListProps<SuperHero>) => {
  const { columns, page, order, orderBy, rowsPerPage, superHeroes: rows, onAddOrEditOrView, onDelete } = useSuperHero();

  return (
    <>
      {stableSort(filteredRows ? filteredRows : rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
