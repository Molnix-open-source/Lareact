import { ElementType, ReactNode } from "react";

export type CardProp<T extends ElementType> = {
    as?: T;
    children?: ReactNode;
    footer?: ReactNode;
    title?: ReactNode;
    heightClass?: React.HTMLAttributes<HTMLDivElement>["className"];
} & Omit<React.ComponentPropsWithRef<T>, "as">;

export default function Card<T extends ElementType = "div">({
    as,
    children,
    footer,
    title,
    heightClass = "",
    ...props
}: CardProp<T>) {
    const Component = as || "div";
    return (
        <Component
            className={`card bg-base-100 w-full shadow-sm hover:shadow-md`}
            {...props}
        >
            <div className="card-body ">
                {title && <h2 className="card-title">{title}</h2>}
                <div
                    className={` ${
                        heightClass != "" ? heightClass + " overflow-auto" : ""
                    } `}
                >
                    {children}
                </div>

                {footer && <div className="mt-2">{footer}</div>}
            </div>
        </Component>
    );
}
