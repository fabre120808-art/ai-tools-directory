import {
  getDefaultToolFormValues,
  type ToolFormValues
} from "@/lib/tool-validation";

export type ToolFormState = {
  message?: string;
  values: ToolFormValues;
  errors: Partial<Record<keyof ToolFormValues, string>>;
};

export function getInitialToolFormState(values?: ToolFormValues): ToolFormState {
  return {
    values: values ?? getDefaultToolFormValues(),
    errors: {}
  };
}
