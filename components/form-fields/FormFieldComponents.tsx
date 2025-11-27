/**
 * Reusable Form Field Components
 * Consistent styling across all form fields
 */

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  errors: Record<string, { message?: string } | undefined>;
  required?: boolean;
  disabled?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  errors,
  required = true,
  disabled = false,
}: SelectFieldProps<T>) {
  const error = errors[name];
  const hasValue = control._formValues[name];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#231f20] font-semibold text-sm mb-2 block">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <select
                {...field}
                disabled={disabled}
                className={cn(
                  "w-full h-12 pl-4 pr-10 border-2 rounded-lg transition-all duration-200 text-base bg-white appearance-none",
                  disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "cursor-pointer",
                  !disabled && error
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 bg-red-50/50"
                    : !disabled && hasValue && !error
                    ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    : !disabled
                    ? "border-gray-200 focus:border-[#231f20] focus:ring-2 focus:ring-[#231f20]/10"
                    : "",
                  !field.value && !disabled && "text-gray-400"
                )}
              >
              <option value="" disabled className="text-gray-400">
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value} className="text-[#231f20]">
                  {option.label}
                </option>
              ))}
              </select>
            </FormControl>
            {/* Dropdown Chevron Icon */}
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {error && (
            <div className="flex items-center gap-1.5 mt-1.5 text-red-600 animate-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{error.message}</span>
            </div>
          )}
          {field.value && !error && (
            <div className="flex items-center gap-1.5 mt-1.5 text-green-600 animate-in slide-in-from-top-1">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Selected</span>
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

interface NumberFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  errors: Record<string, { message?: string } | undefined>;
  required?: boolean;
  prefix?: string;
  helperText?: string;
  customValidation?: (value: string) => true | string;
}

export function NumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
  required = true,
  prefix,
  helperText,
  customValidation,
}: NumberFieldProps<T>) {
  const error = errors[name];
  const hasValue = control._formValues[name];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Re-declare customError inside render for field value
        const validationResult = customValidation && field.value 
          ? customValidation(field.value) 
          : true;
        const hasValidationError = typeof validationResult === 'string';

        return (
        <FormItem>
          <FormLabel className="text-[#231f20] font-semibold text-sm mb-2 block">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="relative">
            {prefix && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {prefix}
              </span>
            )}
            <FormControl>
              <Input
                type="number"
                placeholder={placeholder}
                {...field}
                  className={cn(
                    "h-12 border-2 rounded-lg transition-all duration-200 text-base pr-12",
                    prefix && "pl-10",
                    error || hasValidationError
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 bg-red-50/50"
                      : hasValue && !error && !hasValidationError
                      ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                      : "border-gray-200 focus:border-[#231f20] focus:ring-2 focus:ring-[#231f20]/10"
                  )}
                />
              </FormControl>
              {field.value && !error && !hasValidationError && (
                <CheckCircle2 className="w-5 h-5 text-green-500 absolute right-4 top-1/2 -translate-y-1/2" />
              )}
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-600 animate-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{error.message}</span>
              </div>
            )}
            {!error && hasValidationError && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-600 animate-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{validationResult as string}</span>
              </div>
            )}
            {helperText && !error && !hasValidationError && (
              <p className="text-xs text-gray-500 mt-1.5">{helperText}</p>
            )}
          </FormItem>
        );
      }}
    />
  );
}

