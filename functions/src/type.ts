declare module "*.json"
{ const value: any;
  export default value;
}

declare module 'nanoid' {
  export default function nanoid(size?: number): string;
}
