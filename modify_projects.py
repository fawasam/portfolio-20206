import re

with open('src/app/projects/ProjectsClient.tsx', 'r') as f:
    content = f.read()

replacement1 = """  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL_SYSTEMS");

  useEffect(() => {"""

content = content.replace("  const [mounted, setMounted] = useState(false);\n\n  useEffect(() => {", replacement1)

replacement2 = """      {/* Case Studies Grid Layout */}
      <section className="px-6 md:px-24 pb-6 flex flex-wrap gap-4 mt-6 md:mt-12">
        {['ALL_SYSTEMS', 'FIN_NODES', 'LOGISTICS', 'EXPERIMENTAL'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`technical-label px-4 py-2 border transition-all ${activeFilter === filter ? 'border-accent text-accent bg-accent/10' : 'border-grid-line text-foreground/60 hover:border-foreground/50'}`}
          >
            [{filter}]
          </button>
        ))}
      </section>

      <section className="px-6 md:px-24 pb-24 md:pb-48 grid grid-cols-1 gap-1 border-t border-grid-line">
         {PROJECTS.filter(proj => {
             if (activeFilter === 'ALL_SYSTEMS') return true;
             if (activeFilter === 'FIN_NODES' && proj.category.includes('FINANCIAL')) return true;
             if (activeFilter === 'LOGISTICS' && proj.category.includes('LOGISTICS')) return true;
             if (activeFilter === 'EXPERIMENTAL' && !proj.category.includes('FINANCIAL') && !proj.category.includes('LOGISTICS')) return true;
             return false;
         }).map((proj) => ("""

content = content.replace("""      {/* Case Studies Grid Layout */}
      <section className="px-6 md:px-24 pb-24 md:pb-48 grid grid-cols-1 gap-1 border-t border-grid-line mt-6 md:mt-12">
         {PROJECTS.map((proj) => (""", replacement2)

with open('src/app/projects/ProjectsClient.tsx', 'w') as f:
    f.write(content)
