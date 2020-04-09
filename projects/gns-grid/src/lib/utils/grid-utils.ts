import { GridDateUtil } from './date-utils';
import { GridColumnDef, GridState } from '../types';

declare type FilterTypes =
  'startsWith'
  | 'contains'
  | 'endsWith'
  | 'equals'
  | 'equalsDate'
  | 'equalsTime'
  | 'notEquals'
  | 'in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte';

interface PagerDetails {
  total: number;
  pageIndex: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
}

interface MatGridProcessResult {
  data: Array<any>;
  state: GridState;
  totalRecords: number;
}

export class GridUtils {
  public static resolveFieldData(data: any, field: any): any {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        const fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  public static isFunction(obj: any) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  public static process(data: any[], state: GridState, columnDef: GridColumnDef[]): MatGridProcessResult {
    data = this.filterData(data, state.filter, columnDef);
    data = this.sortData(data, state.sort);
    const pager = this.getPager(data.length, state.pageIndex, state.pageSize);
    data = this.pagingData(data, pager);
    return {
      data,
      state,
      totalRecords: pager.total
    } as MatGridProcessResult;
  }

  public static pagingData(data: any[], pagination: PagerDetails): Array<any> {
    return data.slice(pagination.startIndex, pagination.endIndex + 1);
  }

  private static sortData(data: any[], sort: Map<string, string>): Array<any> {
    const keys = Object.keys(sort);
    keys.forEach((key) => {
      data.sort((data1, data2) => {
        const value1 = GridUtils.resolveFieldData(data1, key);
        const value2 = GridUtils.resolveFieldData(data2, key);
        let result = null;

        if (value1 == null && value2 != null) {
          result = -1;
        } else if (value1 != null && value2 == null) {
          result = 1;
        } else if (value1 == null && value2 == null) {
          result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2);
        } else {
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }

        const order = sort[key] === 'asc' ? 1 : sort[key] === 'desc' ? -1 : 0;
        return (order * result);
      });
    });
    return data;
  }

  private static filterData(data: any[], filter: Map<string, any>, columnDef: GridColumnDef[]): Array<any> {
    const fields = Object.keys(filter).filter(key => filter[key]);
    if (fields.length) {
      fields.forEach((fieldId) => {
        const filterDetail = columnDef.find(o => o.id === fieldId).filterDetails;
        if (filterDetail) {
          switch (filterDetail.type) {
            case 'date':
              if (filterDetail.range) {
                data = this.filter(data, fieldId, filter[fieldId].date, 'in', true);
              } else {
                data = this.filter(data, fieldId, filter[fieldId].date, 'equalsDate', true);
              }
              break;
            // case 'dateTime':
            //   if (filterDetail.range) {
            //     data = this.filter(data, fieldId, filter[fieldId].date, 'in', true);
            //     data = this.filter(data, fieldId, filter[fieldId].startTime, 'gt', true);
            //     data = this.filter(data, fieldId, filter[fieldId].endTime, 'lt', true);
            //   } else {
            //     data = this.filter(data, fieldId, filter[fieldId].date, 'equalsDate', true);
            //     data = this.filter(data, fieldId, filter[fieldId].time, 'equalsTime', true);
            //   }
            //   break;
            // case 'time':
            //   if (filterDetail.range) {
            //     data = this.filter(data, fieldId, filter[fieldId].startTime, 'gt', true);
            //     data = this.filter(data, fieldId, filter[fieldId].endTime, 'lt', true);
            //   } else {
            //     data = this.filter(data, fieldId, filter[fieldId].time, 'equalsTime', true);
            //   }
            //   break;
            case 'multiSelect':
              data = this.filter(data, fieldId, filter[fieldId], 'in');
              break;
            case 'singleSelect':
              data = this.filter(data, fieldId, filter[fieldId], 'equals');
              break;
            case 'number':
              data = this.filter(data, fieldId, filter[fieldId], 'equals');
              break;
            case 'text':
              data = this.filter(data, fieldId, filter[fieldId], 'contains');
              break;
            default:
              data = this.filter(data, fieldId, filter[fieldId], 'contains');
              break;
          }
        }
      });
    }
    return data;
  }

