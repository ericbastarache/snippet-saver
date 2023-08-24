'use client';
import { useState, useContext, useEffect } from 'react';
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SnippetsContext } from './SnippetsContainer';
import { Snippet } from '../types/types';

const SnippetsList = () => {
    const { db, snippets, setSnippets, setOldSnippets } = useContext(SnippetsContext)!;
    const [showSnippet, setShowSnippet] = useState<null | {title: string, content: string}>(null);

    useEffect(() => {
      const fetchSnippets = async (): Promise<void> => {
        const snippets = await db?.select('SELECT * FROM snippets');
        setSnippets(snippets);
        setOldSnippets(snippets);
      }
      fetchSnippets();
    }, [db, setSnippets, setOldSnippets]);

    const copyToClipboard = (snippet: string) => (): void => {
      navigator.clipboard.writeText(snippet);
    };

    const deleteSnippet = (id: number) => async (): Promise<void> => {
      await db?.execute(`DELETE FROM snippets WHERE id = ?`, [id]);
      setSnippets(snippets.filter((snippet: Snippet) => snippet.id !== id));
    };


    return (
        <div className="flex flex-1 flex-col p-24 overflow-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col flex-auto">
              <p className="text-2xl font-bold mb-8">Snippets</p>
              {snippets?.map((snippet: Snippet) => (
                <div key={snippet.id} className="flex flex-row justify-between">
                  <div onClick={() => setShowSnippet({ title: snippet.title, content: snippet.content })} className="flex flex-col">
                    <p className="text-xl cursor-pointer w-full">{snippet.title}</p>
                  </div>
                  <TrashIcon onClick={deleteSnippet(snippet.id)} className="w-6 h-6 cursor-pointer" /> 
                </div>
              ))}
            </div>
          </div>
          {showSnippet?.content && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg w-1/3 min-w-[450px] max-h-[400px] overflow-y-auto p-4">
              <div className="flex justify-between items-start text-black">
                <p className="text-2xl font-bold">{showSnippet.title}</p>
                <button onClick={() => setShowSnippet(null)} className="text-lg font-semibold cursor-pointer">
                  X
                </button>
              </div>
              <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-auto">
                <code>
                  {showSnippet.content}
                </code>
              </pre>
              <button className="mt-3 flex items-center cursor-pointer w-52 h-8 text-black py-4" onClick={copyToClipboard(showSnippet.content)}>
                <DocumentDuplicateIcon className="w-6 h-6" />
                Copy to clipboard
              </button>
            </div>
          )}
        </div>
    );
};
export default SnippetsList;

