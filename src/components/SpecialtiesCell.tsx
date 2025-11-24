import React from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface SpecialtiesCellProps {
  specialties: string[];
  maxVisible?: number;
  perRowCount?: number;
}

export const SpecialtiesCell: React.FC<SpecialtiesCellProps> = ({
  specialties,
  maxVisible = 6,
  perRowCount = 2,
}) => {
  const visible = specialties.slice(0, maxVisible);
  const hiddenCount = specialties.length - maxVisible;

  // Adjust column width to be significantly wider
  return (
    <div className="flex flex-col gap-2">
      {/* Grid for visible specialties */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${perRowCount}, minmax(0, 1fr))`,
          columnGap: '16px', // Add extra spacing between columns
        }}
      >
        {visible.map((specialty) => (
          <span
            key={specialty}
            className="inline-block bg-blue-100 text-blue-800 rounded px-6 py-3 text-sm truncate"
            title={specialty}
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* Tooltip for hidden specialties */}
      {hiddenCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="inline-block bg-gray-200 text-gray-700 rounded px-6 py-3 text-sm cursor-pointer"
              tabIndex={0}
            >
              +{hiddenCount} more
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs whitespace-pre-line break-words">
              {specialties.slice(maxVisible).join(', ')}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
