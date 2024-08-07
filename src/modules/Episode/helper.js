export const Seasons = (episodes) => {
    const seasonsMap = {};

    episodes.forEach(({ id, air_date, episode, name }) => {
      const seasonNumber = parseInt(episode.match(/S(\d+)E(\d+)/)[1]);
      const episodeNumber = parseInt(episode.match(/S(\d+)E(\d+)/)[2]);
  
      if (!seasonsMap[seasonNumber]) {
        seasonsMap[seasonNumber] = {
          season: seasonNumber,
          episodes: []
        };
      }
  
      seasonsMap[seasonNumber].episodes.push({
        episode: episodeNumber,
        air_date,
        name,
        id
      });
    });
  
    return Object.values(seasonsMap);
}