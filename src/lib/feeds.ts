/**
 * Client-side ophalen van de live feeds (§5.1 YouTube-video-van-vandaag,
 * §5.2 Instagram) uit de feeds-worker. De basis-URL komt uit data/site.json
 * (SITE.feeds.base). Is die leeg, of faalt de call, dan geven we null/[] terug
 * en valt de UI terug op statische content — de site werkt dus altijd, ook
 * zonder worker en zonder JavaScript (progressive enhancement).
 */
import { SITE } from '$lib/config';

export type DailyVideo = {
	videoId: string;
	title: string;
	url: string;
	publishedAt: string;
};

export type InstaPost = {
	id: string;
	caption: string;
	permalink: string;
	mediaUrl: string;
	thumbnailUrl: string;
	mediaType: string;
};

const base = SITE.feeds.base.replace(/\/+$/, '');

/** Is er een feeds-worker geconfigureerd? */
export function feedsEnabled(): boolean {
	return !!base;
}

async function getJson<T>(path: string): Promise<T | null> {
	if (!base) return null;
	try {
		const res = await fetch(`${base}${path}`, { headers: { accept: 'application/json' } });
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

/** Nieuwste YouTube-video van het kanaal, of null bij geen worker/fout. */
export async function fetchDaily(): Promise<DailyVideo | null> {
	const data = await getJson<DailyVideo>('/daily');
	if (!data || !data.videoId || !data.url) return null;
	return data;
}

/** Recente Instagram-posts, of een lege lijst bij geen worker/fout. */
export async function fetchInstagram(): Promise<InstaPost[]> {
	const data = await getJson<{ posts?: InstaPost[] }>('/instagram');
	return Array.isArray(data?.posts) ? data.posts : [];
}
