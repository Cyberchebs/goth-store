// components/Sidebar.tsx
import {Product} from "@/sanity.types";
'use client';

type SelectedFilters = {
  gender: string[];
  category: string[];
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: SelectedFilters;
  availableCategories: string[];
  onFilterChange: (group: keyof SelectedFilters, value: string) => void;
  onClearFilters: () => void;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];





const Sidebar = ({ isOpen, onClose ,selectedFilters,
  availableCategories,
  onFilterChange,
  onClearFilters,
}: SidebarProps) => {

    const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

   return (
    <div className={`fixed inset-0 z-40 flex ${!isOpen && 'pointer-events-none'}`}>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      )}

      {/* Panel */}
      <aside
        className={`relative z-50 w-64 bg-white h-full shadow-xl transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-red-500 hover:underline"
              >
                Clear all
              </button>
            )}
            <button onClick={onClose} aria-label="Close sidebar">✕</button>
          </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Gender — hardcoded, always male/female */}
          <FilterGroup
            label="Gender"
            options={GENDER_OPTIONS}
            selected={selectedFilters.gender}
            onChange={(value) => onFilterChange('gender', value)}
          />

          {/* Category — dynamic from your Sanity data */}
          <FilterGroup
            label="Category"
            options={availableCategories.map(cat => ({
              value: cat,
              label: cat.charAt(0).toUpperCase() + cat.slice(1), // capitalize
            }))}
            selected={selectedFilters.category}
            onChange={(value) => onFilterChange('category', value)}
          />
        </div>
      </aside>
    </div>
  );
};

type FilterGroupProps = {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (value: string) => void;
};

const FilterGroup = ({ label, options, selected, onChange }: FilterGroupProps) => (
  <div>
    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
      {label}
    </h3>
    <div className="space-y-2">
      {options.map(({ value, label }) => (
        <label key={value} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(value)}
            onChange={() => onChange(value)}
            className="w-4 h-4 accent-black"
          />
          <span className="text-sm group-hover:text-black transition-colors">
            {label}
          </span>
        </label>
      ))}
    </div>
  </div>
);


export default Sidebar;