import { ElementType, ReactNode } from "react";

export type TButtonProps<T extends ElementType> =  {
    as?: T;
    label?: ReactNode;
    children?: ReactNode;
    loading?: boolean;
    color?:
        | "primary"
        | "secondary"
        | "accent"
        | "info"
        | "neutral"
        | "success"
        | "warning"
        | "error";
    size?: "xs" | "sm" | "default" | "lg" | "xl";
} & Omit<React.ComponentPropsWithRef<T>, "as">;

export default function Button<T extends ElementType = "button">({
    as,
    label,
    loading = false,
    color = "primary",
    size = "default",
    disabled = false,
    children,
    ...props
}: TButtonProps<T>) {
    const buttonSizes = {
        xs: "btn-xs",
        sm: "btn-sm",
        default: "",
        lg: "btn-lg",
        xl: "btn-xl",
    };
    const buttonColors = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        info: "btn-info",
        neutral: "btn-neutral",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
    };
    const Component = as || "button";
    return (
        <Component
            className={`btn ${buttonColors[color]} ${buttonSizes[size]}`}
            {...props}
            disabled={disabled || loading}
        >
            {loading && <span className="loading loading-spinner"></span>}
            {children ?? label}
        </Component>
    );
}
