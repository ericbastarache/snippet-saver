import SnippetsList from '../components/SnippetsList';
import { SnippetsContextProvider } from '../components/SnippetsContainer';
import SnippetsForm from '../components/SnippetsForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SnippetsContextProvider>
        <div className="flex flex-row justify-end items-center p-6">
          <SnippetsForm />
        </div>
        <div className="flex flex-row justify-around">
          <SnippetsList />
        </div>
      </SnippetsContextProvider>
    </main>
  )
}
