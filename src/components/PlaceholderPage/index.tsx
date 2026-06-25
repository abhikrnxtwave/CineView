
interface PlaceholderPageProps {
    title: string
    description?: string
  }
  
  export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="mt-2 text-neutral-600">{description}</p>}
    </main>
  )