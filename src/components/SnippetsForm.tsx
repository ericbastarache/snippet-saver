'use client';
import { Fragment, useState, useContext } from 'react';
import { SnippetsContext } from './SnippetsContainer';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SnippetsForm = () => {
    const { db, setSnippets, snippets, searchTerm, setSearchTerm, setOldSnippets, oldSnippets } = useContext(SnippetsContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [snippet, setSnippet] = useState<string>('');
    const [snippetName, setSnippetName] = useState<string>('');

    const handleCreateSnippet = e => {
      setSnippet(e.target.value);
    };

    const handleInsertSnippet = async (): Promise<void> => {
      await db?.execute('INSERT INTO snippets (title, content) VALUES ($1, $2)', [snippetName, snippet]);
      setSnippets(prev => [...prev, { title: snippetName, content: snippet }]);
      setOldSnippets(prev => [...prev, { title: snippetName, content: snippet }]);
      setShowModal(false);
    };

    const handleSearch = e => {
      setSearchTerm(e.target.value);
      setSnippets(oldSnippets.filter(snippet => snippet.title.includes(e.target.value)));
    };

    return (
          <Fragment>
            <div className="container mx-auto p-4">
              <div className="flex items-center bg-white rounded border border-gray-300 p-2">
                <input
                  type="text"
                  className="ml-2 p-2 w-full outline-none text-black"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div> 
            <button onClick={() => setShowModal(true)}>New Snippet</button>
            {showModal && (
                <div class="fixed z-10 inset-0 overflow-y-auto">
                  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          New Snippet
                        </h3>
                        <div class="flex flex-col mt-2">
                            <input type="text" className="mt-2 text-black" placeholder="Snippet Name" value={snippetName} onChange={e => setSnippetName(e.target.value)} />
                            <textarea className="mt-2 text-black" placeholder="Snippet" value={snippet} onChange={handleCreateSnippet} rows={10} />
                        </div>
                      </div>
                      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleInsertSnippet} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                          Confirm
                        </button>
                        <button onClick={() => setShowModal(false)} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            )}
        </Fragment>
    );
};

export default SnippetsForm;
