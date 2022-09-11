import { string, z } from "zod";

export const ResultDataParser = z.object({
  id: z.number(),
  name: z.string(),
});

export const LocationLinkParser = z.object({
  name: z.string(),
  url: z.string(),
});

export const CharacterDataParser = ResultDataParser.extend({
  status: z.string(),
  species: z.string(),
  image: z.string(),
  location: LocationLinkParser,
  origin: LocationLinkParser,
});

export type CharacterData = z.infer<typeof CharacterDataParser>;

export const LocationDataParser = ResultDataParser.extend({
  type: z.string(),
  dimension: z.string(),
  residents: z.array(z.string()),
});

export type LocationData = z.infer<typeof LocationDataParser>;

export const EpisodeDataParser = ResultDataParser.extend({
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.string()),
});

export type EpisodeData = z.infer<typeof EpisodeDataParser>;


export const ResultsParser = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string(),
    prev: z.string(),
  }),
  results: z.array(z.union([CharacterDataParser, LocationDataParser, EpisodeDataParser])),
});

export type ResultsData = {
  id: number;
  name: string;
};

export type InfoData = {
  count?: number;
  pages?: number;
  next?: string;
  prev?: string;
};

export type LocationLink = {
  name: string;
  url: string;
};




