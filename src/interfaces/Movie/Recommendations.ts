import type Movie from './Movie';
import type TV from '../TV/TV';

export interface Recommendations {
  page: number;
  results: (Movie | TV)[];
  total_pages: number;
  total_results: number;
}
