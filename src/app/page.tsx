'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { X } from 'lucide-react';

import { AdvocatesTable } from '@/components/AdvocatesTable';
import { Input } from '@/components/ui/input';
import { AdvocateDTO } from '@solace/types';

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateDTO[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('fetching advocates...');
    setLoading(true);
    setError(null);
    fetch('/api/advocates').then((response) => {
      response
        .json()
        .then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('Failed to load advocates');
        });
    });
  }, []);

  const updateFilteredAdvocates = useCallback(
    (value: string) => {
      console.log('updating filtered advocates with value:', value);

      const filteredAdvocates = advocates.filter((advocate) => {
        const keys: (keyof AdvocateDTO)[] = [
          'firstName',
          'lastName',
          'city',
          'degree',
          'yearsOfExperience',
        ];
        const searchTerm = value.toLowerCase();
        for (const key of keys) {
          if (String(advocate[key]).toLowerCase().includes(searchTerm)) {
            return true;
          }
        }
        if (
          Array.isArray(advocate.specialties) &&
          advocate.specialties.some((s) =>
            String(s).toLowerCase().includes(searchTerm),
          )
        ) {
          return true;
        }
        return false;
      });

      console.log('filtered advocates', filteredAdvocates);
      setFilteredAdvocates(filteredAdvocates);
    },
    [advocates],
  );

  const debouncedFilter = useMemo(
    () => debounce((value: string) => updateFilteredAdvocates(value), 300),
    [updateFilteredAdvocates],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };

  const onResetClick = () => {
    console.log(advocates);
    setSearchTerm('');
    debouncedFilter('');
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Solace Advocates</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Find the right advocate for your needs
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar: Search input */}
          <div className="w-full md:w-64 shrink-0 mb-6 md:mb-0">
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search Advocates
            </label>
            <div className="relative flex items-center">
              <Input
                id="search"
                placeholder="Search by name, city, degree, specialty..."
                value={searchTerm}
                onChange={onChange}
                className="pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={onResetClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          {/* Main: Table */}
          <div className="flex-1 w-full">
            <AdvocatesTable
              filteredAdvocates={filteredAdvocates}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
