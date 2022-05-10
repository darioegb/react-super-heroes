import { fireEvent, render } from '@testing-library/react';

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
    ).container;

  it('should render GridTableHead', () => {
    const container = initContainerRender();
    expect(container.querySelector('tr')?.querySelectorAll('th').length).toBe(3);
  });

  it('should fire onRequestSort method when click on any column', () => {
    const container = initContainerRender();
    const column = container.querySelectorAll('th')[0].querySelector('span');
    column && fireEvent.click(column);
    expect(onRequestSort).toHaveBeenCalled();
  });

  it('should fire onAddOrEditOrView method when click on add', () => {
    const container = initContainerRender();
    const addButton = container.querySelector('button[aria-label="add"]');
    addButton && fireEvent.click(addButton);
    expect(onAddOrEditOrView).toHaveBeenCalled();
  });
});
