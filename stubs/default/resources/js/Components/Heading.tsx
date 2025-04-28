import { memo, ReactNode } from "react";

export default memo(function Heading({
    title,
    action,
}: {
    title: ReactNode;
    action?: ReactNode;
}) {
    return (
        <div className="card bg-base-100 w-ful shadow-sm sticky top-16 z-10">
            <div className="card-body flex-row justify-between">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-end">{action}</div>
            </div>
        </div>
    );
});
