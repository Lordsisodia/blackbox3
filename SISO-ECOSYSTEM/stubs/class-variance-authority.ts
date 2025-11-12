export type ClassValue = string | number | boolean | null | undefined | ClassValue[];

function flatten(values: ClassValue[]): string[] {
  const result: string[] = [];
  values.forEach((value) => {
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else if (typeof value === "string" || typeof value === "number") {
      if (value !== "" && value !== null && value !== undefined) {
        result.push(String(value));
      }
    } else if (typeof value === "boolean") {
      if (value) result.push(String(value));
    }
  });
  return result;
}

export function cx(...values: ClassValue[]): string {
  return flatten(values).join(" ").trim();
}

type VariantDefinitions = Record<string, Record<string, string>>;
type CompoundVariant = { variants: Record<string, string | string[]>; class: string };

interface CVAConfig {
  variants?: VariantDefinitions;
  defaultVariants?: Record<string, string>;
  compoundVariants?: CompoundVariant[];
}

export function cva(base?: string, config: CVAConfig = {}) {
  return (variants: Record<string, string | undefined> = {}, opts: { class?: string } = {}) => {
    const classes: ClassValue[] = [base];

    if (config.variants) {
      for (const [variantName, variantValues] of Object.entries(config.variants)) {
        const selected = variants[variantName] ?? config.defaultVariants?.[variantName];
        if (selected && variantValues[selected]) {
          classes.push(variantValues[selected]);
        }
      }
    }

    if (config.compoundVariants) {
      config.compoundVariants.forEach((compound) => {
        const matches = Object.entries(compound.variants).every(([variantName, expected]) => {
          const selected = variants[variantName] ?? config.defaultVariants?.[variantName];
          if (Array.isArray(expected)) {
            return expected.includes(selected ?? "");
          }
          return selected === expected;
        });
        if (matches) {
          classes.push(compound.class);
        }
      });
    }

    if (opts.class) {
      classes.push(opts.class);
    }

    return cx(...classes);
  };
}

export type VariantProps<T> = T extends (...args: any) => any ? NonNullable<Parameters<T>[0]> : never;
