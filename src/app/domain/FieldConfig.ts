export class FieldConfig {
  name: string;
  label: string;
  type: string;
  options: Option[];

  static from(name, label, type, options?: Option[]) {
    return new FieldConfig(name, label, type, options);
  }

  private constructor(name: string, label: string, type: string, options?: Option[]) {
    this.name = name;
    this.label = label;
    this.type = type;
    this.options = options;
  }
}

export class Option {
  label: string;
  value: any;

  static from(label, value) {
    return new Option(label, value);
  }

  private constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }
}
