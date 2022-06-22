import { fireEvent, render, screen } from '@testing-library/react';

import { GridTableHead } from '.';

describe('GridTableHead', () => {
  const onAddOrEditOrView = jest.fn();
  const onRequestSort = jest.fn();
  const mockColumns = [
    { id: 'name', label: 'Name' },
    {
      id: 'age',
      label: 'Age',
    },
  ];

  const initContainerRender = () =>
    render(
      <table>
        <GridTableHead
          columns={mockColumns}
          order={'desc'}
          orderBy={'name'}
          onRequestSort={onRequestSort}
          onAddOrEditOrView={onAddOrEditOrView}
        />
      </table>,
    );

  it('should render GridTableHead', () => {
    initContainerRender();
    expect(screen.getAllByRole('columnheader').length).toBe(3);
  });

  it('should fire onRequestSort method when click on any column', () => {
    initContainerRender();
    const column = screen.getByText('Name');
    column && fireEvent.click(column);
    expect(onRequestSort).toHaveBeenCalled();
  });

  it('should fire onAddOrEditOrView method when click on add', () => {
    initContainerRender();
    const addButton = screen.getByTestId('add-button');
    addButton && fireEvent.click(addButton);
    expect(onAddOrEditOrView).toHaveBeenCalled();
  });
});
