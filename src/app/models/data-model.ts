export class DataModel {
  title: string;
  confirmLabel: string;
  cancelLabel: string;

  constructor(title: string, confirmLabel: string, cancelLabel: string) {
    this.title = title;
    this.confirmLabel = confirmLabel;
    this.cancelLabel = cancelLabel;
  }
}
