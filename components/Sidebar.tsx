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

const Sidebar = ({
  isOpen,
  onClose,
  selectedFilters,
  availableCategories,
  onFilterChange,
  onClearFilters,
}: SidebarProps) => {
  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel
          Mobile: fixed slide-in drawer
          Desktop: normal in-flow column, fills the flex row height, scrolls its own content */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          z-50 lg:z-0
          w-64 shrink-0
          h-full
          bg-white
          border-r border-gray-100
          shadow-xl lg:shadow-none
          flex flex-col
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
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
            <button onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <FilterGroup
            label="Gender"
            options={GENDER_OPTIONS}
            selected={selectedFilters.gender}
            onChange={(value) => onFilterChange('gender', value)}
          />

          <FilterGroup
            label="Category"
            options={availableCategories.map(cat => ({
              value: cat,
              label: cat.charAt(0).toUpperCase() + cat.slice(1),
            }))}
            selected={selectedFilters.category}
            onChange={(value) => onFilterChange('category', value)}
          />
        </div>
      </aside>
    </>
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