  public static filter(data: Array<any>, fieldId: string, value: any, mode: FilterTypes, isDate?: boolean): Array<any> {
    const filteredData = [];
    for (const item of data) {
      const fieldValue = this.removeAccents(String(this.resolveFieldData(item, fieldId))).toLowerCase();
      if (this[mode](fieldValue, value, isDate)) {
        filteredData.push(item);
      }
    }
    return filteredData;
  }

  private static startsWith(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = this.removeAccents(filter.toString()).toLowerCase();
    const stringValue = this.removeAccents(value.toString()).toLowerCase();

    return stringValue.slice(0, filterValue.length) === filterValue;
  }

  private static contains(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = this.removeAccents(filter.toString()).toLowerCase();
    const stringValue = this.removeAccents(value.toString()).toLowerCase();

    return stringValue.indexOf(filterValue) !== -1;
  }

  private static endsWith(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = this.removeAccents(filter.toString()).toLowerCase();
    const stringValue = this.removeAccents(value.toString()).toLowerCase();

    return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
  }

  private static equals(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }
    if (value.getTime && filter.getTime) {
      return value.getTime() === filter.getTime();
    } else {
      return this.removeAccents(value.toString()).toLowerCase() === this.removeAccents(filter.toString()).toLowerCase();
    }
  }

  private static equalsDate(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = GridDateUtil(value).toDate();
    }
    if (value.getTime && filter.getTime) {
      return GridDateUtil(value).sameDate(filter);
    } else {
      return this.removeAccents(value.toString()).toLowerCase() === this.removeAccents(filter.toString()).toLowerCase();
    }
  }

  private static equalsTime(value, filter, isDate): boolean {

    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = GridDateUtil(value).toDate();
    }
    if (value.getTime && filter.getTime) {
      return GridDateUtil(value).sameTime(filter);
    } else {
      return this.removeAccents(value.toString()).toLowerCase() === this.removeAccents(filter.toString()).toLowerCase();
    }
  }

  private static notEquals(value, filter, isDate): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return false;
    }

    if (value === undefined || value === null) {
      return true;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }
    if (value.getTime && filter.getTime) {
      return value.getTime() !== filter.getTime();
    } else {
      return this.removeAccents(value.toString()).toLowerCase() !== this.removeAccents(filter.toString()).toLowerCase();
    }
  }

  private static in(value, filter: any[], isDate): boolean {
    if (filter === undefined || filter === null || filter.length === 0) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    for (let i = 0; i < filter.length; i++) {
      if (this.equals(value, filter[i], isDate)) {
        return true;
      }
    }

    return false;
  }

  private static lt(value, filter, isDate): boolean {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }
    if (value.getTime && filter.getTime) {
      return value.getTime() < filter.getTime();
    } else {
      return value < filter;
    }
  }

  private static lte(value, filter, isDate): boolean {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }
    if (value.getTime && filter.getTime) {
      return value.getTime() <= filter.getTime();
    } else {
      return value <= filter;
    }
  }

  private static gt(value, filter, isDate): boolean {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }
    if (value.getTime && filter.getTime) {
      return value.getTime() > filter.getTime();
    } else {
      return value > filter;
    }
  }

  private static gte(value, filter, isDate): boolean {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    if (isDate && typeof value === 'string') {
      value = new Date(value);
    }

    if (value.getTime && filter.getTime) {
      return value.getTime() >= filter.getTime();
    } else {
      return value >= filter;
    }
  }

  private static removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y');
    }

    return str;
  }

  private static getPager(totalItems: number, currentPage: number, pageSize: number): PagerDetails {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // return object with all pager properties required by the view
    return {
      total: totalItems,
      pageIndex: currentPage,
      pageSize,
      startIndex,
      endIndex,
    } as PagerDetails;
  }
}
