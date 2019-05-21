export class FieldConfig {
  name: string;
  type: string;
  options: Option[];

  static from(name, type, options?) {
    return new FieldConfig(name, type, options);
  }

  private constructor(name: string, type: string, options?: Option[]) {
    this.name = name;
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
