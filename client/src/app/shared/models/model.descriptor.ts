export class ModelDescriptor<T> {
  links: Links[];
  value: T;
}

export class Links {
  href: string;
  method: string;
  rel: string;
}
