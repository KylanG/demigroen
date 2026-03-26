export default function ClientSlider({ heading, clients }: any) {
    return (
      <section>
        <h2>{heading}</h2>
        {clients?.map((client: any, i: number) => (
          <p key={i}>{client.name}</p>
        ))}
      </section>
    )
  }