// src/components/ui/Form.jsx

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-400 mb-1">
    {children}
  </label>
);

export const Input = ({ id, type = "text", ...props }) => (
  <input
    id={id}
    type={type}
    className="w-full bg-gray-950 text-gray-100 border border-gray-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
    {...props}
  />
);

export const Select = ({ id, options, ...props }) => (
  <select
    id={id}
    className="w-full bg-gray-950 text-gray-100 border border-gray-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);