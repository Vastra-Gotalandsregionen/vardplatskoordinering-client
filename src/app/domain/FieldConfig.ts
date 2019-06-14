export class FieldConfig {
  name: string;
  label: string;
  type: string;
  options: Option[];
  filterable: boolean;
  required: boolean;

  static from(name, label, type, options?: Option[], filterable?: boolean, required?: boolean) {
    return new FieldConfig(name, label, type, options, filterable, required || false);
  }

  private constructor(name: string, label: string, type: string, options?: Option[], filterable?: boolean, required?: boolean) {
    this.name = name;
    this.label = label;
    this.type = type;
    this.options = options;
    this.filterable = filterable;
    this.required = required;
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
