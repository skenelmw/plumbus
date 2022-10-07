import { z } from "zod";

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

export const SearchTypeParser = z
  .enum(["character", "location", "episode"])
  .nullable();

export type SearchType = z.infer<typeof SearchTypeParser>;

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

export const ResultsInfoParser = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(), // these can be null where you are at the start or end of the list
});

export type ResultsInfo = z.infer<typeof ResultsInfoParser>;

export const ResultsParser = z.object({
  info: ResultsInfoParser,
  results: z.array(
    z.union([CharacterDataParser, LocationDataParser, EpisodeDataParser])
  ),
});
