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
  return (
    <div className="flex flex-wrap gap-1 items-center">
      {visible.map((s) => (
        <span
          key={s}
          className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs max-w-[180px] truncate"
          title={s}
        >
          {s}
        </span>
      ))}
      {hiddenCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="inline-block bg-gray-200 text-gray-700 rounded px-2 py-1 text-xs cursor-pointer"
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
