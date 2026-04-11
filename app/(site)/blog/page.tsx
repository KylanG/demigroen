/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)
    return { title: `Blog | ${siteSettings?.siteName ?? 'SSUPPLY'}` }
  } catch {
    return { title: 'Blog | SSUPPLY' }
  }
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams

  let posts: any[] = []
  let categories: any[] = []

  try {
    ;[posts, categories] = await Promise.all([
      client.fetch(allPostsQuery, { category: category ?? null }),
      client.fetch(allCategoriesQuery),
    ])
  } catch {
    // No Sanity project configured yet
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !category
                ? 'bg-primary text-white'
                : 'bg-background text-body hover:bg-border'
            }`}
          >
            Alles
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat.slug
                  ? 'bg-primary text-white'
                  : 'bg-background text-body hover:bg-border'
              }`}
            >
              {getLang(cat.title)}
            </Link>
          ))}
        </div>
      )}

      {!posts?.length ? (
        <p className="text-gray-500">Nog geen blogposts gepubliceerd.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link
              key={post.slug.current}
              href={`/blog/${post.slug.current}`}
              className="group block rounded-md overflow-hidden border border-border shadow-sm hover:shadow-md transition-base"
            >
              {post.coverImage && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(338).fit('crop').url()}
                    alt={getLang(post.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 space-y-2">
                {post.publishedAt && (
                  <p className="text-xs text-muted">
                    {new Date(post.publishedAt).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
                <h2 className="font-semibold text-body group-hover:text-primary transition-base">
                  {getLang(post.title)}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-muted line-clamp-2">
                    {getLang(post.excerpt)}
                  </p>
                )}
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.categories.map((cat: any) => (
                      <span
                        key={cat.slug}
                        className="text-xs bg-background text-muted px-2 py-0.5 rounded-full"
                      >
                        {getLang(cat.title)}
                      </span>
                    ))}
                  </div>
                )}
                {post.author && (
                  <div className="flex items-center gap-2 pt-2">
                    {post.author.photo && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(post.author.photo).width(48).height(48).fit('crop').url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-xs text-muted">{post.author.name}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
