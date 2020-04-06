export class GridPaginationConfig {
  align?: 'start' | 'end' | 'center' = 'end';
  disabled?: boolean = false;
  hidePageSize?: boolean = false;
  showFirstLastButtons?: boolean = true;
  color?: 'primary' | 'secondary' | 'info';
  pageSizeOptions?: number[] = [5, 10, 20, 50, 100];
  position?: 'bottom' | 'top' = 'bottom';
}
