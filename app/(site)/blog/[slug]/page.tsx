import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { postBySlugQuery, allPostSlugsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await client.fetch(allPostSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const [post, siteSettings] = await Promise.all([
      client.fetch(postBySlugQuery, { slug }),
      client.fetch(siteSettingsQuery),
    ])
    const seo = post?.seo ?? siteSettings?.seo
    const title = seo?.title ?? getLang(post?.title) ?? slug
    const description = seo?.description ?? getLang(post?.excerpt) ?? ''
    return {
      title,
      description,
      ...(seo?.noIndex && { robots: { index: false, follow: false } }),
      openGraph: {
        title,
        description,
        images: (() => {
          const img = post?.seo?.ogImage ?? post?.coverImage ?? siteSettings?.seo?.ogImage ?? siteSettings?.logo
          return img ? [{ url: urlFor(img).width(1200).height(630).url() }] : undefined
        })(),
      },
    }
  } catch {
    return { title: slug }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    notFound()
  }

  if (!post) notFound()

  const title = getLang(post.title)
  const excerpt = getLang(post.excerpt)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: title },
        ]}
      />
      <header className="mb-10 space-y-4">
        {post.publishedAt && (
          <p className="text-sm text-muted">
            {new Date(post.publishedAt).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl font-bold text-body leading-tight">{title}</h1>
        {excerpt && <p className="text-lg text-muted">{excerpt}</p>}

        {post.author && (
          <div className="flex items-center gap-3 pt-2">
            {post.author.photo && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.photo).width(80).height(80).fit('crop').url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-medium text-body">{post.author.name}</span>
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="relative aspect-video rounded-md overflow-hidden mb-10 shadow-lg">
          <Image
            src={urlFor(post.coverImage).width(1200).height(675).fit('crop').url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.body && <PortableTextRenderer value={post.body} />}
    </article>
  )
}
