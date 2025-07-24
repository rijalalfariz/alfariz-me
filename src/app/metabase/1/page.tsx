'use client';

import { useState } from 'react';

export default function Page() {
  return <MetabaseIframe />;
}

function MetabaseIframe() {
  const [filters, setFilters] = useState({
    year: '',
    gender: ''
  });

  // Base public URL from Metabase
  const baseUrl = "http://127.0.0.1:3000/public/question/YOUR-PUBLIC-UUID";
  
  // Build URL with parameters
  const buildIframeUrl = () => {
    const params = new URLSearchParams();
    
    if (filters.year) {
      params.append('tahun', filters.year);
    }
    if (filters.gender) {
      params.append('jenis_kelamin', filters.gender);
    }
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  return (
    <div className="p-6">
      {/* Filter Controls */}
      <div className="mb-4 flex gap-4">
        <select 
          value={filters.year}
          onChange={(e) => setFilters({...filters, year: e.target.value})}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Years</option>
          {[2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={filters.gender}
          onChange={(e) => setFilters({...filters, gender: e.target.value})}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Genders</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      {/* Metabase Iframe */}
      <iframe
        src={buildIframeUrl()}
        width="100%"
        height="600"
        frameBorder="0"
        className="border rounded shadow-lg"
      />
    </div>
  );
}