export default function StatsSection({ heading, stats }: any) {
    return (
      <section>
        <h2>{heading}</h2>
        {stats?.map((stat: any, i: number) => (
          <div key={i}>
            <p>{stat.value}</p>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>
    )
  }