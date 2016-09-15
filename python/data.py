import nflgame

games = nflgame.games(2015, week=1)
players = nflgame.combine_game_stats(games)
for p in players.rushing().sort('rushing_yds'):
	print p
	#print "%s|yards= %d|tds=%d" % (p.name, p.rushing_yds, p.rushing_tds)
