from balldontlie import BalldontlieAPI # type: ignore

api = BalldontlieAPI(api_key="f8a95de3-8bff-4bf1-9903-57d8777660b5")

# NBA (see documentation for full list of methods)
teams = api.nba.teams.list()
# Get NBA stats
#api.nba.stats.list(dates=["2024-11-13", "2024-11-14"])