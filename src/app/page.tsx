'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { X } from 'lucide-react';

import { AdvocatesTable } from '@/components/AdvocatesTable';
import { Input } from '@/components/ui/input';
import { AdvocateDTO } from '@solace/types';

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('fetching advocates...');
    setLoading(true);
    setError(null);
    fetch(
      `/api/advocates?page=${currentPage}&limit=10&filter=${searchTerm}`,
    ).then((response) => {
      response
        .json()
        .then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setTotalPages(Math.ceil(jsonResponse.total / 10));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('Failed to load advocates');
        });
    });
  }, [currentPage, searchTerm]);

  const debouncedFilter = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedFilter(value);
  };

  const onResetClick = () => {
    setSearchTerm('');
    debouncedFilter('');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
              filteredAdvocates={advocates}
              loading={loading}
              error={error}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
