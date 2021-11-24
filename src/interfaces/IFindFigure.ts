export interface IFindFigure {
  label: string;
  searchCondition: boolean;
  successFn: () => void;
  failureFn?: () => any;
}