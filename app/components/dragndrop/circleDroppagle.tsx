"use client"

type DroppableCircleProps = {
    cx: number;
    cy: number;
    r?: number;
    id: string;
    onDrop: (e: React.DragEvent<SVGCircleElement>, id: string) => void;
};

const DroppableCircle: React.FC<DroppableCircleProps> = ({
    cx,
    cy,
    r = 40,
    id,
    onDrop
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
        <circle
            cx={cx}
            cy={cy}
            r={r}
            className="learning-node"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        />
    );
};

export default DroppableCircle;