import { ChangeEvent, MouseEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { GridTableHead, EmptyGrid, GridItemList, GridItem } from 'components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';
import { useCustomTranslate } from 'hooks';

interface SuperHeroGridProps {
  count: number;
}

export const SuperHeroGrid = ({ count }: SuperHeroGridProps) => {
  const {
    columns,
    page,
    order,
    orderBy,
    rowsPerPage,
    filter,
    pageConfig,
    superHeroes: rows,
    onAddOrEditOrView,
    setPageConfig,
    onDelete,
  } = useSuperHero();
  const { rowPerPageTranslate } = useCustomTranslate();
  const ROWS_PER_PAGE_CONFIG = rowPerPageTranslate();

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof SuperHero,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setPageConfig({
      ...pageConfig,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageConfig({ ...pageConfig, page: newPage });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageConfig({ ...pageConfig, page: 0, rowsPerPage: +event.target.value });
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: '60vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <GridTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            columns={columns}
            onAddOrEditOrView={onAddOrEditOrView}
          />
          <TableBody>
            {rows?.length ? (
              <GridItemList
                rows={rows}
                order={order}
                orderBy={orderBy}
                renderItem={(item) => (
                  <GridItem
                    key={item.name}
                    row={item}
                    columns={columns}
                    onAddOrEditOrView={onAddOrEditOrView}
                    onDelete={onDelete}
                  />
                )}
              />
            ) : (
              <EmptyGrid value={filter} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_CONFIG}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={rows?.length <= 0 ? 0 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
