export class DataQueryResponse<T> {
  totalCount?: number;
  data: T[];

  constructor() {
    this.totalCount = 0;
    this.data = [];
  }
}