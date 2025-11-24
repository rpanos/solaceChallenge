'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { X } from 'lucide-react';
import { useRef } from 'react';

import { AdvocatesTable } from '@/components/AdvocatesTable';
import { Input } from '@/components/ui/input';
import { AdvocateDTO } from '@solace/types';

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    console.log('fetching advocates...');
    setLoading(true);
    setError(null);

    // Cancel the previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetch(
      `/api/advocates?page=${currentPage}&limit=10&filter=${debouncedSearchTerm}`,
      {
        signal: controller.signal,
      },
    )
      .then((response) => {
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
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setLoading(false);
          setError('Failed to load advocates');
        }
      });
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the search term changes
  }, [searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const onResetClick = () => {
    setSearchTerm('');
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
