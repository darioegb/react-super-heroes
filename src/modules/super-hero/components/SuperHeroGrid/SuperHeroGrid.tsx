import { ChangeEvent, MouseEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { GridTableHead, EmptyGrid } from 'components';
import { SuperHeroGridItemList } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';
import { PageConfig } from 'interfaces';
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
    dispatch,
  } = useSuperHero();
  const { rowPerpageTranslate } = useCustomTranslate();
  const rowsPerPageConfig = rowPerpageTranslate(); 
  
  const handleRequestSort = (_event: MouseEvent<unknown>, property: keyof SuperHero) => {
    const isAsc = orderBy === property && order === 'asc';
    setPageConfig({ ...pageConfig, order: isAsc ? 'desc' : 'asc', orderBy: property });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageConfig({ ...pageConfig, page: newPage });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageConfig({ ...pageConfig, page: 0, rowsPerPage: +event.target.value });
  };

  const setPageConfig = (newPageConfig: PageConfig<SuperHero>) => {
    dispatch({
      type: '[SuperHero] set page config',
      payload: { pageConfig: newPageConfig },
    });
  };

  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer style={{ maxHeight: '60vh' }}>
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
              <SuperHeroGridItemList />
            ) : (
              <EmptyGrid value={filter} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageConfig}
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
