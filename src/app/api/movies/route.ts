import { NextResponse, NextRequest } from 'next/server';
import * as cheerio from 'cheerio';
import { animationProps } from '@/types';
import { stringToTime } from '@/utils/converting.util';

export async function GET(req: NextRequest) {
  const url = await fetch('https://ngefilm21.mobi/genre/animation/');
  const html = await url.text();
  const $ = cheerio.load(html);
  const banner = $('.wp-post-image')
    .map((index, element) => {
      return $(element).attr('src');
    })
    .get();
  const titles = $('.entry-title a')
    .map((index, element) => {
      return $(element).text();
    })
    .get();

  const genre = $('.gmr-movie-on')
    .map((index, element) => {
      return $(element).text();
    })
    .get();

  const duration = $('.gmr-duration-item')
    .map((index, element) => {
      const getDuration = $(element).text();
      const rmSpace = getDuration.trim();
      const results = stringToTime({ val: rmSpace });
      return results;
    })
    .get();

  const quality = $('.gmr-quality-item')
    .map((index, element) => {
      const getQuality = $(element).text();
      return getQuality;
    })
    .get();

  const rating = $('.gmr-rating-item')
    .map((index, element) => {
      const getQuality = $(element).text();

      return Number(getQuality);
    })
    .get();

  const data = [];
  const results: any = [];
  for (let i = 0; i < banner.length; i++) {
    const item: animationProps = {
      banner: banner[i],
      title: titles[i],
      genres: genre[i],
      duration: duration[i],
      quality: quality[i],
      rating: rating[i],
    };
    data.push(item);
  }

  data.map((item, index) => {
    const genres = item.genres?.split(', ').map((genre, i) => {
      return genre.trim();
    });
    return results.push({
      ...item,
      genres,
    });
  });

  return NextResponse.json({
    title: 'Genre animation',
    data: results,
    status: 200,
  });
}
