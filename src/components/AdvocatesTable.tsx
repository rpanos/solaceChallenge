import React from 'react';
import { AdvocateDTO } from '@solace/types';

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { SpecialtiesCell } from './SpecialtiesCell';

interface AdvocatesTableProps {
  filteredAdvocates: AdvocateDTO[];
  loading: boolean;
  error: string | null;
}

export const AdvocatesTable: React.FC<AdvocatesTableProps> = ({
  filteredAdvocates,
  loading,
  error,
}) => {
  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">{error}</div>;
  if (filteredAdvocates.length === 0)
    return <div className="py-8 text-center">No advocates found.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Specialties</TableHead>
          <TableHead>Years of Experience</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAdvocates.map((advocate) => {
          return (
            <TableRow key={advocate.id}>
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                <SpecialtiesCell
                  specialties={advocate.specialties}
                  maxVisible={6}
                  perRowCount={2}
                />
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
