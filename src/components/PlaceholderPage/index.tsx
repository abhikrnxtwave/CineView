interface PlaceholderPageProps {
    title: string
    description?: string
  }
  
  export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && <p className="mt-2 text-neutral-400">{description}</p>}
    </main>
  )