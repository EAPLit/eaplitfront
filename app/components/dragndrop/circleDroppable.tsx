"use client"

type CircleDropableProps = {
    cx: number;
    cy: number;
    r?: number;
    id: string;
    className: string;
    onDrop: (e: React.DragEvent<SVGCircleElement>, id: string) => void;
    label?: string;
    setRef: (el: SVGCircleElement | null) => void;
};

const CircleDroppable: React.FC<CircleDropableProps> = ({
    cx,
    cy,
    r = 40,
    id,
    onDrop,
    label="",
    setRef
}) => {
    const handleDragEnter = (e: React.DragEvent<SVGCircleElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over-safe");
    };

    const handleDragOver = (e: React.DragEvent<SVGCircleElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over-safe");
    };

    const handleDragLeave = (e: React.DragEvent<SVGCircleElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over-safe");
        onDrop(e, id);
    };

    const handleDrop = (e: React.DragEvent<SVGCircleElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over-safe");
        onDrop(e, id);
    };

    return (
        <>
            <circle
                ref={setRef}
                cx={cx}
                cy={cy}
                r={r}
                className="learning-node"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            />
            {
                label && (
                    <text
                        x={cx}
                        y={cy + 5}
                        textAnchor="middle"
                        fontSize="16"
                        fill="black"
                        pointerEvents="none"
                    >
                        {label}
                    </text>
                )
            }
        </>
        
    );
};

export default CircleDroppable;