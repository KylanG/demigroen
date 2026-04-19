import Container from "../Container"

export default function CtaSection({ heading, primaryButton }: any) {
    return (
      <section className="flex items-center py-24 border-2 border-red-500">
        <Container className="border-2 border-blue-500">
          <h2 className="text-5xl">{heading}</h2>
          {primaryButton && <a href={primaryButton.url}>{primaryButton.label}</a>}
        </Container>
      </section>
    )
  }