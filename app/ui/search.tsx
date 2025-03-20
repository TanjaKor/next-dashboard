'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// @ts-ignore
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //useDebouncedCallback on hook, joka ottaa kaksi parametria: funktion ja viiveen millä se ajetaan (tässä tapauksessa 300ms)
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    //päivittää sivunumeron aina 1:ksi, kun hakua muutetaan
    params.set('page', '1');
    //jos term on olemassa, lisätään query-parametriin, muuten poistetaan
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    //vaihdetaan url
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        //defaultValue varmistaa, että input on synkassa url:n kanssa (lukee searchParamsista)
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
