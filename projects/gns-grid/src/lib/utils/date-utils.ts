import * as _ from 'lodash';
import * as moment_ from 'moment';

const moment = moment_;

function checkValue(param: any): any {
  return {
    isEmpty: () => {
      if (param === undefined || param === null) {
        return true;
      }
      if (_.isNumber(param) && param === 0) {
        return true;
      }
      if (_.isString(param) && (param === '0' || param === '' || param.match(/^ *$/) !== null)) {
        return true;
      }
      if (_.isArray(param) && _.isEmpty(param)) {
        return true;
      }

      return false;
    }
  };
}

export function GridDateUtil(date: any): NgxDateUtilReturnType {

  const dateParser = (param: any): Date => {
    if (_.isDate(param)) {
      return param;
    }
    if (_.isNumber(param)) {
      return new Date(param);
    }
    if (checkValue(param).isEmpty()) {
      return new Date();
    }
    if (moment.isMoment(param)) {
      return param.toDate();
    }
    if (param.toLowerCase().indexOf('z', param.length - 1) !== -1) {
      return moment(param).toDate();
    }

    const dateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
    const arr = param && dateRE.exec(param);
    if (arr) {
      return new Date(parseInt(arr[1], 10));
    }

    // dd/mm/yyyy dd-mm-yyyy  formatted
    const parsedDate = new Date();
    parsedDate.setDate(parseInt(param.substr(0, 2), 10));
    parsedDate.setMonth(parseInt(param.substr(3, 2), 10) - 1);
    parsedDate.setFullYear(parseInt(param.substr(6, 4), 10));
    return parsedDate;
  };

  date = dateParser(date);

  return {
    format: (format: string, value?: Date): string => {
      return moment(value || date).format(format);
    },
    inMonth: (value: Date): number[] => {
      const days = [];
      let day;
      value = value || date;
      for (day = 1; day <= moment(value).daysInMonth(); day++) {
        days.push(moment(value).set('date', day).toDate());
      }
      return days;
    },
    inWeek: (value: Date): number[] => {
      const days = [];
      let day;
      value = value || date;

      const start = moment(value).startOf('isoWeek').toDate();
      const end = moment(start).add(7, 'days').toDate();

      for (day = start; day < end; day = moment(day).add(1, 'days').toDate()) {
        days.push(day);
      }
      return days;
    },
    slots: (options: any): Date[] => {
      const slots = [];
      let index;
      const value = options.date || date;

      const start = options.start || 8;
      const count = options.count || 9;
      const step = options.step || 1;

      for (index = 0; index < count; index++) {
        slots.push(moment(value).set('hour', start + step * index)
          .set('minute', 0)
          .set('second', 0).toDate());
      }
      return slots;
    },
    parse: (): Date => {
      return dateParser(date);
    },
    toDate: (): Date => {
      return date;
    },
    toMoment: (): any => {
      return moment(date);
    },
    sameAs: (date2: any, option: 'date' | 'time'): boolean => {
      option = option || 'date';

      const secondDate = dateParser(date2);

      if (option === 'date') {
        return moment(secondDate).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY');
      } else if (option === 'time') {
        return moment(secondDate).format('HH:mm') === moment(date).format('HH:mm');
      }

      return false;
    },
    toString: (option: 'date' | 'time'): string => {
      if (option === 'date') {
        return moment(date).format('DD-MM-YYYY');
      } else if (option === 'time') {
        return moment(date).format('HH:mm');
      }
    },
    toJSON: (): string => {
      return moment(date).toJSON();
    },
    sameDate: (date2: any): boolean => {
      const secondDate = dateParser(date2);
      return moment(secondDate).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY');
    },
    sameTime: (date2: any): boolean => {
      const secondDate = dateParser(date2);
      return moment(secondDate).format('HH:mm') === moment(date).format('HH:mm');
    },
    withinTime: (startTime: any, minutes: any): boolean => {
      const slot = dateParser(startTime);
      const fromTime = moment.duration(slot as any);
      const tillTime = moment.duration(slot as any).add(minutes, 'm');
      const time = moment.duration(date as any);

      return fromTime <= time && time < tillTime;
    },
    setTime: (time: any, value: any): any => {
      const newTime = moment(time || new Date());
      return moment(value || date)
        .set('hour', newTime.hour())
        .set('minute', newTime.minute())
        .set('second', newTime.second());
    }
  };
}

interface NgxDateUtilReturnType {
  format(format: string, value?: Date): string;

  inMonth(value: Date): number[];

  inWeek(value: Date): number[];

  slots(options: any): Date[];

  parse(): Date;

  toDate(): Date;

  toMoment(): any;

  sameAs(date2: any, option: 'date' | 'time'): boolean;

  toJSON(): string;

  toString(option: 'date' | 'time'): string;

  sameDate(date2: any): boolean;

  sameTime(date2: any): boolean;

  withinTime(startTime: any, minutes: any): boolean;

  setTime(time: any, value: any): any;
}
