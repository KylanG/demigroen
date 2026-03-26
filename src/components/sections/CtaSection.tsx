export default function CtaSection({ heading, primaryButton }: any) {
    return (
      <section>
        <h2>{heading}</h2>
        {primaryButton && <a href={primaryButton.url}>{primaryButton.label}</a>}
      </section>
    )
  }